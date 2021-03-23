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

    /**
     * @var bool outside 标签是否外置不与其他标签合并
     */
    protected $outside;

    static $instance = [];

    public function log(...$vars)
    {
        Printf::log(...$vars);
    }
    public function error(...$vars)
    {
        Printf::error(...$vars);
    }

    private static function getInstance(){
        $class = get_called_class();
        if (!isset(self::$instance[$class])) {
            self::$instance[$class] = new static;
        }
        return self::$instance[$class];
    }

    public static function handle(array $params)
    {
        return self::getInstance()->boot($params);
    }

    public static function isAlone(): bool
    {
        $instance=self::getInstance();
        return is_null($instance->alone) ? true : $instance->alone;
    }

    public static function isOutside():bool{
        $instance=self::getInstance();
        return is_null($instance->outside) ? false : $instance->outside;
    }
}
