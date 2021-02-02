<?php

namespace Auto\Doc\Keyword\Handler;

use Auto\Doc\Keyword\Handler\Base;
//定义全局的数据格式
class Define extends  Base
{

    public function  boot($document)
    {
        $name = [];
        preg_match('/.*?\{/', $document, $name);
        if (sizeof($name) <= 0) {
            $this->error('缺少定义的名称');
            return false;
        }
        $name = trim($name[0], '{ ');
        $params = preg_split("/$name|,|\{|\}/", $document);
        $fields = [];
        foreach ($params as $item) {
            if (trim($item)) {
                $param = array_filter(preg_split("/\s/", $item));
                if (sizeof($param) < 2) {
                    $this->error('定义的类型缺少类型或者字段名称');
                    continue;
                }
                //第一个是类型 
                $type = array_shift($param);
                //第二个是参数的名称
                $key = array_shift($param);
                $fields[$key] = [
                    'type' => $type,
                    'explain' => $param
                ];
            }
        }
        return [
            'fields' => $fields,
            'name' => $name
        ];
    }
}
