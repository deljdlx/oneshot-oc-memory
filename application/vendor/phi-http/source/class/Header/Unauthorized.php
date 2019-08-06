<?php

namespace Phi\HTTP\Header;

use Phi\HTTP\Header;

class Unauthorized extends Header
{
    public function __construct()
    {
        parent::__construct('HTTP/1.1 401 Unauthorized');
    }
}


