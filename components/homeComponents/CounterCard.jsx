"use client";
import React from "react";
import { createClient } from "@supabase/supabase-js";
import "./style.css";
import Image from "next/image";
import CountUp from "react-countup";
import { motion } from "framer-motion";
export default function CounterCard({ data, countAddBy }) {
  return (
    <div className=" grid grid-cols-2 gap-8 lg:gap-16 mt-4 lg:mt-5">
      <motion.div
        className="flex cursor-pointer  flex-col items-center justify-start donationCountShadow bg-slate-50 lg:py-3 p-1 pt-2  lg:pt-3.5 lg:p-3 rounded-xl "
        whileHover={{
          scale: 1.05,
          rotate: 2,
        }}
        whileTap={{
          scale: 0.95,
          rotate: -2,
        }}
        transition={{
          duration: 0.3,
          type: "spring",
          stiffness: 300,
        }}
      >
        <Image
          className="max-w-24 h-24"
          src="/homeImage/bookDionation.png"
          alt="كتب"
          width={400}
          height={300}
        />

        <p className="text-center  select-none pointer-events-none text-md  font-bold">
          <CountUp start={0} end={countAddBy} duration={1.9} />
        </p>
        <p className="select-none text-center  pointer-events-none text-md md:text-lg ">
          المساهمون
        </p>
      </motion.div>

      <motion.div
        className="flex cursor-pointer  flex-col items-center justify-start donationCountShadow bg-slate-100 lg:py-3 p-1 pt-2  lg:pt-3.5 lg:p-3  rounded-xl "
        whileHover={{
          scale: 1.05,
          rotate: 2,
        }}
        whileTap={{
          scale: 0.95,
          rotate: -2,
        }}
        transition={{
          duration: 0.3,
          type: "spring",
          stiffness: 300,
        }}
      >
        <Image
          className="w-full max-w-24 max-h-24"
          src="/homeImage/books.svg"
          alt="كتب"
          width={400}
          height={300}
        />

        <p className="text-center  select-none pointer-events-none text-md  font-bold">
          <CountUp start={0} end={data} duration={2.5} />
        </p>
        <p className="select-none text-center  pointer-events-none text-md md:text-lg ">
          المواد المغطاة
        </p>
      </motion.div>
    </div>
  );
}
