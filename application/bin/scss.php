<?php



require __DIR__.'/../vendor/scssphp/scss.inc.php';


$arguments = $argv;


if(!array_key_exists(1, $arguments))  {
    throw new Exception('You have to specify an source path as first argument');
}


$source = $arguments[1];


if(is_dir($source)) {

}
else if(is_file($source)) {

    $scss = new scssc();

    echo $scss->compile(file_get_contents($sources));



}
else {
    throw new Exception('Invalid scss source');
}

