import React from 'react';
import {Layout,Menu} from "antd";
import {menuProps,menuState} from './define';

class MenuList extends React.Component<menuProps,menuState>{
    constructor(props:menuProps){
        super(props);
        this.state={
            current:""
        };
    }

    /**
     * 左边菜单栏
     */
    public render(){
        let item:Array<JSX.Element>=[];
        for(let key in this.props.item){
            let menu=Object.keys(this.props.item[key]);
            item.push(
                <Menu.SubMenu key={`${key}`} title={key}>
                    {this.Menu(menu,key)}
                </Menu.SubMenu>
            );
        }
        return (
            <Layout.Sider width={366}>
                <Menu mode='inline' onClick={this.menuClick}>
                    {item}
                </Menu>
            </Layout.Sider>
        );
    }

    private Menu=(item:Array<string>,parent:string):JSX.Element[]=>{
        return item.map((val,index)=>{
            return (
                <Menu.Item key={`${val}-${parent}`}>
                    {val}
                </Menu.Item>
            )
        });
    }

    private menuClick=(res:any):void=>{
        let index=res.key.split('-');
        if(this.props.replace && res.key !== this.state.current){
            this.setState({current:res.key});
            this.props.replace(res.key,this.props.item[index[1]][index[0]]);
        }
    }

}

export default MenuList;