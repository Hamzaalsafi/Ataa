"use client";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateCategory } from "../../store/slices/activeCategorySlice";
import { motion } from "framer-motion"; // Import motion

export default function CategoryButton({
  booksCounter,
  videosCounter,
  resourcesCounter,
  SlidesCounter,
  yearsCounter,
}) {
  const dispatch = useAppDispatch();
  const activeCategory = useAppSelector((state) => state.activeCategory.value);
  const spanValues = ["كتب", "فيديو", "سلايدات", "سنوات", "مصادر طلابية"];
  const CounterValues = [
    booksCounter,
    videosCounter,
    SlidesCounter,
    yearsCounter,
    resourcesCounter,
  ];
  return (
    <div className="flex px-1  md:px-5 w-full justify-between">
      {["books", "video", "slides", "years", "studentResources"].map(
        (element, index) => (
          <motion.button
            key={index}
            onClick={() => {
              dispatch(updateCategory(element));
            }}
            className={`${
              activeCategory === element
                ? "bg-white  border-b-4  z-40 border-b-white border-b-opacity-100 "
                : "bg-zinc-200 hover:bg-zinc-400  border-b-2 border-b-black "
            } px-1 md:px-5 py-1 md:flex md:gap-1  md:py-2.5 border-l-2 border-r-2 border-t-2 border-l-black border-t-black border-r-black border-opacity-75`}
            initial={{ scale: 0.95, opacity: 0.8 }}
            animate={{
              scale: activeCategory === element ? 1.05 : 1,
              opacity: activeCategory === element ? 1 : 0.8,
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.1 }}
          >
            <div>
              ({CounterValues[index] > 9 ? "+9" : CounterValues[index]})
            </div>{" "}
            {spanValues[index]}
          </motion.button>
        )
      )}
    </div>
  );
}
