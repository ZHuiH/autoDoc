import React from "react"
import {RouteComponentProps,withRouter} from "react-router-dom";
import {Layout,Input,Row, Col,Tabs} from "antd"
import Utils from "../utils/utils"
import {StoreActive} from "../store/action"

class Header extends React.Component<RouteComponentProps,headerState>{
   // private tabsKey="-header-tabs";
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

    // private changeQuery(index:number) {
    //     Utils.addQuery('file',this.state.files[index]);
    // }

    //关闭tabs
    // private close(key:string){
    //     let index:number=Number(key.split('-')[0]);
    //     this.state.files.splice(index,1)
    //    // splice('data',index);
    //     // this.setState({
    //     //     files:this.state.files
    //     // })
    // }
    //更改tabs
    // private change(key:string) {
    //     let index:number=Number(key.split('-')[0]);
    //     this.setState({
    //         current:index
    //     })
    //     this.changeQuery(index);
    // }
    //遍历渲染tabs
    // private files() {
    //     let item= this.state.files.map((item,index)=>{
    //         return (
    //             <Tabs.TabPane key={`${index}${this.tabsKey}`} tab={item}/>
    //         );
    //     })
    //     return <Tabs 
    //         size="large" 
    //         type="editable-card" 
    //         hideAdd 
    //         onChange={(targetKey)=>this.change(targetKey)}
    //         onEdit={(targetKey, action)=>this.close(targetKey as string)}
    //         activeKey={`${this.state.current}${this.tabsKey}`}
    //         className="header-tabs">
    //             {item}
    //         </Tabs>
    // }

    //输入框触发搜索
    private seach(file:string) {
        file+='.json'
        if(!this.state.files.includes(file)){
            this.toSearch(file);
            return;
        }
        // let index=this.state.files.indexOf(file);
        // this.setState({
        //     current:index
        // })
        // this.changeQuery(index);
        //change('current',store.getState().data[index])
    }

    /**
     * toSearch 请求文件
     */
    private toSearch(file:string) {
        Utils.request('get',file).then(res=>{
            this.state.files.push(file)
            let index=this.state.files.length-1;
            this.setState({
                files:this.state.files,
                current:index
            })
            StoreActive.set({current:res})
            //如果参数在url中，如果后续如果文件是别的url，不美观
            Utils.addQuery('file',file);
        })
    }

    /**
     * render
     */
    public render() {
        return (
            <Layout.Header>
                <Row justify="space-around" align="middle" style={{height:"100%"}}>
                    {/* <Col span={8}>输入需要载入的文件：</Col> */}
                    <Col span={16}>
                    <Input.Search 
                        size="middle" 
                        className="header-searach"  
                        defaultValue="" 
                        suffix={<span>.json</span>} 
                        onSearch={(value, event)=>this.seach(value)} />
                    </Col>
                </Row>

                {/* <Row>
                    <Col span={8}>
                        <Input.Search size="middle" className="header-searach"  defaultValue="" suffix={<span>.json</span>} onSearch={(value, event)=>this.seach(value)} />
                    </Col>
                    <Col offset={1}   span={15}>
                        {this.files()}
                    </Col>
                </Row> */}
            </Layout.Header>
        )
    }
}

export default withRouter(Header);