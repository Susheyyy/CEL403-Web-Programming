<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php 
    session_start();
      $step = isset($_POST["step"])? (int)$_POST["step"]:1;
      if($step==2){
        if($_SERVER["REQUEST_METHOD"]=="POST"){
            $_SESSION["name"] = $_POST["name"] ?? "";
            $_SESSION["email"] = $_POST["email"] ?? "";
            $_SESSION["age"] = $_POST["age"] ?? "";
        }
      } if($step==3){
         if($_SERVER["REQUEST_METHOD"]=="POST"){
            $_SESSION["address"] = $_POST["address"] ?? "";
            $_SESSION["city"] = $_POST["city"] ?? "";
            $_SESSION["pincode"] = $_POST["pincode"] ?? "";
        }
      }
     ?>

<?php if( $step==1):?>
    <p>Personal Details</p>
    <form method="POST" >
     <input type="text" name="name" placeholder="enter name" />
     <input type="email" name="email" placeholder="enter email"/>
     <input type="number" name="age" placeholder="enter age" />
     <input type="hidden" name="step" value="2"  />
     <button type="submit" >Next</button>
    </form>
    <?php elseif( $step==2):?>
     <p>Address Details</p>
    <form method="POST" >
     <input type="text" name="address" placeholder="enter address" />
     <input type="text" name="city" placeholder="enter city"/>
     <input type="number" name="pincode" placeholder="enter pincode" />
     <input type="hidden" name="step" value="3"  />
     <button type="submit" >Submit</button>
    </form>
    <?php elseif( $step==3):?>
     <p>Address Details</p>
     <p><strong>Name: </strong> <?php echo htmlspecialchars($_SESSION["name"]) ?> </p>
     <p><strong>Email: </strong></p>
    <p><strong>Age: </strong></p>
    <p><strong>Address: </strong></p>
    <p><strong>City: </strong></p>
    <p><strong>pincode: </strong></p>

    <?php endif; ?>
   
</body>
</html>