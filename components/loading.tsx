import Link from "next/link";
import Image from "next/image";

export default function Loading(size: Size | undefined) {
  const sizeAttr = size == undefined ? "" : `text-${size}`;

  return <div className="bg-gray-200 dark:bg-gray-800">Loading...</div>;
}
