import Search from "@/components/homeComponents/Search";
import CategoryButton from "@/components/subjectComponents/CategoryButton";
import HandleResources from "@/components/subjectComponents/HandleResources";
import { createClient } from "@supabase/supabase-js";

export default async function Page({ params }) {
  // Await params
  const { code } = await params;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUBABASE_URL,
    process.env.NEXT_PUBLIC_SUBABASE_ANON_KEY
  );

  const { data, error } = await supabase
    .from("Courses")
    .select("*")
    .eq("course_code", code);

  const { data: links } = await supabase
    .from("Links")
    .select("*")
    .eq("course_code", code);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data || data.length === 0) {
    return <div>No courses found.</div>;
  }

  //   return (
  //     <div>
  //       <h1>Course Details</h1>
  //       {data.map((course) => (
  //         <div key={course.id}>
  //           <p>Course Code: {course.course_code}</p>
  //           <p>Course Name: {course.category}</p>
  //           <p>Description: {course.label}</p>
  //           <a href={course.link} target="_blank">
  //             aa
  //           </a>
  //         </div>
  //       ))}
  //     </div>
  //   );
  const booksCounter = links.filter((link) => link.category === "كتب").length;
  const videosCounter = links.filter(
    (link) => link.category === "فيديو"
  ).length;
  const resourcesCounter = links.filter(
    (link) => link.category === "مصادر طلابية" && link.label !== "سنوات"
  ).length;
  const yearsCounter =
    links.filter(
      (link) => link.category === "مصادر طلابية" && link.label === "سنوات"
    ).length + links.filter((link) => link.category === "سنوات").length;
  const SlidesCounter = links.filter(
    (link) => link.category === "سلايدات"
  ).length;
  const books = links.filter((link) => link.category === "كتب");
  const videos = links.filter((link) => link.category === "فيديو");
  const resources = links.filter(
    (link) => link.category === "مصادر طلابية" && link.label !== "سنوات"
  );
  const years = links.filter(
    (link) =>
      (link.category === "مصادر طلابية" && link.label === "سنوات") ||
      link.category === "سنوات"
  );
  const Slides = links.filter((link) => link.category === "سلايدات");

  return (
    <div className="w-screen h-screen overflow-x-hidden  flex-col flex  justify-center items-center pt-14  bg-gray-100">
      <div className="max-w-[1000px] h-full w-screen   flex-col items-center  ">
        <h1 className="text-3xl text-center">مكتبة العطاء</h1>
        <Search />
        <h1 className="text-center text-xl mt-8">
          {data[0].course_name} || {data[0].course_code}
        </h1>

        <div className="flex flex-col w-full   rounded-sm  h-fit items-center mt-8">
          <CategoryButton
            booksCounter={booksCounter}
            videosCounter={videosCounter}
            resourcesCounter={resourcesCounter}
            SlidesCounter={SlidesCounter}
            yearsCounter={yearsCounter}
          />
          <hr className="w-full border-opacity-75 z-10  my-[-1.65px] border-t-2 border-black" />
          <div className="flex py-10 flex-col w-full h-fit min-h-[50vh]  border-b-2 rounded-sm bg-white border-l-2 border-r-2 border-black border-opacity-75 items-center ">
            <HandleResources
              Slides={Slides}
              years={years}
              books={books}
              videos={videos}
              resources={resources}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
