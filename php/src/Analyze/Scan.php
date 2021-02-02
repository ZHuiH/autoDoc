<?php

namespace Auto\Doc\Analyze;

use Auto\Doc\Console\Printf;
use Auto\Doc\Analyze\File;

class Scan implements \ArrayAccess, \IteratorAggregate
{

    /**
     * @var  File[] 文件列表
     */
    private $files = [];


    public function __construct(string $path = "")
    {
        $path = rtrim($path, DIRECTORY_SEPARATOR);
        $this->scan($path);
        if (sizeof($this->files) <= 0) {
            Printf::error('没有php文件');
            die;
        }
    }
    //扫描
    public function scan(string $path = "")
    {
        if (!is_dir($path)) {
            Printf::error('路径错误:' . $path);
            return;
        }
        $dir = scandir($path);
        foreach ($dir as $item) {
            if ($item != '.' && $item != '..') {
                $nextPath = $path . '/' . $item;
                //遇到目录，递归读取
                if (is_dir($nextPath)) {
                    $this->scan($nextPath);
                } else {
                    $file = File::create($nextPath);
                    if ($file) {
                        array_push($this->files, $file);
                    }
                }
            }
        }
    }

    public function offsetExists($offset)
    {
        return array_key_exists($offset, $this->files);
    }

    public function offsetGet($offset)
    {
        return $this->files[$offset] ?? null;
    }

    public function offsetSet($offset, $value)
    {
        if (is_null($offset)) {
            $this->files[] = $value;
        } else {
            $this->files[$offset] = $value;
        }
    }

    public function offsetUnset($offset)
    {
        unset($this->files[$offset]);
    }

    public function getIterator()
    {
        return new \ArrayIterator($this->files);
    }
}
