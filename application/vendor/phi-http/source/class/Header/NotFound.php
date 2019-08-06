<?php

namespace Phi\HTTP\Header;

use Phi\HTTP\Header;

class NotFound extends Header
{
    public function __construct()
    {
        parent::__construct('HTTP/1.0 404 Not Found');
    }
}


