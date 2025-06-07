<?php
include 'db.php'; // Ensure database connection

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST["username"]);
    $email = trim($_POST["email"]);
    $password = password_hash($_POST["password"], PASSWORD_DEFAULT); // Hash the password

    // Insert into database
    $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $username, $email, $password);
    
    if ($stmt->execute()) {
        echo "<script>alert('Registration successful!'); window.location.href='login.php';</script>";
    } else {
        echo "Error: " . $conn->error;
    }
    $stmt->close();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Register</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background: url('assets/img/register.jpg') no-repeat center center fixed;
            background-size: cover;
            font-family: 'Poppins', sans-serif;
        }
        .register-container {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(10px);
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
            max-width: 400px;
            margin: 100px auto;
            text-align: center;
            color: white;
        }
        .form-control {
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
        }
        .form-control::placeholder {
            color: rgba(255, 255, 255, 0.8);
        }
        .btn-primary {
            background-color: #007bff;
            border: none;
            width: 100%;
        }
        a {
            color: white;
        }
    </style>
</head>
<body>

<div class="register-container">
    <h2>Register</h2>
    <form method="post">
        <input type="text" name="username" placeholder="Username" required class="form-control mb-3">
        <input type="email" name="email" placeholder="Email" required class="form-control mb-3">
        <input type="password" name="password" placeholder="Password" required class="form-control mb-3">
        <button type="submit" class="btn btn-primary">Register</button>
    </form>
    <a href="login.php">Already have an account? Login</a>
</div>

</body>
</html>
