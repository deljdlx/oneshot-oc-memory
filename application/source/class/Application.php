<?php

namespace OC\Memory;


use Phi\Routing\Request;
use Phi\Routing\Response;

/**
 * Class Application
 * @package OC\Memory
 * Application is a singleton. We could have use a factory/registry for better code, but this is just a one shot demo
 */
class Application
{

    /**
     * @var Router
     */
    private $router;

    /**
     * @var Response
     */
    private $response;


    /**
     * @var Request
     */
    private $request;


    /**
     * @var Database
     */
    private $model;


    /**
     * @var Application
     */
    private static $instance;



    /**
     * @return Application
     */
    public static function getInstance()
    {
        if (!static::$instance) {
            static::$instance = new static;
        }

        return static::$instance;
    }


    /**
     * @param Request|null $request
     * @return Response
     */
    public function run(Request $request = null)
    {
        if($request === null) {
            $request = new Request();
        }

        $this->request = $request;
        $this->response = $this->router->route($request);

        return $this->response;
    }

    /**
     * @return Request
     */
    public function getRequest()
    {
        return $this->request;
    }


    public function getResponse()
    {
        return $this->response;
    }


    public function send()
    {
        $this->response->sendHeaders();
        echo $this->response->getContent();
    }


    public function setModel($database)
    {
        $this->model = $database;
        return $this;
    }

    /**
     * @return Database
     */
    public function getModel()
    {
        return $this->model;
    }


    private function __construct()
    {
        //no dependency injection, because out of "demo's scope"
        $this->router = new Router();

    }




}
