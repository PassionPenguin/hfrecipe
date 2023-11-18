import { Suspense } from "react";
import { MSGraphClient } from "@/lib/ms-graph/client";

async function ExtendedImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) {
  if (src.startsWith("msgraph://")) {
    // Assuming MSGraphClient.getFileDownloadURL returns a promise
    return MSGraphClient.driveProvider
      .getDriveItemURL(src.replace("msgraph://", "/hfsitedata/rcphf/"))
      .then((result) => <img src={result} alt={alt} className={className} />);
  } else return <>Incorrect path.</>;
}

export default function LazyExtendedImage(props: {
  src: string;
  alt: string;
  className: string;
}) {
  return (
    <Suspense fallback={<>Loading...</>}>
      <ExtendedImage
        src={props.src}
        alt={props.alt}
        className={props.className}
      />
    </Suspense>
  );
}
