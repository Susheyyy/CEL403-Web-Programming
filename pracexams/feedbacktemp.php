<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form method="POST" > 
        <input type="text" name="name" placeholder="enter name" />
    <input type="email" name="email" placeholder="enter email" />
    <textarea name="feedback" rows="5" cols="30" placeholder="enter feedback"></textarea>
    <button type="submit" >Submit</button>
    </form>

    <?php 
      if($_SERVER["REQUEST_METHOD"]==="POST"){
        if(isset($_POST["name"])){
            $name= $_POST["name"];
            $email = $_POST["email"];
            $feedback = $_POST["feedback"];

           $file = fopen("text.txt","a");
           fwrite($file,"name: $name \n email: $email \n feedback: $feedback \n");
           
        }
      }
     ?>
    
</body>
</html>