"use client";
import React from "react";
import "./style.css";
export default function AnimationBook() {
  return (
    <div className="book">
      <span className="page turn"></span>
      <span className="page turn"></span>
      <span className="page turn"></span>
      <span className="page turn"></span>
      <span className="page turn"></span>
      <span className="page turn"></span>
      <span className="cover bg-purple-700"></span>
      <span className="page"></span>
      <span className="cover turn bg-purple-700"></span>
    </div>
  );
}
