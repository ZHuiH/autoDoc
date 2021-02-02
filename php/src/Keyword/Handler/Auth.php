<?php

namespace Auto\Doc\Keyword\Handler;

use Auto\Doc\Keyword\Handler\Base;
//设置自动登录验证
class Auth extends  Base
{
    protected $alone = false;

    private $sources = ['body', 'head'];

    public function boot(array $params)
    {
        if (sizeof($params) <= 1) {
            $this->error('auth缺少需要获取的验证名称');
            return [];
        }
        if (!in_array($params[0], $this->sources)) {
            $this->error('auth的获取源来只能是body或者head');
            return [];
        }
        return [
            'source' => $params[0], //从哪里获取
            'name' => $params[1], //名称
            'defalut' => $params[2] ?? '-', //默认值
        ];
    }
}
