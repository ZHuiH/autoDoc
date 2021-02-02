import React from "react"
import {Layout,Input,Row, Col,Tabs, Tree} from "antd"
import Utils from "../../utils/utils"
import {save,merage,splice,change} from "../../store/action"
import { store } from "../../store"

type headerState={
    files:Array<string>
    current:number
}
export default class Header extends React.Component<{},headerState>{
    private tabsKey="-header-tabs";
    public constructor(props:any) {
        super(props)
        this.state={
            files:[],
            current:0
        }
        let file=Utils.getQuery('file')
        if(file){
            this.seach(file.replace('.json',''));
        }
    }

    private changeQuery(index:number) {
        //Utils.removeQuery('menu');
        Utils.addQuery('file',this.state.files[index]);
    }

    //关闭tabs
    private close(key:string){
        let index:number=Number(key.split('-')[0]);
        this.state.files.splice(index,1)
        splice('data',index);
        this.setState({
            files:this.state.files
        })
    }
    //更改tabs
    private change(key:string) {
        let index:number=Number(key.split('-')[0]);
        change('current',store.getState().data[index])
        change('currentGroup',store.getState().data[index].content[0])
        this.setState({
            current:index
        })
        this.changeQuery(index);
    }
    //遍历渲染tabs
    private files() {
        let item= this.state.files.map((item,index)=>{
            return (
                <Tabs.TabPane  key={`${index}${this.tabsKey}`} tab={item}/>
            );
        })
        return <Tabs 
            size="large" 
            type="editable-card" 
            hideAdd 
            onChange={(targetKey)=>this.change(targetKey)}
            onEdit={(targetKey, action)=>this.close(targetKey as string)}
            activeKey={`${this.state.current}${this.tabsKey}`}
            className="header-tabs">
                {item}
            </Tabs>
    }

    //输入框触发搜索
    private seach(file:string) {
        file+='.json'
        if(!this.state.files.includes(file)){
            this.toSearch(file);
            return;
        }
        let index=this.state.files.indexOf(file);
        this.setState({
            current:index
        })
        this.changeQuery(index);
        change('current',store.getState().data[index])
    }

    /**
     * toSearch 请求文件
     */
    private toSearch(file:string) {
        Utils.request('get',file).then(res=>{
            if(res.render && res.render==2){
                if(this.state.files.length<1){
                    save('data',res);
                }else{
                    merage('data',res)
                }
                this.state.files.push(file)
                let index=this.state.files.length-1;
                this.setState({
                    files:this.state.files,
                    current:index
                })
                this.changeQuery(index);
                change('current',store.getState().data[index])
            }
        })
    }

    /**
     * render
     */
    public render() {
        let render=Utils.getQuery(Utils.render);
        if(render !=='v2'){
            return <div></div>
        }
        return (
            <Layout.Header>
                <Row>
                    <Col span={8}>
                        <Input.Search size="middle" className="header-searach"  defaultValue="" suffix={<span>.json</span>} onSearch={(value, event)=>this.seach(value)} />
                    </Col>
                    <Col offset={1}   span={15}>
                        {this.files()}
                    </Col>
                </Row>
            </Layout.Header>
        )
    }
}