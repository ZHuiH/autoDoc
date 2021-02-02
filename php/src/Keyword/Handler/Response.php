<?php

namespace Auto\Doc\Keyword\Handler;

use Auto\Doc\Keyword\Handler\Base;
//设置api返回数据
class Response extends  Base
{
    protected $alone = false;

    public function boot(array $params)
    {
        if (sizeof($params) < 1) {
            $this->error('缺少参数');
            return false;
        }
        $result = $this->parse($params);
        return $result;
    }

    private function parse(array $params): array
    {
        $code = 200;
        $param = [];
        $description = "";
        if (is_numeric($params[0])) {
            $code = intval($params[0]);
        }

        foreach ($params as $item) {
            if (is_array($item) && isset($item['keywork'])) {
                if ($item['keywork'] == 'param') {
                    array_push($param, $item['data']);
                } else if ($item['keywork'] == 'description') {
                    $description = $item['data'];
                }
            }
        }
        return [
            'code' => $code,
            'param' => $param,
            'description' => $description
        ];
    }
}
