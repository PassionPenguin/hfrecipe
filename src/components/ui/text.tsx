import {ReactNode} from "react";

export enum UITextType {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p
}

export default function UIText(props: {type: UITextType, source: ReactNode}) {
    switch (props.type) {
        case UITextType.p:
            return <p>{props.source}</p>
        case UITextType.h1:
            return <h1 className="font-bold text-5xl">{props.source}</h1>
        case UITextType.h2:
            return <h2 className="font-bold text-4xl">{props.source}</h2>
        case UITextType.h3:
            return <h3 className="font-bold text-3xl">{props.source}</h3>
        case UITextType.h4:
            return <h4 className="font-bold text-2xl">{props.source}</h4>
        case UITextType.h5:
            return <h5 className="font-bold text-xl">{props.source}</h5>
        case UITextType.h6:
            return <h6 className="font-bold text-lg">{props.source}</h6>

    }
}