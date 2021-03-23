import React from 'react';
import { Tabs, Input } from 'antd';

export default class Mock extends React.Component<mockProps, mockState> {

    private querys: Array<string> = []
    constructor(props: mockProps) {
        super(props)
        this.urlParse()
        this.paramParse()
        this.state = {
            form: [],
            editType: '1',
            jsonData: "",
            response: {}
        }
    }
    render() {
        return (
            <div>
                <Tabs tabPosition='left' defaultActiveKey={this.state.editType}>
                    <Tabs.TabPane tab="填写参数" key='1'></Tabs.TabPane>
                    <Tabs.TabPane tab="编辑json" key='2'>
                        <Input.TextArea defaultValue={this.state.jsonData} rows={6} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="响应参数" key='3'><pre>{JSON.stringify(this.state.response)}</pre></Tabs.TabPane>
                </Tabs>
            </div>
        )
    }

    private urlParse() {
        let match = this.props.path.match(/\{.*\}/);
        if (match) {
            this.querys = match[0].split('/').map(item => item.slice(1, item.length - 1))
        }
    }

    private paramParse() {
        this.props.params.forEach(item => {
            if (item.default) {
                return
            }

        })
    }

    private toRequest() {

    }
}