<?php

namespace Auto\Doc\Analyze;

class File
{
    public static function create($path)
    {
        $info = pathinfo($path);
        if (isset($info['extension']) && $info['extension'] == 'php') {
            return new File($info);
        }
        return null;
    }
    /**
     * @param pathinfo
     */
    public function __construct(array $fileInfo)
    {
        $this->name = $fileInfo['filename'] ?? "";
        $this->extension = $fileInfo['extension'] ?? "";
        $this->dirname = $fileInfo['dirname'] ?? "";
        $this->fullName = $fileInfo['basename'] ?? "";
        $this->path = $this->dirname . '/' . $this->fullName;
        $this->getNote();
    }

    public $name = ""; //文件名称 不包含扩展名
    public $fullName = ""; //文件名称 包含扩展名
    public $extension = "php"; //固定的文件扩展
    public $path = ""; //路径包括文件本身
    public $dirname = ""; //路径（没有包括文件本身）
    public $notes  = []; //当前文件的所有注解 二维数组

    //获取注解
    public function getNote()
    {
        $contents = file_get_contents($this->path);
        //去掉换行
        //$document = preg_replace('/[\r\n]/',  ' ', $contents);
        //将注解分组
        $notes = [];
        //一个注解作为一个作用域
        preg_match_all('/\/\*[\S\s]*?\*\//', $contents, $notes);
        foreach ($notes[0] as $n) {
            //分割顶级关键字
            $temp = explode('@doc\\', $n);
            $annotate = [];
            foreach ($temp as $item) {
                //过滤两侧的字符串
                $unitDoc = trim($item, "* / ,\r\n");
                if ($unitDoc) {
                    array_push($annotate, preg_replace('/\r\n.?\*|\r\n/', ' ', $unitDoc));
                }
            }
            if (sizeof($annotate) > 0) {
                array_push($this->notes, $annotate);
            }
        }
    }
}
