import React from "react";
import {Tag} from "antd";
import {methodProps,methodState,paramFormat} from "./define";
class Method extends React.Component<methodProps,methodState>{
    constructor(props:methodProps){
        super(props)
        this.state={
            attr:{'public':"#2db7f5",'static':"#87d068",'private':"#f50"}
        }
    }
    public render(){
        return (
            <this.build/>
        );
    }

    private build=():JSX.Element=>{
        let element:Array<JSX.Element>=[];
        
        for(let name in this.props.data){
            let tmp=(this.props.data as any)[name];
            let returnValue=tmp?.return?.type ? tmp.return.type : 'void';
            element.push(
                <div style={{padding:"10px 0px"}}>
                    {/* 函数的属性 */}
                    {tmp.attribute.map((item:any)=>{
                        return  this.getTag((item as any));
                    })}
                    {/* 函数名称以及参数 */}
                    {name}({tmp.params?.map((item:paramFormat)=>{
                        return this.getParam(item);
                    })})：<a href="javascript:;">{returnValue}</a>
                </div>
            );
        }
        return <div>{element}</div>;
    }
    
    private getTag=(key:"public"|"static"|"private"):JSX.Element=>{
        let color=(this.state.attr as any)[key];
        return <Tag color={color}>{key}</Tag>
    }

    private getParam=(param:paramFormat):JSX.Element=>{
        return <span><Tag>{param.type}</Tag>{param.name} </span>
    }
}
export default Method;