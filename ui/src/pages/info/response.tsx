import React from "react"
import Param from "./param"
import { Empty, PageHeader } from "antd"

export default class Response extends React.Component<responseProps>{
    constructor(props: responseProps) {
        super(props)
    }

    private layout(): JSX.Element {
        let item = this.props.data.map((item, index) => {
            return (
                <div key={`response-${index}`}>
                    <PageHeader title={`http状态码:${item.code}`} subTitle={item.description} />
                    <Param data={item.param ?? []} />
                </div>
            );
        })
        return (
            <div>
                {item}
            </div>
        );
    }

    /**
     * render
     */
    public render() {
        if (this.props.data.length < 1) {
            return <Empty description="没有返回数据" />
        }
        return this.layout()
    }
}