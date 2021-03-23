<?php

namespace Auto\Doc\Keyword\Handler;

use Auto\Doc\Keyword\Handler\Base;
//状态码
class Code extends  Base
{
    protected $alone = false;
    protected $outside=true;
    public function  boot(array $params)
    {
        if(sizeof($params)<1){
            $this->error('code最少需要一个参数');
        }
        return [
            'code'=>$params[0],
            'description'=>$params[1] ?? "",
        ];
    }
}
