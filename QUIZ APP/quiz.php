<?php
session_start();
include 'db.php';

// Ensure user is logged in
if (!isset($_SESSION["user_id"])) {
    header("Location: login.php");
    exit();
}

// Handle score submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user_id = $_SESSION["user_id"];
    $username = $_SESSION["username"];
    $topic_id = $_POST["topic_id"];
    $score = $_POST["score"];

    $stmt = $conn->prepare("INSERT INTO scores (user_id, username, topic_id, score) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("isii", $user_id, $username, $topic_id, $score);
    
    if ($stmt->execute()) {
        echo "success";
    } else {
        echo "error";
    }

    $stmt->close();
    $conn->close();
    exit();
}

// Get the selected topic ID
if (!isset($_GET['topic_id'])) {
    die("Error: No topic selected.");
}
$topic_id = $_GET['topic_id'];

// Fetch questions for the selected topic
$query = "SELECT id, question, option1, option2, option3, option4, correct_option FROM questions WHERE topic_id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $topic_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows == 0) {
    die("Error: No questions found for this topic.");
}

$questions = [];
while ($row = $result->fetch_assoc()) {
    $questions[] = $row;
}

$stmt->close();
$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
            font-family: 'Poppins', sans-serif;
            color: white;
            text-align: center;
        }
        .container {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(10px);
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
            max-width: 600px;
            margin: 50px auto;
        }
        .option-btn {
            width: 100%;
            background: transparent;
            color: white;
            border: 2px solid white;
            padding: 10px;
            margin: 8px 0;
            font-size: 16px;
            border-radius: 10px;
            transition: all 0.3s ease-in-out;
        }
        .option-btn:hover, .selected {
            background: #00c6ff;
            color: white;
            border-color: #00c6ff;
        }
        .progress {
            height: 10px;
            background: linear-gradient(to right, rgb(42, 179, 238), rgb(146, 206, 254));
        }
    </style>
</head>
<body>

<div class="container">
    <h2>Quiz</h2>
    <div id="quiz-container">
        <h4 id="question"></h4>
        <div id="options"></div>
        <div class="progress mt-3">
            <div id="timer-bar" class="progress-bar"></div>
        </div>
        <p><strong>Time left: <span id="timer">30</span> sec</strong></p>
        <button id="next-btn" class="btn btn-primary mt-3">Next</button>
    </div>
</div>

<script>
    let questions = <?php echo json_encode($questions); ?>;
    let currentIndex = 0;
    let score = 0;
    let timeLeft = 30;
    let timer;

    function showQuestion() {
        if (currentIndex >= questions.length) {
            saveScore(score); // Save the score when quiz ends

            document.getElementById("quiz-container").innerHTML = `
                <h3>Quiz Completed! 🎉</h3>
                <p>Your Score: ${score} / ${questions.length}</p>
                <a href="leaderboard.php" class="btn btn-success mt-3">View Leaderboard</a>
            `;
            return;
        }

        let question = questions[currentIndex];
        document.getElementById("question").innerText = question.question;

        let optionsHtml = '';
        for (let i = 1; i <= 4; i++) {
            optionsHtml += `<button class="btn btn-outline-light d-block mt-2 option-btn" data-answer="${i}" onclick="selectAnswer(this, ${question.correct_option})">${question["option" + i]}</button>`;
        }
        document.getElementById("options").innerHTML = optionsHtml;

        clearInterval(timer);
        timeLeft = 30;
        timer = setInterval(() => {
            document.getElementById("timer").innerText = --timeLeft;
            if (timeLeft <= 0) nextQuestion();
        }, 1000);
    }

    function selectAnswer(button, correctOption) {
        document.querySelectorAll(".option-btn").forEach(btn => btn.classList.remove("selected"));
        button.classList.add("selected");
        if (parseInt(button.getAttribute("data-answer")) === correctOption) score++;
    }

    function nextQuestion() { currentIndex++; showQuestion(); }

    function saveScore(finalScore) {
        fetch('quiz.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `topic_id=${<?php echo $_GET['topic_id']; ?>}&score=${finalScore}`
        })
        .then(response => response.text())
        .then(data => {
            if (data === "success") {
                console.log("Score saved successfully!");
            } else {
                console.error("Error saving score.");
            }
        });
    }

    document.getElementById("next-btn").addEventListener("click", nextQuestion);
    showQuestion();
</script>

</body>
</html>
