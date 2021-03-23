<?php

namespace Auto\Doc\Keyword\Handler;

use Auto\Doc\Keyword\Handler\Base;
//接口版本
class Version extends  Base
{
    protected $alone = true;
    public function  boot(array $params)
    {
        return $params[0] ?? '1.0';
    }
}
