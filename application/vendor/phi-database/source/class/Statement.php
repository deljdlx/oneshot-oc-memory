<?php


namespace Phi\Database;

use \Phi\Database\Interfaces\Statement as PhiStatement;

/**
 * Class Statement
 * @property \Phi\Database\Interfaces\Statement driver
 * @package Phi\Database
 */
class Statement
{

    protected $driver;

    public function __construct(\Phi\Database\Interfaces\Statement $statement)
    {
        $this->driver = $statement;
    }


    public function fetchAssoc()
    {
        return $this->driver->fetchAssoc();
    }

    public function fetchAll()
    {



        $returnValues = array();

        while ($row = $this->driver->fetchAssoc()) {
            $returnValues[] = $row;
        }
        return $returnValues;
    }



}