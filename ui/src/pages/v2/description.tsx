import React from "react"
import {Empty,Divider,Descriptions} from "antd"

export type apiAuth={
    source:'body'|'header',
    name:string
    defalut:string
}

type descriptionProps={
    content:string
    auth?:Array<apiAuth>
}

export class Description extends React.Component<descriptionProps>{

    private layout():JSX.Element{
        if(this.props.content.length<1 && (!this.props.auth || this.props.auth.length<1)){
            return <Empty description="暂无说明" />
        }
        let item=[<div></div>];
        if(this.props.auth && this.props.auth.length>0){
            let auth:Array<JSX.Element>=[]
            this.props.auth.map((item,index)=>{
                auth.push(
                    <Descriptions.Item label='来源' key={`auth-source-${index}`}>
                        {item.source}
                    </Descriptions.Item>,
                    <Descriptions.Item label='名称' key={`auth-name-${index}`}>
                        {item.name}
                    </Descriptions.Item>,
                    <Descriptions.Item label='默认值' key={`auth-defalut-${index}`}>
                        {item.defalut}
                    </Descriptions.Item>,
                )
            })

            item=[
                <Divider plain key={Math.random()}>Auth</Divider>,
                <Descriptions key={Math.random()}>
                    {auth}
                </Descriptions>
            ]
        }
        return (
            <div>
                <p>{this.props.content}</p>
                {item}
            </div>
        );
    }
    /**
     * render
     */
    public render() {
        return this.layout();
    }
}