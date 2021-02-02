import React from "react"
import {Tag} from "antd"

export type methodColor={
    get:string,
    put:string,
    delete:string,
    post:string,
    other:string,
}

type headerProrps={
    method:keyof methodColor,
    path:string
}

export class Header extends React.Component<headerProrps>{
    constructor(props:headerProrps){
        super(props)
    }
    private methodColo:methodColor={
        get:"#2db7f5",
        put:"purple",
        delete:"#f50",
        post:"#87d068",
        other:"default",
    };

    private getColor(method:keyof methodColor) {
        return this.methodColo[method]
                ? this.methodColo[method]
                : this.methodColo.other
    }

    /**
     * render
     */
    public render() {
        let method=this.props.method;
        let color=this.getColor(method);
        return(
            <div>
                <Tag color={color}>{method}</Tag>
                <span>{this.props.path}</span>
            </div>
        );
    }
}