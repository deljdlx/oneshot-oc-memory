<?php

namespace OC\Memory;


use Phi\Database\Driver\SQLite3\Source;

class Database
{


    /**
     * @var \Phi\Database\Driver\SQLite3\Source
     */
    private $source;

    private $file;

    private $gameTableName = 'game';


    public function __construct($file)
    {
        $this->file = $file;
        $this->source = new \Phi\Database\Source(
            new Source($this->file)
        );
    }




    public function reset()
    {
        $this->source->query('DROP TABLE '.$this->gameTableName);
        $this->initialize();
        return $this;

    }

    public function getScore($top = null)
    {
        if(!(int) $top) {
            return $this->source->queryAndFetch(
                'SELECT * FROM '.$this->gameTableName
            );
        }
        else {
            return $this->source->queryAndFetch('
                SELECT
                  *
                FROM '.$this->gameTableName.'
                WHERE status = 1
                ORDER BY duration
                LIMIT :limit
            ', array(
                ':limit' => $top
            ));
        }

    }

    public function saveGame($status, $duration, $data = array())
    {
        $query = "
            INSERT INTO ".$this->gameTableName." (
                duration,
                status,
                data,
                date
            ) VALUES (
                :duration,
                :status,
                :data,
                :date
                
            )
        ";
        $this->source->query($query, array(
            ':duration' => $duration,
            ':status' => $status,
            ':data' => json_encode($data),
            ':date' => date('Y-m-d H:i:s')
        ));

        return $this->source->queryAndFetchOne(
           'SELECT * FROM '.$this->gameTableName." WHERE id=:id", [':id' => $this->source->getLastInsertId()]
        );
    }


    public function initialize()
    {

        $query = '
            CREATE TABLE '.$this->gameTableName.' (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              duration INTEGER,
              status  INTEGER,
              data TEXT,
              date DATETIME
            );
        ';

        return $this->source->query(
            $query
        );

    }

    public function drop()
    {
        return unlink($this->file);
    }




}

