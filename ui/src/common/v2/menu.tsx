import React from "react";
import {RouteComponentProps,withRouter} from "react-router-dom";
import { Layout,Menu as AntdMenu } from 'antd';
import {store} from "../../store/index"
import {v2Data} from "../../store/format"
import {change} from "../../store/action"
import Utils from "../../utils/utils"

interface MenuState{
    data:v2Data,
    index:number
}

class Menu extends React.Component<RouteComponentProps,MenuState>{
    constructor(props:RouteComponentProps){
        super(props);
        this.state={
            data:{
                title:"",
                version:"",   
                render:2,  
                content:[]    
            },
            index:0
        }
        store.subscribe(()=>{
            this.setState({data:store.getState().current})
        })
    }

    /**
     * menu
     */
    private menu() {
            return this.state.data.content.map((item,index)=>{
                return (
                    <AntdMenu.Item key={`menu-${index}`}>
                        {item.group}
                    </AntdMenu.Item>
                )
            })
    }

    private click(key:string) {
        let index=Number(key.split('-')[1])
        Utils.addQuery('menu',index);
        change('currentGroup',this.state.data.content[index])
        this.setState({index:Number(index)})
    }

    private restore() {
        let index=Utils.getQuery('menu')
        if(this.state.data.content.length>0 && Number(index)!=this.state.index){
            //因为是在render之前的，先等render之后才执行
            setTimeout(()=>this.click(`menu-${index}`),0)
        }
    }

    /**
     * show
     */
    private show():JSX.Element {
        let render=Utils.getQuery(Utils.render)
        if(render && render=='v2'){
            this.restore();
            return (
                <Layout.Sider>
                    <AntdMenu onSelect={({key})=>this.click(key as string)}>
                        {this.menu()}
                    </AntdMenu>
                </Layout.Sider>
            );
        }
        return <div></div>;
    }
    /**
     * render
     */
    public render() {
        return this.show()
    }
}

export default withRouter(Menu);