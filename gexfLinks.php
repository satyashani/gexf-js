<?php

/* * ************************************************************ 
 * 
 * Date: Feb 2, 2013
 * version: 1.0
 * programmer: Shani Mahadeva <satyashani@gmail.com>
 * Description:   
 * PHP file gexfLinks
 * 
 * 
 * *************************************************************** */

function getGexfLinks(){
    $dir = './data';
    $files = scandir($dir);
    foreach($files as $ind_file){
        if(preg_match("/^.*\.(gexf)$/i", $ind_file))
            echo "<li><a href='$dir/$ind_file' class='gexflink btn'>".substr($ind_file,0,10)."</a></li> ";
    }
}
?>