<?php
namespace Phi\Container\Interfaces;

interface Container
{

    public function set($name, $callback, $isStatic = true);
    public function get($name, $parameters =array());


}

