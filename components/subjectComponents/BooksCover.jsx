import React from "react";
import "./style.css";
import Image from "next/image";
export default function BooksCover({ link, label, category }) {
  const style = ["after:bg-purple-800", "bg-purple-900"];
  switch (category) {
    case "كتب":
      style[0] = "after:bg-red-800";
      style[1] = "bg-red-900";
      break;
    case "سلايدات":
      style[0] = "after:bg-orange-700";
      style[1] = "bg-orange-800";
      break;
    case "مصادر طلابية":
      style[0] = "after:bg-blue-800";
      style[1] = "bg-blue-900";
      break;
    case "سنوات":
      style[0] = "after:bg-green-800";
      style[1] = "bg-green-900";
      break;
    default:
      style[0] = "after:bg-zinc-800";
      style[1] = "bg-zinc-900";
  }
  return (
    <a className="book-container" href={link} target="_blank">
      {category === "فيديو" ? (
        <div>
          <Image
            src="/subjects/video.svg"
            alt="Book cover"
            width={150}
            height={200}
            className=" w-full h-full px-3 max-w-[25vw]"
          />
          <h2 dir="rtl" className="  text-md text-center">
            {label}
          </h2>
        </div>
      ) : (
        <div className={`book ${style[0]}  after:shadow-xl text-white `}>
          <div
            className={`ff ${style[1]} flex flex-col  justify-center overflow-hidden flex-wrap items-center`}
          >
            <h2 dir="rtl" className="  text-md text-center">
              {label}
            </h2>
          </div>
        </div>
      )}
    </a>
  );
}
