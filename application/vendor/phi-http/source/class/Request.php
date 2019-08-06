<?php


namespace Phi\HTTP;


use Phi\Session\Session;

class Request extends Message
{


    const VERB_GET = 'GET';
    const VERB_POST = 'POST';
    const VERB_DELETE = 'DELETE';

    const KEY_URI = 'REQUEST_URI';
    const KEY_PROTOCOL = 'SERVER_PROTOCOL';
    const KEY_SERVER_NAME = 'SERVER_NAME';
    const KEY_REQUEST_METHOD = 'REQUEST_METHOD';
    const KEY_GET_ALL_HEADERS = 'getallheaders';


    protected $uri = null;
    private $verb = null;

    protected $protocol = null;
    protected $normalizedProtocol = '';
    protected $serverVariables = array();

    protected $hostname;

    protected $urlInformations = array();




    protected $postVariables = array();
    protected $getVariables = array();
    protected $fileVariables = array();


    protected $cookieVariables = array();

    /**
     * @var Session
     */
    protected $session;


    public function __construct($autobuild = true)
    {
        parent::__construct();
        if ($autobuild) {
            $this->autobuild();
        }
    }

    public function autobuild()
    {

        $this->serverVariables = $_SERVER;
        $this->postVariables = $_POST;
        $this->getVariables = $_GET;


        $this->fileVariables = array();
        if (!empty($_FILES)) {
            foreach ($_FILES as $name => $fileDescripor) {
                $file = new UploadedFile($fileDescripor);
                $this->fileVariables[$name] = $file;
            }

        }


        $this->cookieVariables = $_COOKIE;


        $this->session = new Session();


        $this->setBody(file_get_contents('php://input'));

        if (array_key_exists(static::KEY_URI, $_SERVER)) {
            $this->uri = $_SERVER[static::KEY_URI];
        }

        if (array_key_exists(static::KEY_PROTOCOL, $_SERVER)) {
            $this->protocol = $_SERVER[static::KEY_PROTOCOL];
            $this->normalizedProtocol = strtolower(preg_replace('`^(\w+).*`', '$1', $this->protocol));
        }

        if (array_key_exists(static::KEY_SERVER_NAME, $_SERVER)) {
            $this->hostname = $_SERVER[static::KEY_SERVER_NAME];
        }

        if (array_key_exists(static::KEY_REQUEST_METHOD, $_SERVER)) {
            $this->verb = $_SERVER[static::KEY_REQUEST_METHOD];
        }

        if (function_exists(static::KEY_GET_ALL_HEADERS)) {
            $headers = getallheaders();
            foreach ($headers as $name => $value) {
                $header = new Header($name, $value);
                $this->addHeader($header);
            }
        }


        $this->urlInformations = parse_url($this->getURL());

    }

    public function getURLInformations()
    {
        return $this->urlInformations;
    }


    public function getPath()
    {
        return $this->urlInformations['path'];
    }

    public function getParts()
    {
        return explode('/', preg_replace('`^/`', '', $this->getPath()));

    }


    public function files($variableName = null)
    {
        if ($variableName === null) {
            return $this->fileVariables;
        }

        if (array_key_exists($variableName, $this->fileVariables)) {
            return $this->fileVariables[$variableName];
        }
        return null;
    }

    public function post($variableName = null)
    {

        if ($variableName === null) {
            return $this->postVariables;
        }

        if (array_key_exists($variableName, $this->postVariables)) {
            return $this->postVariables[$variableName];
        }
        return null;
    }

    public function session()
    {
        return $this->session->getVariables();
    }

    public function getSession()
    {
        return $this->session;
    }

    public function cookies($variableName = null)
    {
        if ($variableName === null) {
            return $this->cookieVariables;
        }

        if (array_key_exists($variableName, $this->cookieVariables)) {
            return $this->cookieVariables[$variableName];
        }
        return null;
    }

    public function get($variableName = null)
    {

        if ($variableName === null) {
            return $this->getVariables;
        }

        if (array_key_exists($variableName, $this->getVariables)) {
            return $this->getVariables[$variableName];
        }
        return null;
    }


    public function getURI()
    {
        return $this->uri;
    }

    public function getURL()
    {
        return $this->normalizedProtocol . '://' . $this->hostname . $this->getURI();
    }

    public function isHTTP()
    {
        return true;
    }


    public function setURI($uri)
    {
        $this->uri = $uri;
        return $this;
    }


    public function setVerb($verb)
    {
        $this->verb = $verb;
        return $this;
    }

    public function getVerb()
    {
        return $this->verb;
    }


}