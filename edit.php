<?php
//dohvacanje macke koju zelimo urediti kako bi mogli popuniti formu
require "./connection.inc.php";
$id = $_POST['id'];
$sql = "SELECT * from cats WHERE id='".$id."'";
$result = $conn->query($sql);
if($result->num_rows>0){
    $cat = $result->fetch_assoc();     
}

?>
<!DOCTYPE html>
<html lang="en">
<head>    
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>  
    <title>Edit Fighter</title>
</head>
<body>
    <div class="container mt-4 custom-width">
        <form action="edit.inc.php" id="forma" method="POST" enctype="multipart/form-data">            
            <input type="text" hidden class="form-control" id="id" value="<?php echo $cat['id'];?>" name="id">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="name" value="<?php echo $cat['name'];?>" name="name" placeholder="Name" >
            </div>
            <div class="form-group">
                <label for="age">Age</label>
                <input type="number" class="form-control" id="age" value="<?php echo $cat['age'];?>"name="age" placeholder="Age" >
            </div>
            <div class="form-group">
                <label for="info">Cat info</label>
                <input type="text" class="form-control" id="info" value="<?php echo $cat['info'];?>" name="info" placeholder="Cat info" >
            </div>
            <div class="form-row">
                <div class="col">
                    <label for="wins">Wins</label>
                  <input type="text" class="form-control" id="wins" value="<?php echo $cat['wins'];?>"name="wins" placeholder="Wins" >
                </div>
                <div class="col">
                    <label for="wins">Loss</label>
                  <input type="text" class="form-control" id="loss"value="<?php echo $cat['loss'];?>" name="loss" placeholder="Loss" >
                </div>
            </div>            
        </form>
        <div class="center mt-4">
            <button class="btn btn-lg btn-success" id="submit" value="submit">Submit</button>
            <button class="btn btn-lg btn-danger" id="cancel">Cancel</button>
            
        </div>
        <div class="center mt-4">
        <button class="btn btn-lg btn-danger" id="deleteBtn"> DELETE</button>
        </div>
        
        
    </div>
</body>
</html>

<style>
    .custom-width{
        width: 500px;
    }
    .center{
        text-align: center;
    }
</style>
<script>
    $( document ).ready(function() {
        $("#cancel").click(function(){
            window.location = "./index.php";
        })
        $("#submit").click(function(){
            $("#forma").submit();
        })
        //pozivanje skripte putem ajaxa, predajemo joj id macke koji je spremljen u nevidljivi element
        $("#deleteBtn").click(function(){            
            $.ajax({
                data: 'id=' + $("#id").val(),
                url: './delete.inc.php',
                method: 'POST',
                success: function(msg){
                    window.location.replace("./index.php");
                }
            })
        })
    }); 
</script>
