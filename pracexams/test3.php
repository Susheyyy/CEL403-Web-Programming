<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>php website</title>
</head>
<body>
    <h1> Welcome to the php website </h1>
    <?php
      $name="Chandrayan Paul";
      $age=20;
      $friend="Rohit sharma"; 
     ?>
     <p>The name is <?= $name ?> age is <?= $age ?> and name of his friend is <?= $friend ?> </p>
      <?php 
        $host="localhost";
        $username="root";
        $password="";
        $database="test_db";
        $conn = mysqli_connect($host,$username,$password,$database);
        if($conn){
            echo "";
        }else{
            echo "error"; 
        }
       ?>

     <form method="POST">
         name of product: <input type="text" name="name"/>
         Price of product: <input type="number" name="price"/>
         <button type="submit" name="add"> Submit </button>
     </form>

     <?php 
        if($_SERVER["REQUEST_METHOD"] == "POST"){
            if(isset($_POST["add"])){
               $name= $_POST["name"] ?? "";
            $price = $_POST["price"] ?? "";
            echo "<h3>Hello ,$name, and price is ,$price</h3>";

            $sql="INSERT INTO PRODUCTS (name,price) VALUES ('$name',$price)";

            mysqli_query($conn,$sql);

            $sql = "SELECT * FROM PRODUCTS";
            $result = mysqli_query($conn,$sql);
            } 
            $i=0;

            while($row= mysqli_fetch_assoc($result)){
                echo $row["name"],"-",$row["price"],"   ",'<form method="POST" ><button type="submit" name="add" >Delete</button></form>','<br>'; 
            }

            if(isset($_POST["delete"])){

            }

        }
      ?>

      

</body>
</html>