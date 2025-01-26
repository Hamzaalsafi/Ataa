// app/page.js (or any other page file in app directory)

import { createClient } from "@supabase/supabase-js";
import DontionCount from "@/components/subjectComponents/DontionCount";
import AddSubjectForm from "@/components/subjectComponents/AddSubjectForm";

export default async function Page() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const { data, error } = await supabase.rpc("get_link_count");
  if (error) {
    console.error(error);
  }

  return (
    <div className="w-screen px-2 flex-col overflow-x-hidden gap-6 pt-16 flex items-center bg-gray-100">
      <DontionCount data={data} />
      <AddSubjectForm />
    </div>
  );
}
