<?php


class Populator {
    
    public function populateCats(){
        error_reporting(E_ERROR | E_PARSE);
        require "./connection.inc.php";                            
        $sql = "SELECT * FROM cats";
        $result = $conn->query($sql);
        if($result->num_rows > 0){
            while($cat = $result->fetch_assoc()){ 

                $dcat->id = $cat['id'];
                $dcat->name = $cat['name'];                                    
                $dcat->age = $cat['age'];
                $dcat->catInfo = $cat['info'];
                $dcat->record->wins = $cat['wins'];
                $dcat->record->loss = $cat['loss'];                                                                                                               
                echo '<div class="col-md-4 mb-1">';
                    echo '<div class="fighter-box" data-info = \''.(json_encode($dcat,JSON_NUMERIC_CHECK)) .'\' >';                                                                                 
                    echo'<img src="'.$cat['img'].'" alt="Fighter Box" width ="150" height="150" >';
                    echo '<form method = "POST" action="./edit.php">';
                        echo '<input type="hidden" name="id" value="'.$cat['id'].'" >';
                        echo '<button type="submit"  class="btn btn-success editBtn btn-sm ml-4">Edit</button>';
                    echo '</form>';
                    echo'</div>';
                echo'</div>';
                }
        }else{
            echo '<div class="container text-center info-msg mt-4 " >Please add fighters!</div>';
        }
    }
}
