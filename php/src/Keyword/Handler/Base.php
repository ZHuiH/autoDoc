<?php

namespace Auto\Doc\Keyword\Handler;

use Auto\Doc\Console\Printf;

abstract class Base
{
    /**
     * @var string document 返回整个注解，排除掉* 以及关键词 @ 等
     */
    abstract  public function boot(array $params);

    /**
     * @var bool alone 标签是否只能在一个注解中出现一次
     */
    protected $alone;

    static $instance = [];

    public function log(...$vars)
    {
        Printf::log(...$vars);
    }
    public function error(...$vars)
    {
        Printf::error(...$vars);
    }

    public static function handle(array $params)
    {
        $class = get_called_class();
        if (!isset(self::$instance[$class])) {
            self::$instance[$class] = new static;
        }
        return self::$instance[$class]->boot($params);
    }


    public static function isAlone(): bool
    {
        $class = get_called_class();
        if (!isset(self::$instance[$class])) {
            self::$instance[$class] = new static;
        }
        return is_null(self::$instance[$class]->alone) ? true : self::$instance[$class]->alone;
    }
}
