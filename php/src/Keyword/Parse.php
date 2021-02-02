<?php

namespace Auto\Doc\Keyword;

use Auto\Doc\Console\Printf;

class Parse
{
    /**
     * @var array
     */
    private $handler = [];

    public function __construct()
    {
        $this->handler = require(__DIR__ . '/Providers.php');
    }

    public function boot(): \Closure
    {
        return function (string $keywork, array $params): array {
            if (!isset($this->handler[$keywork])) {
                Printf::error('关键词:' . $keywork . '错误');
                return [];
            }
            $data = $this->handler[$keywork]::handle($params);
            if (!$data) {
                return [];
            }
            $isAlone = $this->handler[$keywork]::isAlone();
            return [
                'isAlone' => $isAlone,
                'keywork' => $keywork,
                'data' => $data,
            ];
        };
    }

    public function merge(array $data)
    {
        $api = $data['api'];
        unset($data['api']);
        $data['method'] = $api['method'];
        $data['path'] = $api['path'];
        return $data;
        //$this->addGroup($data);
    }
}
