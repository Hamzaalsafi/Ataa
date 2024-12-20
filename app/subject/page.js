import SpecializeButton from "@/components/subjectComponents/SpecializeButton";
import React from "react";

export default function page() {
  return (
    <div className="w-screen h-screen overflow-x-hidden  flex-col flex  justify-center items-center pt-14  bg-gray-100">
      <div className="max-w-[1000px] h-full w-screen   flex-col items-center  ">
        <h1 className="text-3xl text-center">مكتبة العطاء</h1>

        <h1 className="text-center text-xl mt-8">الكليات</h1>
        <div className="flex flex-col w-full   rounded-sm  h-fit items-center mt-8">
          <SpecializeButton />
          <hr className="w-full border-opacity-75 z-10  my-[-1.65px] border-t-2 border-black" />
          <div className="flex py-10 flex-col w-full h-fit min-h-[50vh]  border-b-2 rounded-sm bg-white border-l-2 border-r-2 border-black border-opacity-75 items-center ">
            {/* <HandleResources
              Slides={Slides}
              years={years}
              books={books}
              videos={videos}
              resources={resources}
            /> */}
          </div>
        </div>
        <div className="flex flex-col w-full   rounded-sm  h-fit items-center mt-8"></div>
      </div>
    </div>
  );
}
