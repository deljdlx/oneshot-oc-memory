<?php

namespace Phi\HTTP\Header\ContentType;

use Phi\HTTP\Header;

class Json extends Header
{
    public function __construct()
    {
        parent::__construct('Content-Type', 'application/json');
    }
}


