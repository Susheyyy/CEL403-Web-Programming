<!DOCTYPE html>
<html>
<head>
    <title>Course Search</title>
</head>
<body>

<h2>Search Courses</h2>

<form method="GET" action="">
    <input type="text" name="search" placeholder="Enter course name" />
    <button type="submit">Search</button>
</form>

<?php
if(isset($_GET['search'])){
    $keyword = $_GET['search'];

    echo "<h3>Results for: $keyword</h3>";
}
?>

</body>
</html>