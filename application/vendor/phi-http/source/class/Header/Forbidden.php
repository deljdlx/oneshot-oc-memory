<?php

namespace Phi\HTTP\Header;

use Phi\HTTP\Header;

class Forbidden extends Header
{
    public function __construct()
    {
        parent::__construct('HTTP/1.1 403 Forbidden');
    }
}


