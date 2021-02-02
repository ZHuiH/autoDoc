import React from 'react';
import Header from "../../common/v1/navigation/header";
import MenuList from "../../common/v1/navigation/menuList";
import Utils from "../../utils/utils";
import {Layout,notification,message} from "antd";
import Api from "./api";
import Info from "./info";
import {homeState} from "./define"

export class Home extends React.Component<{},homeState>{
    constructor(props:{}){
        super(props);
        this.getJson();
        this.state={
            menuList:null,
            Origin:null,
            //navigation:['方法','变量','常量'],
            current:{
                info:{},
                methods:{}
            },
            baseHost:'',
            version:'',
            title:'',
            index:"0",
            name :'',
        }
    }
    public render() {
        return (
                <Layout style={{height:"100%"}}>
                    <Header item={this.state.navigation} activePage={this.activePage} search={this.search}/>
                    <Layout>
                        <MenuList item={this.state.menuList}  replace={this.replace}/>
                        <Layout style={{margin:"10px",background:"#fff"}}>
                            <Layout.Content>
                                <Info title={this.state.title} baseHost={this.state.baseHost} version={this.state.version}/>
                                <Api item={this.state.current.api} baseHost={this.state.baseHost} requestExample={this.requestExample}/>
                            </Layout.Content>
                        </Layout>
                    </Layout>
                </Layout>
        );
    }
    private getJson(file:string='data.json'){
        let fileName=new URLSearchParams(window.location.search).get('file');
        if(fileName && file=='data.json'){
            file=fileName;
        }
        Utils.request('get',file).then(res=>{
            //if(res.success){
                let menu:string|null=new URLSearchParams(window.location.search).get('menu');
                let current={
                    info:{},
                    methods:{}
                };
                if(menu){
                    //console.log(res.data.group);
                    let index=menu.split('-');
                    if(res.group[index[1]] && res.group[index[1]][index[0]]){
                        current=res.group[index[1]][index[0]];
                    }
                }
                
                this.setState({
                    menuList:res.group,
                    baseHost:res.baseHost,
                    title:res.title,
                    version:res.version,
                    current:current
                })
                notification.success({
                    message:'ok',
                    top:30
                });
            // }else{
            //     notification.error({
            //         message:res.errorMessage ?  res.errorMessage   :'请求失败',
            //         top:30
            //     });
            // }
        }).catch(err=>{
            console.log(err);
            notification.error({
                message:'失败',
                top:30
            });
            message.destroy();
        });
    }
    // private showContent=():JSX.Element=>{
    //     switch(this.state.index){
    //         case "0" : return <Method data={this.state.current.methods} />;
    //         default : return <Method data={this.state.current.methods} />;
    //     }
    // }
    //顶部导航切换页面
    private activePage=(index:string):void=>{
        this.setState({index:index})
    }
    //搜索json文件
    private search=(value:string):void=>{
        this.getJson(value);
        window.history.pushState('myself-menu','',`?file=${value}`);
    }
    //左侧导航
    private replace=(key:string,data:object):void=>{
        let file:string|null=new URLSearchParams(window.location.search).get('file');
        let query=`?menu=${key}`;
        if(file){
            query+=`&file=${file}`;
        }
        window.history.pushState('myself-menu','',query);
        this.setState({
            current :data,
            name    :''
        })
    }

    //更新参数示例
    private requestExample=(request:any,data:any):void=>{
        let tmp:any=Object.assign(this.state.current);
        tmp?.api.map((item:any,index:number)=>{
            if(item.url.path===request.url && item.url.method===request.method){
                item.return_example=JSON.stringify(data);
            }
        })
        this.setState({
            current:tmp
        });
    }
    
}