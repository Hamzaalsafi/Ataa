import { createClient } from "@supabase/supabase-js";
import DontionCount from "@/components/subjectComponents/DontionCount";
import AddSubjectForm from "@/components/subjectComponents/AddSubjectForm";

export const revalidate = 60; // Optional for ISR

export default async function Page() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUBABASE_URL,
    process.env.NEXT_PUBLIC_SUBABASE_ANON_KEY
  );

  const { data, error } = await supabase.rpc("get_link_count");

  if (error) {
    console.error("Error fetching link count:", error.message);
    return (
      <div className="w-screen px-2 flex-col overflow-x-hidden gap-6 pt-16 flex items-center bg-gray-100">
        <p>Error fetching data. Please try again later.</p>
        <AddSubjectForm />
      </div>
    );
  }

  return (
    <div className="w-screen px-2 flex-col overflow-x-hidden gap-6 pt-16 flex items-center bg-gray-100">
      <DontionCount data={data} />
      <AddSubjectForm />
    </div>
  );
}
