import React from "react";
import {Tag,Empty,Collapse,Table,Tree,Form,Input,Button,notification} from "antd";
import {ApiProps,UrlParam,nodeParam,paramFormat,ApiState} from "./define";
import Utils from "../../utils/utils";
class Api extends React.Component<ApiProps,ApiState>{
    constructor(props:ApiProps){
        super(props)
        this.state={
            color:{'get':"#2db7f5",'post':"#87d068",'delete':"#f50",'put':'#722ed1'},
            requestConfig:{
                method:"",
                url:""
            },
        }
    }
    public render(){
        if(!this.props.item){
            return  <Empty description="无内容" />;
        }
        return (
            <Collapse accordion  expandIconPosition='right' onChange={this.saveData}>
                {this.build()}
            </Collapse>
        );
    }

    private build=():JSX.Element[]=> {
        return (this.props.item as Array<any>).map((item,index)=>{
            let key=`${item.url.method}-space-${item.url.path}`;
            let query=this.parseUrl(item.url.path);
            return(
                <Collapse.Panel header={this.row(item.url,item?.descriptions?.[0])} key={key}>
                    {this.getTitle('请求参数：')}
                    {this.requestParam(item?.params)}
                    <br/>
                    {this.getTitle('返回参数格式：')}
                    {this.returnParam(item?.return_format)}
                    <br/>
                    {this.getTitle('返回参数示例：')}
                    {this.returnExample(item?.return_example)}
                    <br/>
                    {this.getTitle('测试：')}
                    {this.paramForm(key,query,item?.params)}
                </Collapse.Panel>
                
            );
        });
    }

    //请求path以及method
    private row=(param:UrlParam,descriptions:string):JSX.Element=>{
        return (
            <div>
                <Tag color={(this.state.color as any)[param.method]}>{param.method}</Tag>
                <span>{param.path} &nbsp; {param.description ? param.description : descriptions}</span>
            </div>
        );
    }

    //请求参数
    private requestParam=(item:any):JSX.Element=>{
        if(!item){
            return this.getEmpty('无需请求参数');
        }

        return(
            <Table dataSource={item} pagination={false} rowKey={(_r:any,index:any)=>`table-column${index}`}>
                <Table.Column title="名称"  dataIndex="name"/>
                <Table.Column title='类型'  dataIndex="type"/>
                <Table.Column title='必传'  dataIndex="required" render={required=>{
                    let is_required=required ? <a>是</a> : <span>否</span>;
                    return is_required;
                }}/>
                <Table.Column title='默认'  dataIndex="default"/>
                <Table.Column title='说明'  dataIndex="description"/>
            </Table>
        );
    }

    //返回参数格式
    private returnParam=(item:any):JSX.Element=>{
        if(!item){
            return this.getEmpty('无返回参数格式');
        }
        return (
            <Tree style={{fontSize:'16.6px'}}>
                <Tree.TreeNode title={item.type} key={`${item.type}Tree`}>
                    {item.child.map((item:nodeParam)=>{
                        return this.getNodes(item)
                    })}
                </Tree.TreeNode>
            </Tree>
        );
    }

    //返回参数示例
    private returnExample=(str:string):JSX.Element=>{
        if(!str){
            return this.getEmpty('无返回示例');
        }
        let content=null;
        try {
            content=JSON.stringify(JSON.parse(str),null,"\t");
        } catch (error) {
            content=str;
        }
        return (
            <pre style={{background:'#00000012'}}>
                {content}
            </pre>
        );
    }
    
    //获取子节点
    private getNodes=(nodes:nodeParam):JSX.Element=>{
        if(!nodes){
            return <span></span>;
        }

        let child=null;
        if(nodes.child){
            child=nodes.child.map((item)=>{
                return this.getNodes(item);
            });
        }
        let title=`${nodes.name} : ${nodes.type}`;
        return (    
            <Tree.TreeNode title={title} key={Math.random()}>
                {child}
            </Tree.TreeNode>
        );
    }

    //将请求参数转换form表单
    private paramForm=(key:string,query:Array<string>,param?:Array<paramFormat>):JSX.Element=>{
        let result:JSX.Element[]=query.map((item,index)=>{
            return (
                <Form.Item 
                    key={`formItemQuery-${index}`} 
                    label={item}  name={item} 
                    rules={[{ required: true, message:`${item} 必传` }]}>
                    <Input/>
                </Form.Item>
            );
        });

        param?.map((item,index)=>{
            result.push(
                <Form.Item 
                    key={`formItemParam-${index}`} 
                    label={item.name}  name={item.name} 
                    rules={[{ required: item.required, message:`${item.name} 必传` }]}>
                    <Input/>
                </Form.Item>
            )
        });

        result.push(
            <Button 
                key={`formButtom-${key}`}
                style={{marginLeft:"20%",width:"60%"}} 
                type="primary"
                htmlType="submit">
                    提交测试
                </Button>
        );

        let nature:object={
            labelCol:{span:4},
            wrapperCol:{span: 16},
            name:`form-${key}`,
            onFinish:this.postData
        };
        
        return <Form {...nature}>{result}</Form>;
    }

    //提交请求
    private postData=(res:any)=>{
        let url:string='';
        let config:any=this.state.requestConfig;
        //解析url把参数插入到url中并剔除参数
        (config.url as string).split('/').map((item)=>{
            let tmp:string=item;
            if(/\{.{1,}\}/.test(item)){
                let key:string=item.slice(1,item.length-1);
                tmp=res[key];
                delete res[key];
            }
            url+=`/${tmp}`;
        });
        //请求
        let baseHost=this.props.baseHost;
        Utils.request(config.method,baseHost+url,res).then((res:any)=>{
            if(this.props.requestExample){
                this.props.requestExample(this.state.requestConfig,res);
            }
        }).catch(err=>{
            console.log(err);
            notification.error({
                top:30,
                message:JSON.stringify(err),
            });
        })

    }

    //解析url
    private parseUrl=(url:string):Array<string>=>{
        let query:Array<string>=[];
        url.split('/').map((item)=>{
            if(/\{.{1,}\}/.test(item)){
                query.push(item.slice(1,item.length-1));
            }
        });
        return query;
    }

    //标题
    private getTitle=(title:string):JSX.Element=> {
        return <p><b style={{fontSize:'18px'}}>{title}</b></p>
    }

    //标题
    private getEmpty=(title:string):JSX.Element=> {
        return <Empty description={title} image={Empty.PRESENTED_IMAGE_SIMPLE} />;
    }

    //保存当前打开的折叠面板包含的信息
    private saveData=(res:any)=>{
        if(!res){
            return;
        }
        let data=res.split('-space-');
        this.setState({requestConfig:{
            method:data[0],
            url:data[1]
        }});
    }

}
export default Api;