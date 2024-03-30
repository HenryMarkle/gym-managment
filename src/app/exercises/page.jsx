"use client";

import React, { useEffect, useState } from "react";
import "./exercise.css";
import Link from "next/link";

import { getExerciseSectionImageUrl } from "../../lib/images";
import { getAllSections } from "../api/v1/excercises";

function page() {
  /// exercise sections only.
  /// properties:
  ///   id
  ///   name
  ///   imageUrl
  const [exerciseSections, setExerciseSections] = useState([]);

  useEffect(() => {
    getAllSections().then((res) => {
      if (res !== "error") {
        let promises = res.map((s) =>
          getExerciseSectionImageUrl(s.id).then((url) => (s.imageUrl = url))
        );
        Promise.all(promises);
        setExerciseSections(res);
        console.log(res);
      }
    });
  }, []);
  ///
  ///

  const dammydata = [
    {
      id: 1,
      title: "Biceps",
      img: "https://fitnessvolt.com/wp-content/uploads/2022/07/Wider-Biceps.jpg",
      exercieseRelated: 45,
    },
    {
      id: 2,
      title: "Triceps",
      img: "https://fitnessvolt.com/wp-content/uploads/2022/07/Wider-Biceps.jpg",
      exercieseRelated: 23,
    },
    {
      id: 3,
      title: "Legs",
      img: "https://fitnessvolt.com/wp-content/uploads/2022/07/Wider-Biceps.jpg",
      exercieseRelated: 12,
    },
    {
      id: 4,
      title: "Chest",
      img: "https://fitnessvolt.com/wp-content/uploads/2022/07/Wider-Biceps.jpg",
      exercieseRelated: 83,
    },
  ];
  return (
    <>
      <div className="exercises p-[50px]">
        <p className=" font-extrabold text-5xl text-website2">Exercises</p>
        <div className="exerciese-container  gap-10">
          {dammydata.map((ele, index) => {
            return (
              <React.Fragment key={index}>
                <Link href={`/exercise/${ele.id}`}>
                  <div
                    style={{ backgroundImage: `url(${ele.img})` }}
                    className="exercise relative mt-20 h-[400px] shadow-2xl rounded-md bg-repeat-round flex items-center justify-center flex-col cursor-pointer"
                  >
                    <p className="exercise-title font-bold text-[30px] text-white z-50 w-full text-center ">
                      {ele.title}
                    </p>{" "}
                    <p className=" font-bold text-[20px] mt-3 text-website2  z-50 w-full text-center ">
                      +{ele.exercieseRelated} Exercises
                    </p>
                  </div>
                </Link>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default page;
