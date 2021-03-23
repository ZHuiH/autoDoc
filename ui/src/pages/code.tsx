import React from 'react'
import { store } from "../store/index"
import { Empty, Table } from "antd"

export default class Code extends React.Component<{}, codeState>{
    constructor(props: any) {
        super(props)
        this.state = {
            data: this.getData(),
            cancel: this.cancel()
        }
    }

    private cancel() {
        return store.subscribe(() => this.setState({ data: this.getData() }))
    }

    public componentWillUnmount() {
        this.state.cancel()
    }

    private getData(): Array<any> {
        let data = store.getState().current.globalTags.code ?? []
        return data.map((item: any, index: number) => {
            item['key'] = `code-${index}`
            return item
        })
    }

    render() {
        if (this.state.data.length <= 0) {
            return <Empty />
        }
        return (
            <div className="api-code">
                <Table dataSource={this.state.data}>
                    <Table.Column title="代码" dataIndex="code" align="center"></Table.Column>
                    <Table.Column title="说明" dataIndex="description"></Table.Column>
                </Table>
            </div>
        );
    }
}