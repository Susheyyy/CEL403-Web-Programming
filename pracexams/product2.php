<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body> 
    <?php 
     $hostname="localhost";
     $username="root";
     $password="";
     $database="test2_db";
       $conn = mysqli_connect($hostname,$username,$password,$database);
       if(!$conn){
        echo "connection failed";
       }
       
     ?>
     <form method="POST">
           <input type="number" name="id" placeholder="enter ID" />
           <input type="text" name="name" placeholder="enter name" />
           <input type="number" name="price" placeholder="enter price" />
           <input type="number" name="quantity" placeholder="enter quantity" />
           <button type="submit" name="add" >Submit</button>
     </form>
    <?php 
       if($_SERVER["REQUEST_METHOD"]=="POST"){
            if(isset($_POST["add"])){
                   $ID = $_POST["id"] ?? "";
                   $name = $_POST["name"] ?? "";
                   $price = $_POST["price"] ?? "";
                   $quantity = $_POST["quantity"] ?? "";
                   $mysql = "INSERT INTO products (ID,name, price, quantity) VALUES ($ID,'$name', $price, $quantity)";
                   mysqli_query($conn,$mysql);
            }
            if(isset($_POST["update"])){
                $updatedprice = $_POST["updatedprice"] ?? "";
                $id = $_POST["id"];
                $mysql="UPDATE PRODUCTS SET price=$updatedprice WHERE ID = $id ";
                mysqli_query($conn,$mysql);
            }
            if(isset($_POST["updatequantity"])){
                $updatedquantity = $_POST["updatedquantity"] ?? "";
                $id = $_POST["id"];
                if($updatedquantity==0){
                    $mysql="DELETE FROM PRODUCTS WHERE ID = $id ";
                    mysqli_query($conn,$mysql);
                }else{
                     $mysql="UPDATE PRODUCTS SET quantity=$updatedquantity WHERE ID = $id ";
                    mysqli_query($conn,$mysql);
                }
               
                
            }


                  $mysql="SELECT * FROM PRODUCTS";
                  $result= mysqli_query($conn,$mysql);

                  while($row= mysqli_fetch_assoc($result)){
                    echo '<div style="margin-bottom:10px;">';

                    echo $row["ID"]." - ".$row["name"]." - ".$row["price"]." - ".$row["quantity"];

                    echo '<form method="POST" style="display:inline; margin-left:10px;">
                            <input type="hidden" name="id" value="'.$row["ID"].'" />
                             <input type="number" name="updatedprice" placeholder="enter updated price"  />
                            <button type="submit" name="update">Update Price</button>
                        </form>';

                    echo '<form method="POST" style="display:inline; margin-left:10px;">
                            <input type="hidden" name="id" value="'.$row["ID"].'" />
                             <input type="number" name="updatedquantity" placeholder="enter updated quantity"  />
                            <button type="submit" name="updatequantity">Update Quantity</button>
                        </form>';

                    echo '</div>';
                  }


            
       }
     ?>
</body>
</html>