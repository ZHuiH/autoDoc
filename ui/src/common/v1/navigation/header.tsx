import React from 'react';
import {Layout,Input,Menu,Row,Col,Select} from "antd";
import {headerProps,headerState} from './define';
import {Link} from "react-router-dom";

class Header extends React.Component<headerProps,headerState>{
    constructor(props:headerProps){
        super(props);
        this.state={
            current:"0",
            protocol:"http://"
        };
    }

    /**
     * 顶部导航元素
     */
    public render(){
        let item=this.props.item?.map((val,index)=>{
            return <Menu.Item key={index}><Link to={`/method`}>{val}</Link></Menu.Item>
        });
        return (
            <Layout.Header>
                <Row>
                    <Col span={12} style={{paddingRight:'10px'}}>
                        <Input.Search 
                        addonBefore={this.selectBefore()} 
                        suffix=".json"
                        style={{verticalAlign:"middle"}} 
                        placeholder="输入需要加载的文档json" 
                        onSearch={this.search}
                        enterButton/>
                    </Col>

                    <Col span={10} style={{paddingLeft:'10px'}}>
                        <Menu 
                            theme="dark" 
                            mode="horizontal" 
                            selectedKeys={[this.state.current]}
                            onClick={this.headerClick}>{item}</Menu>
                    </Col>
                </Row>
                
            </Layout.Header>
        );
    }

    private selectBefore=():JSX.Element=>{
        let func=(value:string):void=>{
            this.setState({
                protocol:value
            })
        }
        return (
            <Select defaultValue="http://" onSelect={func} >
                <Select.Option value="http://">http://</Select.Option>
                <Select.Option value="https://">https://</Select.Option>
            </Select>
        );
    }

    /**
     * 顶部导航点击事件
     */
    private headerClick=(res:any):void=>{
        this.setState({
            current: res.key,
        });

        if(this.props.activePage){
            this.props.activePage(res.key);
        }
    }
    /**
     * 搜索
     */
    private search=(value:string):void=>{
        if(this.props.search){
            this.props.search(value+'.json');
        }
    }
}

export default Header;