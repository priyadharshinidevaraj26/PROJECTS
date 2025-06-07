<?php
session_start();
include 'db.php';

$query = "SELECT username, topic_id, score, quiz_date FROM scores ORDER BY score DESC, quiz_date ASC LIMIT 10";
$result = $conn->query($query);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Leaderboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
            color: white;
            font-family: 'Poppins', sans-serif;
            text-align: center;
        }
        .container {
            margin-top: 50px;
            max-width: 600px;
            padding: 20px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 15px;
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }
        .table {
            background: rgba(255, 255, 255, 0.3);
            border-radius: 10px;
            overflow: hidden;
        }
    </style>
</head>
<body>

<div class="container">
    <h2>Leaderboard 🏆</h2>
    <table class="table table-dark table-striped">
        <thead>
            <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>Topic ID</th>
                <th>Score</th>
                <th>Date</th>
            </tr>
        </thead>
        <tbody>
            <?php
            $rank = 1;
            while ($row = $result->fetch_assoc()) {
                echo "<tr>
                        <td>{$rank}</td>
                        <td>{$row['username']}</td>
                        <td>{$row['topic_id']}</td>
                        <td>{$row['score']}</td>
                        <td>{$row['quiz_date']}</td>
                      </tr>";
                $rank++;
            }
            ?>
        </tbody>
    </table>
    <a href="index.php" class="btn btn-primary mt-3">Back to Topics</a>
</div>

</body>
</html>
