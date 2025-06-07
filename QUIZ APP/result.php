<?php
include 'includes/db_connect.php';

$topic_id = $_POST['topic_id'];
$questions = $conn->query("SELECT * FROM questions WHERE topic_id = $topic_id LIMIT 5");

$score = 0;
while ($row = $questions->fetch_assoc()) {
    $question_id = $row['id'];
    if (isset($_POST["q$question_id"]) && $_POST["q$question_id"] == $row['correct_option']) {
        $score++;
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Quiz Results</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <h1>Your Score: <?php echo $score; ?>/5</h1>
        <a href="index.php">Try Again</a>
    </div>
</body>
</html>
