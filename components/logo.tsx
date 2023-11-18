import Link from "next/link";
import Image from "next/image";

export default function Logo({ size }: { size: Size | undefined }) {
  const sizeAttr = size == undefined ? "" : `text-${size}`;

  return (
    <Link href="/" className="-m-1.5 p-1.5" aria-label="header-nav-brand">
      <Image src="/images/logo.png" alt="LOGO" width={36} height={36} />
    </Link>
  );
}
