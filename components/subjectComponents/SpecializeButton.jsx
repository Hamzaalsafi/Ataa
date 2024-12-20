"use client";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateSpecializeCategory } from "../../store/slices/specializeCategorySlice";
import { motion } from "framer-motion";

export default function SpecializeButton() {
  const dispatch = useAppDispatch();
  const specializeCategory = useAppSelector(
    (state) => state.specializeCategory.value
  );
  const spanValues = [
    "الحجاوي للهندسة",
    "العلوم",
    "جامعة اجباري ",
    "جامعة اختياري",
  ];
  // const CounterValues = [
  //   booksCounter,
  //   videosCounter,
  //   SlidesCounter,
  //   yearsCounter,
  //   resourcesCounter,
  // ];
  return (
    <div className="flex px-1  md:px-5 w-full justify-between">
      {["الحجاوي للهندسة", "العلوم", "جامعة اجباري ", "جامعة اختياري"].map(
        (element, index) => (
          <motion.button
            key={index}
            onClick={() => {
              dispatch(updateSpecializeCategory(element));
            }}
            className={`${
              specializeCategory === element
                ? "bg-white  border-b-4  z-20 border-b-white border-b-opacity-100 "
                : "bg-zinc-200 hover:bg-zinc-400  border-b-2 border-b-black "
            } px-1 md:px-5 py-1 md:flex md:gap-1  md:py-2.5 border-l-2 border-r-2 border-t-2 border-l-black border-t-black border-r-black border-opacity-75`}
            initial={{ scale: 0.95, opacity: 0.8 }}
            animate={{
              scale: specializeCategory === element ? 1 : 1,
              opacity: specializeCategory === element ? 1 : 0.8,
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.1 }}
          >
            <div>
              {/* ({CounterValues[index] > 9 ? "+9" : CounterValues[index]}) */}
            </div>{" "}
            {spanValues[index]}
          </motion.button>
        )
      )}
    </div>
  );
}
