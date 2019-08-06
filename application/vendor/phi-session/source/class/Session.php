<?php


namespace Phi\Session;


use Phi\Traits\Collection;

class Session
{


    const SESSION_DEFAULT_NAME = 'phi-session';

    private static $startedSession;
    private $name;


    protected $variables;

    public function __construct($name = null)
    {


        if(!self::$startedSession && session_status() !== \PHP_SESSION_ACTIVE ) {
            self::$startedSession = true;
            session_start();
            session_regenerate_id();
        }

        $this->variables = &$_SESSION;

    }

    public function destroy()
    {
        session_destroy();
        return $this;
    }

    public function set($name, $value)
    {
        $this->variables[$name] = $value;
        return $this;
    }

    public function get($name, $ifNull = null)
    {
        if(array_key_exists($name, $this->variables)) {
            return $this->variables[$name];
        }
        else {
            return $ifNull;
        }
    }

    public function getVariables()
    {
        return $this->variables;
    }



    public function delete($name)
    {
        unset($this->variables[$name]);
        return $this;
    }

    public function close() {
        session_write_close();
        return $this;
    }
}