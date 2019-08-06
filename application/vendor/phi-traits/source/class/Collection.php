<?php
namespace Phi\Traits;



Trait Collection
{

    use ArrayAccess;




    public function push($value)
    {
        $this->offsetSet(null, $value);
        return $this;
    }

    public function addVariable($value)
    {
        return $this->push($value);
    }


	public function getVariable($name) {
	    return $this->offsetGet($name);
	}


	public function getVariables() {
		return $this->getAll();
	}


	public function setVariables(array &$values, $byReference = false) {

        foreach ($values as $name => &$value) {
            if($byReference) {
                $this->setVariableByReference($name, $value);
            }
            else {
                $this->setVariable($name, $value);
            }
        }
		return $this;
	}


    public function setVariable($name, $value) {
        $this->offsetSet($name, $value);
        return $this;
    }

    public function setVariableByReference($name, &$value)
    {
        $this->offsetSet($name, $value);
        return $this;
    }




	public function variableExists($variableName)
    {
        return $this->offsetExists($variableName);
    }





}