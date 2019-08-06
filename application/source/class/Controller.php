<?php

namespace OC\Memory;


abstract class Controller
{
    /**
     * @var Application
     */
    protected $application;

    public function __construct(Application $application = null)
    {
        if($application === null) {
            $this->application = Application::getInstance();
        }
        else {
            $this->application = $application;
        }
    }

    /**
     * @return Application
     */
    public function getApplication()
    {
        return $this->application;
    }



}

