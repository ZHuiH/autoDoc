import React from "react"

import { Empty, Table } from "antd"

export default class Param extends React.Component<paramProps>{
    constructor(props: paramProps) {
        super(props)
    }

    //随机给key
    private random = () => (Math.random() * (Math.random() * 100)).toString().slice(0, 6);

    //为树状结构的数据添加key以及删除空的children
    private handle() {
        this.props.data.map((item) => {
            item.key = this.random();
            let next: paramUnit | undefined = item;
            let index = 0;
            let queue: Array<paramUnit> = []
            while (next) {
                //没有子数据就删掉children
                if (next.children && next.children.length < 1) {
                    delete next.children;
                }
                if (next.children && next.children[index]) {
                    //添加key以及推进队列，下标进一
                    next.children[index].key = this.random();
                    queue.push(next.children[index])
                    index++;
                } else {
                    //坐标下移，重置下标
                    next = queue.shift()
                    index = 0;
                }
            }
        })
    }

    private layout(): JSX.Element {
        let Column = Table.Column;
        return (
            <div>
                <Table dataSource={this.props.data} pagination={false} bordered>
                    <Column title="名称" dataIndex="name" />
                    <Column title="类型" dataIndex="type" />
                    <Column title="必传" dataIndex="required" render={required => {
                        return required ? <a>是</a> : <span>否</span>
                    }} />
                    <Column title="默认值" dataIndex="default" render={val => {
                        let value = typeof val == 'object' ? JSON.stringify(val) : val;
                        return <span>{value}</span>
                    }} />
                    <Column title="描述" dataIndex="description" />
                </Table>
            </div>
        );
    }

    /**
     * render
     */
    public render() {
        if (this.props.data.length <= 0) {
            return <Empty description="不需要请求数据" />
        }
        this.handle();
        return this.layout()
    }
}