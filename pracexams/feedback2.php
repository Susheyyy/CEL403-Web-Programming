<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form method="POST" >
        <input name="name" placeholder="name" required />
        <input name="email" placeholder="email" required />
        <textarea rows="6" cols="30" placeholder="enter feedback" name="feedback" required ></textarea>
        <button type="submit" >Submit</button>
    </form>
    <?php 
     if($_SERVER["REQUEST_METHOD"]="POST"){
        $name= $_POST["name"] ?? "";
      $email = $_POST["email"] ?? "";
      $feedback = $_POST["feedback"] ?? "";
      echo $feedback;
      $file = fopen("text.txt","a");
      fwrite($file,"Name: $name \n Email: $email \n Feedback: $feedback \n");
      fclose($file);
     }
      
     ?>
</body>
</html>