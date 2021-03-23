import React from "react";
import {Empty,Input} from "antd";
import Utils from "../../utils/utils"

//搜索
function search(file:string){
    file=file+'.json';
    // Utils.request('get',file).then(res=>{
    //     let path='/';
    //     //兼容v1
    //     if(!res.render){
    //         path=`/v1?file=${file}`;
    //     }else{
    //         path=`?file=${file}`;
    //     }
    //     //重定向
    //     window.location.href=`${document.location.origin}${path}`
    // });
}

//404页面
export default function NoFound():JSX.Element{
    return (
        <div className="no-fund-main">
            <Empty description="404 no found">
                <div className="no-fund-search">
                    <Input.Search suffix=".json" onSearch={(value)=>search(value)}/>
                </div>
            </Empty>
        </div>
    );
}