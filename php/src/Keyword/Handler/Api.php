<?php

namespace Auto\Doc\Keyword\Handler;

use Auto\Doc\Keyword\Handler\Base;
//设置api路径以及请求方式
class Api extends  Base
{
    public function  boot(array $params)
    {
        if (sizeof($params) < 2) {
            $this->error('缺少请求路径或者请求方式');
            return false;
        }
        return [
            'method' => $params[0],
            'path' => $params[1],
        ];
        // $params = array_filter(explode(' ', $document));
        // if (sizeof($params) <= 1) {
        //     $this->error('缺少请求url');
        //     return false;
        // }
        // return [
        //     'method' => array_shift($params), //第一个是请求方式
        //     'path' => rtrim(array_shift($params), ','), //第二个参数是请求url
        //     'explain' => $params //后面的参数全是说明
        // ];
    }
}
