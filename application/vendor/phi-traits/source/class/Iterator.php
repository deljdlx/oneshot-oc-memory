<?php
namespace Phi\Traits;


use Phi\Core\Exception;

Trait Iterator
{

    use ArrayAccess;
    private $cursor = 0;


    public function setValues($values)
    {
        foreach ($values as $offset => $value) {
            $this->offsetSet($offset, $value);
        }

        return $this;

    }


    public function current()
    {
        return $this->offsetGet($this->cursor);
    }

    public function key()
    {
        return $this->cursor;
    }

    public function next()
    {
        $this->cursor++;
    }

    public function rewind()
    {
        $this->cursor = 0;
    }

    public function valid()
    {
        return $this->offsetExists($this->cursor);
    }


}