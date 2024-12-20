"use client";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import ResourcesCard from "./ResourcesCard";

export default function HandleResources({
  Slides,
  books,
  years,
  videos,
  resources,
}) {
  const activeCategory = useAppSelector((state) => state.activeCategory.value);
  let value = books;
  switch (activeCategory) {
    case "books":
      value = books;
      break;
    case "video":
      value = videos;
      break;
    case "slides":
      value = Slides;
      break;
    case "years":
      value = years;
      break;
    case "studentResources":
      value = resources;
      break;
    default:
  }
  return (
    <div className="flex flex-col items-center gap-5">
      {value.map((item, index) => (
        <ResourcesCard
          key={index}
          add_by={item.add_by}
          label={item.label}
          link={item.link}
          category={item.category}
        />
      ))}
    </div>
  );
}
