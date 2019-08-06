<?php

namespace OC\Memory\Controller;


use OC\Memory\Controller;

class Game extends Controller
{

    public function save($status, $elapsed, $data = array())
    {



        $model = $this->application->getModel();
        $data = $model->saveGame(
            $status,
            $elapsed,
            $data
        );

        return $data;
    }

    public function getScores($top = null)
    {

        return $this->application->getModel()->getScore($top);
    }





}




