<?php

namespace Auto\Doc\Keyword\Handler;

use Auto\Doc\Keyword\Handler\Base;
//分组
class Group extends  Base
{
    public function boot(array $params)
    {
        if (!isset($params[0])) {
            $this->error('分组缺少名称');
            return false;
        }
        return $params[0];
    }

    public function  boot2(string $document)
    {
        $params = array_filter(explode(' ', $document));
        if (sizeof($params) < 1) {
            $this->error('缺少分组名称');
            return false;
        }
        return trim(array_shift($params), ' ,');
    }
}
