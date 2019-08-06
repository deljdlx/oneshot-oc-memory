<?php


(function() {

    $root = __DIR__;

    $dir = opendir($root);

    while($path = readdir($dir)) {
        if($path != '.' && $path !='..') {
            if(is_file($root.'/'.$path.'/source/autoload.php')) {
                include($root.'/'.$path.'/source/autoload.php');
            }
        }
    }
})();






