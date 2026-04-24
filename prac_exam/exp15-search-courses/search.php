<!DOCTYPE html>
<html>
<head>
    <title>Course Search</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 30px; background: #f9f9f9; }
        .search-box { 
            background: white; 
            padding: 20px; 
            border: 1px solid #ccc; 
            border-radius: 5px; 
            width: 350px; 
        }
        input[type="text"] { width: 70%; padding: 8px; border: 1px solid #ddd; }
        input[type="submit"] { padding: 8px 15px; cursor: pointer; background: #007bff; color: white; border: none; }
        .result-msg { margin-top: 20px; padding: 10px; background: #e2e3e5; color: #383d41; border-radius: 4px; }
    </style>
</head>
<body>

    <div class="search-box">
        <h3>Find a Course</h3>
        <form action="" method="GET">
            <input type="text" name="keyword" placeholder="Enter course name..." required>
            <input type="submit" value="Search">
        </form>
    </div>

    <?php
    if (isset($_GET['keyword'])) {
        $search = htmlspecialchars($_GET['keyword']); 
        
        echo "<div class='result-msg'>";
        echo "<strong>Results for:</strong> " . $search;
        echo "</div>";
        
        echo "<p style='font-size: 0.9rem; color: #666;'>Showing 0 courses found for '$search'.</p>";
    }
    ?>

</body>
</html>