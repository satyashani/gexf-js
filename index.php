<?php

/* * ************************************************************ 
 * 
 * Date: Feb 2, 2013
 * version: 1.0
 * programmer: Shani Mahadeva <satyashani@gmail.com>
 * Description:   
 * PHP file index
 * 
 * 
 * *************************************************************** */
include("gexfLinks.php");
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Gephi: JavaScript GEXF Viewer</title>
        <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
        <link rel="stylesheet" type="text/css" href="styles/gexfjs.css" />
        <link rel="stylesheet" type="text/css" href="styles/jquery-ui.css" />
        <link rel="stylesheet" type="text/css" href="styles/bootstrap.min.css" />
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
        <script type="text/javascript">
        // Fallback in case JQuery CDN isn't available
            if (typeof jQuery == 'undefined') {
                document.write(unescape("%3Cscript type='text/javascript' src='js/jquery-1.7.2.min.js'%3E%3C/script%3E"));
            }
        </script>
        <script type="text/javascript" src="js/bootstrap.min.js"></script>
        <script type="text/javascript" src="js/jquery.mousewheel.min.js"></script>
        <script type="text/javascript" src="js/jquery-ui-1.8.16.custom.min.js"></script>
        <script type="text/javascript" src="js/Gexf.js"></script>
        <script type="text/javascript" src="js/FRLayout.js"></script>
        <script type="text/javascript" src="js/YHLayout.js"></script>
        <script type="text/javascript" src="js/fileListLoader.js"></script>
        <script type="text/javascript" src="js/page.js"></script>
    </head>
    <body>
        <div id="titlebar" class="row">
            <div id="maintitle">
                <a class="heading" href="http://gephi.org/" target="_blank" title="Made with Gephi">Gephi: JavaScript GEXF Viewer</a>
            </div>
            <div class="span6">
                <form id="recherche">
                    <input id="searchinput" class="grey" autocomplete="off" />
                    <input id="searchsubmit" type="submit" />
                </form>
            </div>
            <div class="span2">
                <div class="btn-group">
                    <a class="btn dropdown-toggle" data-toggle="dropdown" href="#">
                    Gexf Graphs
                    <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu" id="gexflinks">
                        <?php echo getGexfLinks(); ?>
                    </ul>
                </div>
            </div>
            <div class="span2">
                <a class="btn btn-primary" href="./GexfJS_doc.txt" title="GexfJS Doc.gexf">GexfJS Doc</a>
            </div>
        </div>
        <div id="zonecentre" class="gradient">
            <ul id="ctlzoom">
                <li>
                    <a href="#" id="zoomPlusButton" title="S'approcher"> </a>
                </li>
                <li id="zoomSliderzone">
                    <div id="zoomSlider"></div>
                </li>
                <li>
                    <a href="#" id="zoomMinusButton" title="S'éloigner"> </a>
                </li>
                <li>
                    <a href="#" id="lensButton"> </a>
                </li>
                <li>
                    <a href="#" id="edgesButton"> </a>
                </li>
                <li>
                    <a href="#" id="FRButton"> </a>
                </li>
            </ul>
            <div id="messagebar" class="well span4 offset5"></div>
        </div>
        <div id="overviewzone" class="gradient">
        </div>
        <div id="leftcolumn">
            <div id="unfold">
                <a href="#" id="aUnfold" class="rightarrow"> </a>
            </div>
            <div id="leftcontent"></div>
        </div>
        <ul id="autocomplete">
        </ul>
    </body>
</html>