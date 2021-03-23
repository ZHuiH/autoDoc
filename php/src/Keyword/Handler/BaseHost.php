<?php

namespace Auto\Doc\Keyword\Handler;

use Auto\Doc\Keyword\Handler\Base;
//接口基础地址
class BaseHost extends  Base
{
    protected $alone = true;
    protected $outside=true;
    public function  boot(array $params)
    {
        return $params[0] ?? 'localhost';
    }
}
