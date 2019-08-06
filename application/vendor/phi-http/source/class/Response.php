<?php


namespace Phi\HTTP;


class Response extends Message
{


    /**
     * Response constructor.
     * @param string $content
     * @param Header[] $headers
     */
    public function __construct($content = '', array $headers = array())
    {
        $this->setBody($content);
        $this->headers = $headers;
    }

}