import React from "react";
import {Empty,Collapse,Descriptions,Tabs} from "antd";
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

interface HomeState extends v2Apis{
    title:string
    version:string
    render:number
}

export  class Index extends React.Component<any,HomeState>{
    constructor(props:any){
        super(props);
        this.state={
            apis:[],
            group:"",
            render:0,
            version:"",
            title:"",
        };
        store.subscribe(()=>{
            let goups=store.getState().currentGroup??{apis:[],group:""}
            let fileInfo=store.getState().current
            this.setState({
                apis:goups.apis,
                group:goups.group,
                render:fileInfo.render ?? 0,
                version:fileInfo.version ?? "",
                title:fileInfo.title ?? "",
            })
        
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

    private fileInfo():JSX.Element{
        if(this.state.render > 0 && this.state.version){
            return (
                <Descriptions title="文档信息">
                    <Descriptions.Item label="标题：">{this.state.title}</Descriptions.Item>
                    <Descriptions.Item label="版本：">{this.state.version}</Descriptions.Item>
                    <Descriptions.Item label="渲染版本：">{this.state.render}</Descriptions.Item>
                </Descriptions>
            );
        }
        return <div></div>
    }

    /**
     * render
     */
    public render():JSX.Element {
        return (
            <div className="content-main">
                {this.fileInfo()}
                {this.invoke()}
            </div>
        );
    }
}

