<?php
session_start(); 

$step = isset($_POST['step']) ? (int)$_POST['step'] : 1;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if ($step == 2) {
        $_SESSION['name'] = $_POST['name'];
        $_SESSION['email'] = $_POST['email'];
    } elseif ($step == 3) {
        $_SESSION['city'] = $_POST['city'];
        $_SESSION['zip'] = $_POST['zip'];
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Step-by-Step Registration</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f4f4f4; padding: 50px; }
        .form-container { background: white; padding: 20px; border-radius: 8px; width: 350px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin: auto; }
        h2 { border-bottom: 2px solid #eee; padding-bottom: 10px; }
        input { width: 90%; padding: 10px; margin: 10px 0; border: 1px solid #ccc; border-radius: 4px; }
        button { padding: 10px 20px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; }
        .summary { background: #e9ecef; padding: 15px; border-radius: 4px; }
    </style>
</head>
<body>

<div class="form-container">
    <?php if ($step == 1): ?>
        <h2>Step 1: Personal</h2>
        <form method="POST">
            <input type="hidden" name="step" value="2">
            <input type="text" name="name" placeholder="Full Name" required>
            <input type="email" name="email" placeholder="Email Address" required>
            <button type="submit">Next</button>
        </form>

    <?php elseif ($step == 2): ?>
        <h2>Step 2: Address</h2>
        <form method="POST">
            <input type="hidden" name="step" value="3">
            <input type="text" name="city" placeholder="City" required>
            <input type="text" name="zip" placeholder="Zip Code" required>
            <button type="submit">Complete</button>
        </form>

    <?php elseif ($step == 3): ?>
        <h2>Final Summary</h2>
        <div class="summary">
            <p><strong>Name:</strong> <?php echo $_SESSION['name']; ?></p>
            <p><strong>Email:</strong> <?php echo $_SESSION['email']; ?></p>
            <p><strong>City:</strong> <?php echo $_SESSION['city']; ?></p>
            <p><strong>Zip:</strong> <?php echo $_SESSION['zip']; ?></p>
        </div>
        <br>
        <a href="form.php">Restart</a>
        <?php session_destroy();  ?>
    <?php endif; ?>
</div>

</body>
</html>