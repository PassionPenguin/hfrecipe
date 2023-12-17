import Loading, { LoadingSkeletonType } from "@/components/loading";
import { MSGraphClient } from "@/lib/ms-graph/client";
import { Suspense } from "react";

async function ExtendedImage({
    src,
    alt,
    className
}: {
    src: string;
    alt: string;
    className: string;
}) {
    if (src.startsWith("https://msgraph.hoarfroster.space/")) {
        if (typeof window !== "undefined") {
            let headers = new Headers();
            headers.append(
                "GraphPath",
                src.replace("https://msgraph.hoarfroster.space/", "/")
            );
            return fetch("/api/graph/download", { headers: headers }).then(
                async (res) => {
                    if (res.ok) {
                        const result_1 = await res.json();
                        if (result_1["@odata.context"] !== undefined) {
                            return (
                                <img
                                    src={
                                        result_1["@microsoft.graph.downloadUrl"]
                                    }
                                    alt={alt}
                                    className={className}
                                />
                            );
                        } else {
                            return <></>;
                        }
                    }
                }
            );
        }
        return MSGraphClient.driveProvider
            .getDriveItemURL(
                src.replace("https://msgraph.hoarfroster.space/", "/")
            )
            .then((result) => {
                if (result !== null) {
                    return <img src={result} alt={alt} className={className} />;
                } else {
                    return <></>;
                }
            });
    } else return <img src={src} alt={alt} />;
}

export default function LazyExtendedImage(props: {
    src: string;
    alt: string;
    className: string;
}) {
    return (
        <Suspense fallback={<Loading type={LoadingSkeletonType.image} />}>
            <ExtendedImage
                src={props.src}
                alt={props.alt}
                className={props.className}
            />
        </Suspense>
    );
}
