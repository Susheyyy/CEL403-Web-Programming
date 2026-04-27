<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>multistep</title>
</head>
<body>
    <?php 
    session_start();
     $step = isset($_POST["step"]) ? (int)$_POST["step"] : 1;
     if($step==2){
        $_SESSION["name"]=$_POST["name"];
        $_SESSION["phonenumber"]=$_POST["phonenumber"];
        $_SESSION["email"]=$_POST["email"];
     }else if($step==3){
        $_SESSION["address"]=$_POST["address"];
        $_SESSION["city"]=$_POST["city"];
        $_SESSION["pincode"]=$_POST["pincode"];
     }
     ?>
    <?php     
       if($step==1):
     ?>
     <form method="POST">
         <h3>Personal Details</h3>
         <input type="text" name="name" placeholder="enter name" required />
         <input type="tel" name="phonenumber" placeholder="enter phone number" required >
         <input type="email" name="email" placeholder="enter email" required/>
         <input type="hidden" name="step" value=2 required />
         <button type="submit" >Next</button>
     </form>

     <?php     
       elseif($step==2):
     ?>
     <form method="POST">
         <h3>Address Details</h3>
         <input type="text" name="address" placeholder="enter address" />
         <input type="text" name="city" placeholder="enter city" >
         <input type="text" name="pincode" placeholder="enter pincode" />
         <input type="hidden" name="step" value=3 />
         <button type="submit" >Submit</button>
     </form>

     <?php     
       elseif($step==3):
     ?>
       <p>Name: <?= $_SESSION["name"] ?></p>
       <p>Phone Number: <?= $_SESSION["phonenumber"] ?></p>
       <p>Email: <?= $_SESSION["email"] ?></p>
       <p>Address:<?= $_SESSION["address"] ?></p>
       <p>city: <?= $_SESSION["city"] ?></p>
       <p>pincode <?= $_SESSION["pincode"]?></p>
       <?php session_abort(); ?>
     <?php endif; ?>
</body>
</html>