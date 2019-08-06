<?php

namespace OC\Memory\Controller;


use OC\Memory\Controller;

class System extends Controller
{

    public function reset()
    {
        $this->application->getModel()->reset();
        return true;
    }







}




