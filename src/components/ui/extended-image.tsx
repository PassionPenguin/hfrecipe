import Loading, {LoadingSkeletonType} from "@/components/loading";
import {MSGraphClient} from "@/lib/ms-graph/client";
import {Suspense} from "react";

async function ExtendedImage({
                                 src,
                                 alt,
                                 className
                             }: {
    src: string;
    alt: string;
    className: string;
}) {
    console.log(src.startsWith("msgraph://"), src, alt, className);
    if (src.startsWith("https://msgraph.hoarfroster.space/")) {
        return MSGraphClient.driveProvider
            .getDriveItemURL(src.replace("https://msgraph.hoarfroster.space/", "/"))
            .then((result) => {
                if (result !== null) {
                    return <img src={result} alt={alt} className={className}/>;
                } else {
                    return <></>;
                }
            });
    } else return <>Incorrect path.</>;
}

export default function LazyExtendedImage(props: {
    src: string;
    alt: string;
    className: string;
}) {
    return (
        <Suspense fallback={<Loading type={LoadingSkeletonType.image}/>}>
            <ExtendedImage
                src={props.src}
                alt={props.alt}
                className={props.className}
            />
        </Suspense>
    );
}
