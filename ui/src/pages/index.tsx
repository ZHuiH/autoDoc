import React from "react";
import { Empty, Collapse, Tabs } from "antd";
import { Unsubscribe } from "redux";
import { store } from "../store/index"
import Param from "./info/param"
import Mock from "./info/mock"
import Response from "./info/response"
import Header from "./info/header"
import Description from "./info/description"

export default class Index extends React.Component<any, homeState>{
    constructor(props: any) {
        super(props);
        let data = this.getData()
        this.state = {
            view: 'none',
            ...data,
            cancel: this.initData()
        };
    }

    private getData() {
        let goups = store.getState().currentGroup ?? { apis: [], group: "" }
        let fileInfo = store.getState().current
        return {
            apis: goups.apis,
            group: goups.group,
            version: fileInfo.version ?? "",
            title: fileInfo.title ?? "",
        }
    }
    private initData(): Unsubscribe {
        return store.subscribe(() => {
            let data = this.getData()
            this.setState({ ...data })
        })
    }
    public componentWillUnmount() {
        this.state.cancel()
    }
    //折叠面板里面的内容
    private body(body: ApiInfo): JSX.Element {
        let { TabPane } = Tabs;
        return (
            <Tabs>
                <TabPane tab="接口描述" key="1">
                    <Description content={body.description ?? ""} auth={body.auth ?? []} version={body.version} author={body.author} />
                </TabPane>
                <TabPane tab="请求参数" key="2">
                    <Param data={body.param ?? []}></Param>
                </TabPane>
                <TabPane tab="返回参数" key="3">
                    <Response data={body.response ?? []} />
                </TabPane>
                {/* <TabPane tab="模拟请求" key="4">
                    <Mock params={body.param ?? []} path={body.path} method={body.method} />
                </TabPane> */}
            </Tabs>
        );
    }
    //遍历apis
    private apis(): JSX.Element {
        let Panel = Collapse.Panel;
        let item = this.state.apis.map((item, index) => {
            return (
                <Panel
                    header={<Header method={item.method} path={item.path} />}
                    key={`apis-${index}`}>
                    {this.body(item)}
                </Panel>
            );
        })
        return <Collapse expandIconPosition="right" accordion>{item}</Collapse>
    }

    private invoke(): JSX.Element {
        if (this.state.apis.length <= 0) {
            return <Empty description="暂无数据" />
        }
        return this.apis()
    }

    /**
     * render
     */
    public render(): JSX.Element {
        return (
            <div className="content-main">
                {this.invoke()}
            </div>
        );
    }
}

