<!DOCTYPE html>
<html>
<head>
    <title>Feedback Form</title>
    <style>
        body { font-family: sans-serif; background: #fdfdfd; display: flex; justify-content: center; padding: 40px; }
        .feedback-card { background: white; padding: 25px; border: 1px solid #ddd; border-radius: 10px; width: 350px; }
        input, textarea { width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ccc; border-radius: 5px; box-sizing: border-box; }
        button { background: #000; color: #fff; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; width: 100%; }
        .success-box { background: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin-top: 20px; }
        h3 { margin-top: 0; }
    </style>
</head>
<body>

<div class="feedback-card">
    <h3>Service Feedback</h3>
    <form action="feedback.php" method="POST">
        <input type="text" name="name" placeholder="Your Name" required>
        <input type="email" name="email" placeholder="Your Email" required>
        <textarea name="message" rows="4" placeholder="Your Feedback..." required></textarea>
        <button type="submit">Submit Feedback</button>
    </form>

    <?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $name = htmlspecialchars($_POST['name']);
        $email = htmlspecialchars($_POST['email']);
        $msg = htmlspecialchars($_POST['message']);

        echo "<div class='success-box'>";
        echo "<strong>Thank you, $name!</strong><br>";
        echo "We received your feedback.<br><br>";
        echo "<em>Submitted Details:</em><br>";
        echo "Email: $email <br>";
        echo "Message: $msg";
        echo "</div>";
    }
    ?>
</div>

</body>
</html>