import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Layout, Menu as AntdMenu, Empty } from 'antd';
import { ReadOutlined } from '@ant-design/icons';
import { store } from "../store/index"
import { StoreActive } from "../store/action"
import Utils from "../utils/utils"



class Menu extends React.Component<RouteComponentProps, MenuState>{
    private itemName = "menu-item-";
    constructor(props: RouteComponentProps) {
        super(props);

        this.state = {
            view: 'none',
            title: "",
            version: "",
            content: [],
            globalTags: {}
            // index:0
        }
        store.subscribe(() => {
            let data = store.getState()
            this.setState({ ...data.current })
            if (this.state.view === 'none') {
                this.componentDidMount()
            }
        })
    }

    /**
     * menu
     */
    private menu(): JSX.Element {
        if (this.state.content.length < 1) {
            return <Empty description="空菜单" />
        }
        let item = this.state.content.map((item, index) => {
            return (
                <AntdMenu.Item key={`menu-${index}`} id={`${this.itemName}${index}`} >
                    {item.group}
                </AntdMenu.Item>
            )
        })
        return (
            <AntdMenu onSelect={({ key }) => this.click(key as string)} theme="dark">
                <AntdMenu.Item key={`menu-info`} id={`${this.itemName}info`}>文档信息</AntdMenu.Item>
                <AntdMenu.Item key={`menu-code`} id={`${this.itemName}code`}>代码查询</AntdMenu.Item>
                {item}
            </AntdMenu>
        );
    }

    private click(key: string) {
        let str = key.split('-')[1];
        let index: number | string = Number(str)

        let view: viewType = 'api';
        let path = '/'
        let currentGroup: FileDataContent | undefined = this.state.content[index] ?? undefined
        if (isNaN(index)) {
            view = str as viewType;
            index = str;
            currentGroup = undefined
            path += str
        }
        Utils.addQuery('menu', index);
        StoreActive.set({
            currentGroup: currentGroup,
            view: view,
        })
        this.props.history.push(`${path}${Utils.getQueryStr()}`)
        //this.setState({ index: Number(index) })
    }

    public componentDidMount() {
        let index = Utils.getQuery('menu')
        if (this.state.content.length > 0 && index) {
            let menuItem = document.querySelector(`#${this.itemName}${index}`) as HTMLDivElement | null
            menuItem?.click()
        }
    }

    /**
     * show
     */
    private show(): JSX.Element {
        return (
            <Layout.Sider>
                <div className="menu-placeholder" >
                    <ReadOutlined className="menu-logo" style={{ fontSize: '50px', color: '#fff' }} />
                </div>
                {this.menu()}
            </Layout.Sider>
        );
    }
    /**
     * render
     */
    public render() {
        return this.show()
    }
}

export default withRouter(Menu);