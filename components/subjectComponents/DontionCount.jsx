import "./style.css";
export default function DontionCount({ data }) {
  return (
    <div className="max-w-[900px]  ResourcesShadow flex justify-center  rounded-md h-fit w-screen py-2 px-1.5   flex-col  items-center  ">
      <h1 className="text-center text  text-2xl">أعلى المساهمين</h1>
      <h3 className="my-1  text-sm opacity-85 " dir="rtl">
        جزاكم الله خيرا ,أنتم السبب في بناء هذا الموقع❤️
      </h3>
      <div className="w-full mt-1">
        <table className="container overflow-x-hidden">
          <thead>
            <tr>
              <th>
                <h1>الاسم</h1>
              </th>
              <th>
                <h1>الترتيب</h1>
              </th>
              <th>
                <h1>مرات المساهمة</h1>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.add_by}</td>
                <td>{index + 1}</td>
                <td>{item.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
