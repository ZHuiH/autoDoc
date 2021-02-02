<?php

namespace Auto\Doc\Console;

class Printf
{
    public static function log(...$var)
    {
        foreach ($var as $item) {
            echo (string)$item;
            echo "\r\n";
        }
    }

    public static function error(...$vars)
    {
        foreach ($vars as  $item) {
            echo "\033[1;31;40m"; //变红
            echo (string)$item;
            echo "\033[1;37;40m"; //正常（黑底白字）
            echo "\r\n";
        }
    }

    public static function info(...$vars)
    {
        foreach ($vars as  $item) {
            echo "\033[1;32;40m"; //变绿
            echo (string)$item;
            echo "\033[1;37;40m"; //正常（黑底白字）
            echo "\r\n";
        }
    }
}
