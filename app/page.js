import React from "react";
import AnimationBook from "@/components/homeComponents/AnimationBook/AnimationBook";
import Search from "@/components/homeComponents/Search";
import { createClient } from "@supabase/supabase-js";
import CounterCard from "@/components/homeComponents/CounterCard";
export default async function Home() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUBABASE_URL,
    process.env.NEXT_PUBLIC_SUBABASE_ANON_KEY
  );
  const { count, error } = await supabase
    .from("Courses")
    .select("*", { count: "exact", head: true });
  if (error) {
    console.error(error);
  }
  const { data, error: error2 } = await supabase.from("Links").select("add_by");

  let countAdd;

  if (error2) {
    console.error("Error fetching data:", error2.message);
  } else if (data && Array.isArray(data)) {
    const uniqueAddByNames = new Set(data.map((item) => item.add_by));
    countAdd = uniqueAddByNames.size;
  } else {
    console.log("No data returned.");
    countAdd = 0;
  }

  return (
    <div className="w-screen h-screen bg-gray-100  justify-center flex items-center flex-col text-black">
      <header className="flex  justify-center flex-col w-full items-center h-fit">
        <AnimationBook />
        <h1 className="text-3xl mt-2 ">مكتبة العطاء</h1>
        <h2 className="text-lg text-zinc-950 text-opacity-70">
          جميع مصادرك الجامعية في مكان واحد
        </h2>
      </header>
      <main className="w-full flex flex-col items-center mt-4">
        <Search />
        <div className="max-w-[500px]">
          <CounterCard data={count} countAddBy={countAdd} />
        </div>
        <div className="flex flex-col items-center mt-5">
          <h2 className="text-lg text-center text-opacity-85">
            ساهم بإضافة محتوى واجعله صدقة جارية في ميزان حسناتك
          </h2>
          <button className="bg-[#6A64F1] text-center font-bold text-slate-50 py-1.5 px-7 mt-1.5 rounded-lg">
            إضافة محتوى
          </button>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}
