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

$gexffilesdir = "./dataprivate";
function sendGexfJson($dir){
    $files = scandir($dir);
    $list = array();
    foreach($files as $ind_file){
        if(preg_match("/^.*\.(gexf)$/i", $ind_file))
                $list[] = array('file'=>$dir."/".$ind_file,'displayname'=>substr($ind_file,0,10));
    }
    header('Content-type: application/json');
    echo json_encode($list);
}
$json = $_GET['json'];
if($json&&$json='true'){
    sendGexfJson($gexffilesdir);
}
?>