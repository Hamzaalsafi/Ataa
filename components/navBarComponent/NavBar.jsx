import Link from "next/link";
import React from "react";

export default function NavBar() {
  return (
    <div className="w-screen h-fit px-2 z-50 shadow-md bg-gray-300  py-1.5 absolute top-0 ">
      <ul className="flex items-center justify-center gap-3">
        <li>
          <Link href={"/subject"}>قائمة المواد</Link>
        </li>
        <li className="bg-[#6A64F1] text-white px-3 py-1 rounded-md font-bold">
          {/* <Link href={"/addSubject"}>إضافة محتوى</Link> */}
        </li>
      </ul>
    </div>
  );
}
