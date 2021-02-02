import React from 'react';
import {PageHeader,Descriptions,Empty} from "antd";
import {infoProps} from "./define";


class Info extends React.Component<infoProps>{
    constructor(props:infoProps){
        super(props);
    }
   
    public render() {
        let elemtnt:JSX.Element;
        if(this.props.mode && this.props.mode === 'project'){
            elemtnt=this.projectMpde();
        }else{
            elemtnt=this.apiMpde();
        }
        return (
            <div>
                {elemtnt}
            </div>
        );
    }

    private apiMpde=():JSX.Element=>{
        if(!this.props.baseHost){
            return <div></div>;
        }
        return(
            <PageHeader title={this.props.baseHost}>
                <Descriptions size="small" column={2}>
                    <Descriptions.Item label="接口">{this.props?.title}</Descriptions.Item>
                    <Descriptions.Item label="版本">{this.props?.version}</Descriptions.Item>
                    </Descriptions>
            </PageHeader>
        );
    }
    private projectMpde=():JSX.Element=>{
        if(!this.props.title){
            return <div></div>;
        }
        return(
            <PageHeader title={this.props.title}>
                <Descriptions size="small" column={2}>
                    <Descriptions.Item label="作者">{this.props?.author}</Descriptions.Item>
                    <Descriptions.Item label="版本">{this.props?.version}</Descriptions.Item>
                    <Descriptions.Item label="包">{this.props?.package}</Descriptions.Item>
                    <Descriptions.Item label=""> </Descriptions.Item>
                    <Descriptions.Item label="说明">
                        {this.props?.descriptions?.map((item,index)=>{
                            return <span key={`infoDescriptions${index}`}>{item} </span>;
                        })}
                    </Descriptions.Item>
                    </Descriptions>
            </PageHeader>
        );
    }
}


export default Info;