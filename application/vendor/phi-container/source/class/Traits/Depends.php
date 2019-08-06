<?php
namespace Phi\Container\Traits;


use Phi\Container\Container;

trait Depends
{
    //must be overrided
    //protected $dependencies = array();


    /**
     * @return array
     */
    public function getDependencies()
    {
        if (!$this->dependencies) {
            $this->dependencies = array();
        }
        return $this->dependencies;
    }

    /**
     * @param $name
     * @param $value
     * @return $this
     */
    public function setDependency($name, $value)
    {
        if (!$this->dependencies) {
            $this->dependencies = array();
        }

        $this->dependencies[$name] = $value;

        return $this;
    }


    public function getDependency($name)
    {
        if (!$this->dependencies) {
            $this->dependencies = array();
        }

        if (array_key_exists($name, $this->dependencies)) {
            return $this->dependencies[$name];
        } else {
            throw new \Exception('Dependency with name "' . $name . '" does does not exist');
        }
    }

    /**
     * @param Container $container
     * @return $this
     */
    public function resolveDependencies(Container $container)
    {
        if (!$this->dependencies) {
            $this->dependencies = array();
        }

        foreach ($this->dependencies as $dependencyName => &$value) {


            if ($dependency = $container->get($dependencyName)) {
                $this->setDependency($dependencyName, $dependency);
            }
        }

        return $this;

    }


}