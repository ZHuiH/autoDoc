<?php

namespace Auto\Doc\Keyword\Handler;

use Auto\Doc\Keyword\Handler\Base;
//设置自动登录验证
class Description extends  Base
{
    public function boot(array $params)
    {
        if (sizeof($params) <= 0) {
            $this->error('缺少说明');
            return [];
        }
        return $params[0];
    }
}
