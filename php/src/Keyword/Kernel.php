<?php

namespace  Auto\Doc\Keyword;

use Auto\Doc\Analyze\File;
use Auto\Doc\Console\Printf;
use Auto\Doc\Keyword\Attr;
use Auto\Doc\Keyword\Parse;

class Kernel
{
    /**
     * @var Attr 
     */
    private $attr = null;
    /**
     * @var Parse 
     */
    private $parse = null;

    //private $mode = 1;
    public function __construct()
    {
        $this->attr = new Attr;
        $this->parse = new Parse;
    }

    public function boot(File $file)
    {
        $notes = [];
        if (sizeof($file->notes) > 0) {
            Printf::log($file->path);
            foreach ($file->notes as $note) {
                $data = $this->grouping($note);
                if (isset($data['api'])) {
                    array_push($notes, $data);
                }
            }
            Printf::info($file->path);
        }
        return $notes;
    }

    public function grouping(array $notes)
    {
        $result = [];
        $handler = $this->parse->boot();
        foreach ($notes as $item) {
            $this->attr->reset();
            $keyword = $this->attr->getKeyword($item);
            $paramStr = $this->attr->trimKeywork($keyword, $item);
            if ($paramStr) {
                $this->attr->split($paramStr);
                $this->attr->parseFlag($handler);
                $input = $this->attr->setInput();
                $param = $handler($keyword, $input);
                if (sizeof($param) > 0) {
                    if ($param['isAlone']) {
                        $result[$keyword] = $param['data'];
                        continue;
                    }
                    if (!isset($result[$keyword])) {
                        $result[$keyword] = [$param['data']];
                        continue;
                    }
                    array_push($result[$keyword], $param['data']);
                }
            }
        }
        return $result;
    }

    public function merge(array $data)
    {
        $groups = [];
        $groupIndex = [];
        foreach ($data as $item) {
            $data = $this->parse->merge($item);
            $group = $data['group'] ?? 'defalut';
            unset($data['group']);
            $index = array_search($group, $groupIndex);
            if (!$index) {
                array_push($groupIndex, 'defalut');
                array_push($groups, [
                    'apis' => [],
                    'group' => $group,
                ]);
                $index = sizeof($groupIndex) - 1;
            }
            array_push($groups[$index]['apis'], $data);
        }
        return $groups;
    }
}
