<?php
namespace Phi\Traits;


use Phi\Core\Exception;

Trait ArrayAccess
{

    private $arrayAccessValues = [];




    public function length()
    {
        return count($this->arrayAccessValues);
    }

    public function toArray()
    {
        return $this->arrayAccessValues;
    }


    public function offsetExists($offset)
    {
        return array_key_exists($offset, $this->arrayAccessValues);
    }

    public function offsetGet($offset)
    {
        if(array_key_exists($offset, $this->arrayAccessValues)) {
            return $this->arrayAccessValues[$offset];
        }
        else {
            throw new Exception('Key ['.$offset.'] does not exists');
            return null;
        }

    }

    public function offsetSet($offset, $value)
    {

        if ($offset === null) {
            $this->arrayAccessValues[] = $value;

        } else {
            $this->arrayAccessValues[$offset] = $value;
        }

        return $this;
    }


    public function offsetUnset($offset)
    {
        if(array_key_exists($offset, $this->arrayAccessValues)) {
            unset($this->arrayAccessValues[$offset]);
        }

        return $this;
    }

    public function getAll()
    {
        return $this->arrayAccessValues;
    }

    public function getValues()
    {
        return $this->arrayAccessValues;
    }


}