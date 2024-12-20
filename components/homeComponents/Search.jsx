"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateValue } from "../../store/slices/searchInputSlice";

export default function Search() {
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector((state) => state.searchInput.value);
  const [isInputInvalid, setIsInputInvalid] = useState(false);

  const handleClick = (e) => {
    if (!searchValue.trim()) {
      setIsInputInvalid(true);
      e.preventDefault();
    } else {
      setIsInputInvalid(false);
    }
  };

  return (
    <div className="w-full">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex w-full justify-center my-3"
      >
        <input
          type="text"
          required
          value={searchValue}
          onChange={(e) => {
            dispatch(updateValue(e.target.value.toUpperCase()));
            if (isInputInvalid) setIsInputInvalid(false);
          }}
          className={`w-[75%] font-medium lg:w-[40%] text-md shadow-lg lg:pl-8 text-center p-1.5 bg-white border-2 ${
            isInputInvalid ? "border-red-600 shadow-2xl" : "border-black"
          } focus:border-opacity-100 placeholder:text-black placeholder:text-opacity-55`}
          placeholder="(MATH 101) ابحث عن رمز المادة مثال"
        />
        <Link
          href={
            searchValue.trim().replaceAll(" ", "").toUpperCase()
              ? `/subject/${searchValue
                  .trim()
                  .replaceAll(" ", "")
                  .toUpperCase()}`
              : "#"
          }
          passHref
          className="p-1 px-6 hover:bg-zinc-400 bg-zinc-200 flex items-center"
          onClick={handleClick}
        >
          <Image
            className="w-full h-auto"
            src="/homeImage/searchIcon.svg"
            alt="Search"
            width={400}
            height={300}
          />
        </Link>
      </form>
    </div>
  );
}
