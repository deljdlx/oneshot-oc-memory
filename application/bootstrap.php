<?php


require(__DIR__.'/vendor/_autoload.php');

$autoloader = new \Phi\Core\Autoloader();
$autoloader->addNamespace('OC\Memory', __DIR__.'/source/class');
$autoloader->register();


/*
$database = new \OC\Memory\Database(__DIR__.'/data/memory.sqlite');
$database->drop();
$database->initialize();
die('EXIT '.__FILE__.'@'.__LINE__);
*/





$application = \OC\Memory\Application::getInstance();

$database = new \OC\Memory\Database(
    __DIR__.'/data/memory.sqlite'
);

$application->setModel($database);


$application->run();
$application->send();


return 0;




