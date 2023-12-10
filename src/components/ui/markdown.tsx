import ReactMarkdown from "react-markdown";
import LazyExtendedImage from "@/components/ui/extended-image";
import UIText, {UITextType} from "@/components/ui/text";

export default function MarkdownPreview(props: { source: string }) {
    return <ReactMarkdown
        className="markdown space-y-4 py-4"
        components={{
            img(props) {
                return (
                    <>
                        <LazyExtendedImage
                            src={props.src}
                            alt={props.alt}
                            className="mx-auto rounded-lg py-2 sm:max-w-[360px] md:max-w-[480px] lg:max-w-[600px]"
                        />
                        <span className="block text-center text-base text-gray-600 dark:text-gray-400">
                                    {props.alt}
                                </span>
                    </>
                );
            },
            h1(props) {
                return <UIText type={UITextType.h1} source={props.children} />
            },
            h2(props) {
                return <UIText type={UITextType.h2} source={props.children} />
            },
            h3(props) {
                return <UIText type={UITextType.h3} source={props.children} />
            },
            h4(props) {
                return <UIText type={UITextType.h4} source={props.children} />
            },
            h5(props) {
                return <UIText type={UITextType.h5} source={props.children} />
            },
            h6(props) {
                return <UIText type={UITextType.h6} source={props.children} />
            },
            p(props) {
                return <UIText type={UITextType.p} source={props.children} />
            }
        }}
    >
        {props.source}
    </ReactMarkdown>;
}