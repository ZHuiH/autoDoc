import React from "react"
import { PageHeader, Descriptions } from 'antd';
import { store } from '../store';

export default class Info extends React.Component {
    render() {
        let data = store.getState()
        return (
            <div className="file-info">
                <PageHeader backIcon={false} title="文档信息" />
                <Descriptions column={2}>
                    <Descriptions.Item label="文档版本">{data.current.version}</Descriptions.Item>
                    <Descriptions.Item label="baseHost">{data.current.globalTags.baseHost ?? 'localhost'}</Descriptions.Item>
                </Descriptions>
            </div>
        )
    }
}