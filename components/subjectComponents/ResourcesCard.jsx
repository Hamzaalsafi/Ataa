import React from "react";
import BooksCover from "./BooksCover";
export default function ResourcesCard({ add_by, label, link, category }) {
  return (
    <div className="w-fit-h-fit flex flex-col  ResourcesShadow  p-4 pb-3 px-1 items-center">
      <BooksCover link={link} label={label} category={category} />
      <h3 className="opacity-70 mt-2 w-[90%] text-center" dir="rtl">
        تمت اضافتها من قبل: {add_by}
      </h3>
    </div>
  );
}
