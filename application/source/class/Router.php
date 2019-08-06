<?php

namespace OC\Memory;


use OC\Memory\Controller\Game;
use OC\Memory\Controller\System;

class Router extends \Phi\Routing\Router
{

    public function __construct()
    {
        parent::__construct();


        //=======================================================
        $this->get('system/ping', 'system/ping', function () {
            echo json_encode(array(
                'time' => time(),
                'response' => 'pong'
            ));
        })->json();


        $this->get('system/reset', 'system/reset', function() {

            $controller = new System();
            $controller->reset();

            echo json_encode(array(
                'time' => time(),
                'response' => 'reset'
            ));
        });

        //=======================================================


        $this->post('game/save', 'game/save', function () {

            $request = $this->getRequest();

            $status = (bool)$request->post('status');
            $elapsed = $request->post('elapsed');
            $data = $request->post('data');

            $controller = new Game();
            echo json_encode($controller->save(
                $status,
                $elapsed,
                $data
            ));

        })->json();

        $this->get('game/scores', 'game/scores', function () {
            $controller = new Game();
            echo json_encode($controller->getScores(
                $this->getRequest()->get('top')
            ));
        })->json();
        //=======================================================


        $this->get('about', 'about', function () {
            echo file_get_contents(__DIR__ . '/../../data/about.html');
        });


        $this->get('expose', true, function () {

            echo json_encode(array(
                'about' => '/service.php?/about',
                'system/ping' => '/service.php?/system/ping',
                'system/reset' => '/service.php?/system/reset',
                'game/save' => '/service.php?/game/save',
                'game/scores' => '/service.php?/game/scores',
            ));

        })->json();

    }


}

