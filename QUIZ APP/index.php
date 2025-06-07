<?php
session_start();
include 'db.php'; // Ensure this correctly connects to your database

// Fetch topics securely
$query = "SELECT DISTINCT id, name FROM topics";
$result = $conn->query($query);

if (!$result) {
    die("Database query failed: " . $conn->error);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz Topics</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background: url('assets/img/index.png') no-repeat center center fixed;
            background-size: cover;
            font-family: Arial, sans-serif;
        }
        .container {
            background: rgba(255, 255, 255, 0.2);
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(10px);
            margin-top: 50px;
            max-width: 600px;
            text-align: center;
        }
        .list-group-item {
            background: rgba(255, 255, 255, 0.5);
            border: none;
            transition: all 0.3s ease-in-out;
        }
        .list-group-item:hover {
            background: rgba(255, 255, 255, 0.7);
            transform: scale(1.02);
        }
        .auth-container {
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            padding: 15px;
            border-radius: 15px;
            display: flex;
            justify-content: center;
        }
        .btn-primary {
            background: #007bff;
            border: none;
            transition: background 0.3s ease-in-out;
        }
        .btn-primary:hover {
            background: #0056b3;
        }
    </style>
</head>
<body>

<div class="container mt-5">
    <!-- Auth Button Centered -->
    <div class="auth-container">
        <?php if (isset($_SESSION["username"])): ?>
            <a href="logout.php" class="btn btn-danger">Logout (<?php echo $_SESSION["username"]; ?>)</a>
        <?php else: ?>
            <a href="login.php" class="btn btn-primary">Login</a>
        <?php endif; ?>
    </div>

    <!-- Quiz Topics -->
    <?php if ($result->num_rows > 0): ?>
        <ul class="list-group mt-4">
            <?php while ($row = $result->fetch_assoc()) { ?>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <span><?php echo htmlspecialchars($row['name']); ?></span>
                    <a href="quiz.php?topic_id=<?php echo $row['id']; ?>" class="btn btn-primary">Start Quiz</a>
                </li>
            <?php } ?>
        </ul>
    <?php else: ?>
        <div class="alert alert-warning mt-3">No topics found. Please add topics to the database.</div>
    <?php endif; ?>
</div>

<!-- Bootstrap JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
