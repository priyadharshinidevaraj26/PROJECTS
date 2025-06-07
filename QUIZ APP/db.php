
<?php
$host = "localhost";
$user = "root"; // Change if needed
$pass = ""; // Change if your database has a password
$dbname = "quiz_db";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
