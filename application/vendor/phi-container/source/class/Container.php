<?php
namespace Phi\Container;


use Phi\Traits\Collection;

class Container implements \Phi\Container\Interfaces\Container
{


    use Collection;

    /**
     * @param $name
     * @param $callback
     * @param bool $isStatic
     * @return Bag
     */
    public function set($name, $callback, $isStatic = true)
    {
        $bag = new Bag($callback, $isStatic);
        $this->setVariable($name, $bag);
        return $bag;
    }


    public function get($name, $parameters = array())
    {
        $bag = $this->getVariable($name);
        if ($bag) {
            return $bag->getValue($parameters);
        } else {
            throw new \Exception('Container has no value with name "'.$name.'"');
        }
    }

    public function reload($name, $parameters = array())
    {
        $bag = $this->getVariable($name);
        if ($bag) {
            return $bag->reload($parameters);
        } else {
            throw new \Exception('Container has no value with name "'.$name.'"');
        }
    }


}