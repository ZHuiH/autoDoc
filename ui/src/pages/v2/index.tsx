import React from "react";
import {Empty,Collapse,Tag,Tabs} from "antd";
import {store} from "../../store/index"
import {v2Apis} from "../../store/format"
import {Param,apiParam} from "./param"
import {Response,apiResponse} from "./response"
import {Header} from "./header"
import {Description,apiAuth} from "./description"
type apiBody={
    path:string
    description:string
    param?:Array<apiParam>
    response?:Array<apiResponse>
    auth?:Array<apiAuth>
}
export  class Index extends React.Component<any,v2Apis>{
    constructor(props:any){
        super(props);
        this.state={
            apis:[],
            group:""
        };
        store.subscribe(()=>{
            let goups=store.getState().currentGroup
            if(goups){
                this.setState(goups)
            }
        })
    }
    //折叠面板里面的内容
    private body(body:apiBody):JSX.Element{
        let { TabPane } = Tabs;
        return(
            <Tabs>
                <TabPane tab="接口描述" key="1">
                    <Description content={body.description ??""} auth={body.auth??[]} />
                </TabPane>
                <TabPane tab="请求参数" key="2">
                    <Param data={body.param??[]}></Param>
                </TabPane>
                <TabPane tab="返回参数" key="3">
                    <Response data={body.response??[]}/>
                </TabPane>
            </Tabs>
        );
    }
    //遍历apis
    private apis():JSX.Element {
        let Panel=Collapse.Panel;
        let item=this.state.apis.map((item,index)=>{
            return (
                <Panel 
                    header={<Header method={item.method} path={item.path} />} 
                    key={`apis-${index}`}>
                    {this.body(item)}
                </Panel>
            );
        })
        return <Collapse expandIconPosition="right" accordion>{item}</Collapse>
    }

    private invoke():JSX.Element {
        if(this.state.apis.length<=0){
            return <Empty  description="暂无数据"/>
        }
        return this.apis()
    }

    /**
     * render
     */
    public render():JSX.Element {
        return (
            <div className="content-main">
                {this.invoke()}
            </div>
        );
    }
}

