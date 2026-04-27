<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form method="GET" >
        <input type="text" name="keyword" placeholder="enter the keyword" />
        <button type="submit" >Submit</button>
    </form>
    <?php 
      if($_SERVER["REQUEST_METHOD"]=="GET"){
        if(isset($_GET["keyword"])){
        $keyword = $_GET["keyword"];
        echo "<strong>Results for " . $keyword . " :</strong>";
    }
       
      }
     ?>
</body>
</html>