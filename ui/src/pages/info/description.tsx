import React from "react"
import { Divider, Descriptions } from "antd"


export default class Description extends React.Component<descriptionProps>{

    private setKey = () => Math.random().toString()

    private layout(): JSX.Element {
        let auth: Array<JSX.Element> = []
        if (this.props.auth && this.props.auth.length > 0) {
            this.props.auth.map((item, index) => {
                auth.push(
                    <Descriptions.Item label='来源' key={`auth-source-${index}`}>
                        {item.source}
                    </Descriptions.Item>,
                    <Descriptions.Item label='名称' key={`auth-name-${index}`}>
                        {item.name}
                    </Descriptions.Item>,
                    <Descriptions.Item label='默认值' key={`auth-defalut-${index}`}>
                        {item.defalut}
                    </Descriptions.Item>,
                )
            })
            auth = [<Divider plain key={this.setKey()}>Auth</Divider>, <Descriptions key={this.setKey()}>{...auth}</Descriptions>]
        }

        return (
            <div>
                {auth}
            </div>
        );
    }
    /**
     * render
     */
    public render() {
        return (
            <div>
                <p>{this.props.content}</p>
                <Descriptions title="接口信息" column={2} key={this.setKey()}>
                    <Descriptions.Item label='作者'>{this.props.author ?? "-"}</Descriptions.Item>
                    <Descriptions.Item label='版本'>{this.props.version ?? "1.0"}</Descriptions.Item>
                </Descriptions>
                {this.layout()}
            </div>
        );
    }
}