<?php

namespace Auto\Doc\Keyword\Handler;

use Auto\Doc\Keyword\Handler\Base;
//接口作者
class Author extends  Base
{
    public function  boot(array $params)
    {
        return $params[0] ?? '无';
    }
}
