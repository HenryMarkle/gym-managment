"use client";
import React, { useEffect, useState } from "react";
import { BsArrowDownCircleFill, BsArrowUpCircleFill } from "react-icons/bs";
import { useParams } from "next/navigation";

import { getAllExcercisesOfSection } from "../../api/v1/excercises";
import { getExerciseSectionImageUrl, getExerciseVideoUrl } from "../../../lib/images";

function page() {
  const [openArray, setOpenArray] = useState([1]);

  const handleOpenArray = (id) => {
    if (openArray.includes(id)) {
      setOpenArray((prevArray) => prevArray.filter((ele) => ele !== id));
    } else {
      setOpenArray((prevArray) => [...prevArray, id]);
    }
  };

  ///
  ///
  const sectionName = useParams();
  
  const [sectionImageUrl, setSectionImageUrl] = useState('')

  /*
    id: number;
    name: string;
    description: string;
    categoryId: number;
    videoUrl: string
  */
  const [exerciseUrl, setExericeUrl] = useState('');

  useEffect(() => {
    getAllExcercisesOfSection(sectionName).then(res => {
      if (res !== 'error') {
        // section image
        getExerciseSectionImageUrl(sectionName).then(setSectionImageUrl);

        // exercise videos
        let promises = res.map(e => getExerciseVideoUrl(e.id).then(url => e.videoUrl = url))
        Promise.all(promises);
        setExericeUrl(res);

        console.log(`Exercise URL: ${exerciseUrl}`);
        console.log(`Section URL: ${sectionImageUrl}`);
      }
    })
  }, [])
  ///
  ///

  const dummyData = [
    {
      id: 1,
      title: "exercise name",
      desc: `  Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Itaque eveniet quia praesentium quaerat deserunt et
    inventore cum porro ex, repellat eum, aliquid, omnis
    corrupti optio numquam quisquam ut magnam doloremque? Lorem
    ipsum dolor sit amet consectetur adipisicing elit. Itaque
    eveniet quia praesentium quaerat deserunt et inventore cum
    porro ex, repe Lorem ipsum`,
    },
    {
      id: 2,
      title: "exercise name",
      desc: `  Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Itaque eveniet quia praesentium quaerat deserunt et
    inventore cum porro ex, repellat eum, aliquid, omnis
    corrupti optio numquam quisquam ut magnam doloremque? Lorem
    ipsum dolor sit amet consectetur adipisicing elit. Itaque
    eveniet quia praesentium quaerat deserunt et inventore cum
    porro ex, repe Lorem ipsum`,
    },
    {
      id: 3,
      title: "exercise name",
      desc: `  Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Itaque eveniet quia praesentium quaerat deserunt et
    inventore cum porro ex, repellat eum, aliquid, omnis
    corrupti optio numquam quisquam ut magnam doloremque? Lorem
    ipsum dolor sit amet consectetur adipisicing elit. Itaque
    eveniet quia praesentium quaerat deserunt et inventore cum
    porro ex, repe Lorem ipsum`,
    },
    {
      id: 4,
      title: "exercise name",
      desc: `  Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Itaque eveniet quia praesentium quaerat deserunt et
      inventore cum porro ex, repellat eum, aliquid, omnis
      corrupti optio numquam quisquam ut magnam doloremque? Lorem
      ipsum dolor sit amet consectetur adipisicing elit. Itaque
      eveniet quia praesentium quaerat deserunt et inventore cum
      porro ex, repe Lorem ipsum Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Itaque eveniet quia praesentium quaerat deserunt et
      inventore cum porro ex, repellat eum, aliquid, omnis
      corrupti optio numquam quisquam ut magnam doloremque? Lorem
      ipsum dolor sit amet consectetur adipisicing elit. Itaque
      eveniet quia praesentium quaerat deserunt et inventore cum
      porro ex, repe Lorem ipsum Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Itaque eveniet quia praesentium quaerat deserunt et
      inventore cum porro ex, repellat eum, aliquid, omnis
      corrupti optio numquam quisquam ut magnam doloremque? Lorem
      ipsum dolor sit amet consectetur adipisicing elit. Itaque
      eveniet quia praesentium quaerat deserunt et inventore cum
      porro ex, repe Lorem ipsum Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Itaque eveniet quia praesentium quaerat deserunt et
      inventore cum porro ex, repellat eum, aliquid, omnis
      corrupti optio numquam quisquam ut magnam doloremque? Lorem
      ipsum dolor sit amet consectetur adipisicing elit. Itaque
      eveniet quia praesentium quaerat deserunt et inventore cum
      porro ex, repe Lorem ipsum`,
    },
  ];

  return (
    <>
      <div className="p-[50px]">
        <p className=" font-extrabold text-3xl text-website2">
          Biecips Exercises
        </p>
        <div className="exer-image mt-5 flex gap-10">
          <div className="exer-left-image bg-orange-400 h-[490px] w-[35%] overflow-hidden rounded-xl">
            <img
              className="h-full"
              src="https://cdn.mos.cms.futurecdn.net/zkrwxQVtsn3Yi2Pgmh89eN-1200-80.jpg"
              alt=""
            />
          </div>
          <div className="exer-right w-[63%] rounded-xl">
            <div className="exer-exercises flex flex-col gap-6">
              {dummyData.map((ele) => {
                return (
                  <div key={ele.id} onClick={() => handleOpenArray(ele.id)}>
                    <div
                      className={`exer shadow-lg pl-3 rounded-xl overflow-hidden duration-300 ${
                        openArray.includes(ele.id) ? "h-[430px]" : "h-[40px]"
                      } `}
                    >
                      <div className="title flex justify-between items-center ">
                        <p className="font-extrabold text-xl ">{ele.title}</p>
                        <p className="pr-2 w-[50%] flex justify-end ">
                          {openArray.includes(ele.id) ? (
                            <BsArrowUpCircleFill size={23} color="#ed563b" />
                          ) : (
                            <BsArrowDownCircleFill size={23} color="#ed563b" />
                          )}
                        </p>
                      </div>
                      <div className="exer-contrent flex w-full h-[90%] ">
                        <div className="video w-[100%]">
                          <iframe
                            className="w-full h-[360px] my-5 rounded-lg"
                            src="https://www.youtube.com/embed/VIDEO_ID"
                            frameborder="0"
                            allowfullscreen
                          ></iframe>
                        </div>
                        <div className="description w-full pl-10 mt-5 font-bold pr-5 h-[90%]">
                          {ele.desc}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
