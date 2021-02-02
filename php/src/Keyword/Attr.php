<?php

namespace Auto\Doc\Keyword;

class Attr
{
    private $grammar = "";
    /**
     * @var array 待解析的标签
     */
    private $flag = [];

    /**
     * @var array 解析标签获取出来的值
     */
    private $values = [];

    public function getKeyword(string $grammar)
    {
        $keyword = [];
        preg_match('/@?\w+/', $grammar, $keyword);
        if (sizeof($keyword) < 1) {
            return false;
        }
        return $keyword[0];
    }

    public function trimKeywork($keyword, $grammar)
    {
        if ($keyword) {
            //$str = str_replace("{$keyword}(", '', $grammar);
            $str = substr($grammar, strlen($keyword) + 1);
            return substr($str, 0, strlen($str) - 1);
        }
        return false;
    }

    /**
     * 将一条注解切割并标识
     */
    public function split(string $str)
    {
        $index = 0;
        $next = [];
        $pattern = '/@[\x7f-\xff\w\(,#\d\s]*?\)/';
        \preg_match_all($pattern, $str, $next);

        while (sizeof($next[0]) >= 1) {
            foreach ($next[0] as $item) {
                $key = "#$index";
                $str = \str_replace("$item", $key, $str);

                $index++;
                array_push($this->flag, $item);
            }
            \preg_match_all($pattern, $str, $next);
        }

        $this->grammar = $str;
    }

    /**
     * 从顶部开始解析标签
     * @param function $parse
     */
    public function parseFlag(\Closure $parse)
    {
        if (sizeof($this->flag) > 0) {;
            foreach ($this->flag as $index => $item) {
                $keyword = $this->getKeyword($item);
                if ($keyword) {
                    $keyword = trim($keyword, '@ ');
                    $params = explode(',', trim(\str_replace($keyword, '', $item), '@()'));
                    foreach ($params as $i => $val) {
                        $val = trim($val);
                        if ($val && $val[0] == '#') {
                            $key = ltrim($val, '#');
                            $params[$i] = isset($this->values[$key]) ? $this->values[$key] : $this->flag[$key];
                        }
                    }
                    if (is_callable($parse)) {
                        $this->values[$index] =  $parse($keyword, $params);
                    }
                }
            }
        }
    }

    /**
     * 设置输入数据
     */
    public function setInput(): array
    {
        $params = explode(',', $this->grammar);
        $input = [];
        foreach ($params as $item) {
            $item = trim($item);
            //检查是不是标识符
            if ($item && $item[0] == "#") {
                $index = ltrim($item, '#');
                //如果有解析的值出来，那就转换，没有就换回原来的标签
                $item = isset($this->values[$index]) ? $this->values[$index] : $this->flag[$index];
            }
            array_push($input, $item);
        }
        return $input;
    }

    public function reset()
    {
        $this->grammar = "";
        $this->flag = [];
        $this->values = [];
    }
}
