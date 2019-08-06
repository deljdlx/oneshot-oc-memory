<?php


namespace Phi\HTTP;


class Header
{

    protected $name;
    protected $value;


    public function __construct($name, $value = null)
    {
        $this->name = $name;
        $this->value = $value;
    }

    public function getName()
    {
        return $this->name;
    }

    public function getValue()
    {
        return $this->value;
    }


    /**
    * @return $this
    */
    public function send()
    {
        if($this->value !==null) {
            header($this->name . ': ' . $this->value);
        }
        else {
           header($this->name);
        }

        return $this;
    }


    public function isHTML()
    {
        if($this->name == 'Content-type' && strpos($this->value, 'text/html') !== false) {
            return true;
        }
        return false;
    }


}