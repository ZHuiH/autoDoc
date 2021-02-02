<?php

namespace Auto\Doc\Keyword\Handler;

use Auto\Doc\Keyword\Handler\Base;

//请求/调用参数
class Param extends  Base
{

    private $typeOfNull = [
        'string' => '',
        'int' => 0,
        'date' => '0-0-0-0 0:0:0',
        'float' => 0.00,
        'object' => null,
        'any' => null,
    ];

    private function getNull(string $type)
    {
        return $this->typeOfNull[$type] ?? null;
    }

    protected $alone = false;

    public function boot(array $params)
    {
        if (!isset($params[0]) || !is_string($params[0])) {
            $this->error('第一个参数是名称');
            return false;
        }

        if (!isset($params[1]) || !is_string($params[1])) {
            $this->error('第二个参数是类型');
            return false;
        }
        return $this->parse($params);
    }

    private function parse(array $params)
    {
        $name = array_shift($params);
        $type = array_shift($params);
        $required = array_shift($params);
        $defaultValue = [];
        $child = [];
        $description = "";
        foreach ($params as $item) {
            if (is_array($item)) {
                if (isset($item['keywork'])) {
                    if ($item['keywork'] == 'description') {
                        $description = $item['data'] ?? "";
                    } else if ($item['keywork'] == 'param') {
                        array_push($child, $item);
                    }
                }
                continue;
            }
            array_push($defaultValue, $item);
        }
        $value = implode(',', $defaultValue);
        //strtolower($value) == "null" ? $this->getNull($type) : settype($value, $type);
        return [
            'name' => $name,
            'type' => $type,
            'required' => $required == 'true',
            'default' => $this->setType($value, $type),
            'description' => $description,
            'children' => $this->setChild($child),
        ];
    }

    private function setChild(array $child)
    {
        $result = [];
        foreach ($child as $item) {
            array_push($result, $item['data']);
        }
        return $result;
    }

    private function setType($value, $type)
    {
        if (!$value || $value == "") {
            return '-';
        }
        if (strtolower($value) == "null") {
            return $this->getNull($type);
        }
        switch ($type) {
            case 'array':
                $value = explode(',', trim(str_replace('"', '', $value), '[]'));
                break;
            case 'object':
                $value = \json_decode($value, true);
                break;
            default:
                settype($value, $type);
        }
        return $value;
    }

    // public function  boot(string $document)
    // {
    //     $arr = [];
    //     \preg_match_all('/\{.*?\}/', $document, $arr);
    //     if (sizeof($arr) <= 0) {
    //         return false;
    //     }
    //     $params = [];
    //     foreach ($arr[0] as $item) {
    //         $attr = \preg_split('/,/', $item);
    //         $param = [];
    //         foreach ($attr as $item) {
    //             if (!$item) {
    //                 continue;
    //             }
    //             $temp = explode(':', $item);
    //             if (sizeof($temp) <= 1) {
    //                 continue;
    //             }
    //             $key = ltrim($temp[0], '{ ');
    //             $value = trim($temp[1], '} ');
    //             $param[$key] = $value;
    //         }
    //         if (sizeof($param) > 0) {
    //             if (!isset($param['type']) || !isset($param['name'])) {
    //                 continue;
    //             }
    //             if (isset($param['defalut']) && $param['defalut'] == 'null') {
    //                 $param['defalut'] = $this->getNull($param['type']);
    //             }
    //             $param['required'] = isset($param['required']) ? $param['required'] == 'true' : false;
    //             array_push($params, $param);
    //         }
    //     }
    //     return $params;
    // }
}
