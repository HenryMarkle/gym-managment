"use client";
import React, { useEffect, useState } from "react";
import { CiSaveDown1 } from "react-icons/ci";
import { CiSaveUp1 } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";

import "./helper.css";
import storage from "../../../api/v1/firebase";
import { ref, uploadBytes } from "firebase/storage";

import {
  getAllSectionsWithExcercises,
  createSection,
  getAllSections,
  createExcercise,
  deleteSection,
  deleteExcerciseById,
} from "../../../api/v1/excercises";
import Swal from "sweetalert2";

function Exercises() {
  const [sectionOpen, setSectionOpen] = useState(false);
  const [exercisesOpen, setExercisesOpen] = useState(false);

  const [allSectionsWithExcercises, setAllSectionWithExcercises] = useState([]);
  const [allSections, setAllSections] = useState([]);
  const [newExcercise, setNewExcercise] = useState({
    name: "",
    description: "",
    sectionName: "",
  });

  const deletSection = async (name) => {
    await deleteSection(name)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const [openSection, setOpenSection] = useState([]);

  const [openExercises, setOpenExercises] = useState([]);

  const [inEditingExercise, setInEditingExercise] = useState();

  const [userIsEditingExercise, setUserIsEditingExercise] = useState(false);

  function updateNewExcercise(data) {
    var key = data.target.name;

    // console.log(`key: ${key}, value: ${data.target.value}`);

    setNewExcercise((prev) => ({
      ...prev,

      [key]: data.target.value,
    }));
  }

  let newSectionName = "";
  let newSectionImage = null;
  let newExerciseVideo = null;

  useEffect(() => {
    getAllSectionsWithExcercises()
      .then((response) => {
        if (response !== "error") {
          setAllSectionWithExcercises(response);
          console.log(response);
        }
      })
      .catch(console.log);

    getAllSections().then((res) => {
      if (res !== "error") {
        setAllSections(res);
        console.log(res);
      }
    });
  }, []);

  const [inEditingSections, setInEditinSection] = useState([]);
  return (
    <>
      <div className="p-5 mb-[200px]">
        <p className="font-bold text-3xl mb-6 ">Exercises</p>
        {/* Start section blog */}
        <div
          className={` shadow-xl  p-2  rounded-md overflow-hidden ${
            sectionOpen ? "h-[max]" : "h-[40px]"
          }`}
        >
          <div
            onClick={() => setSectionOpen(!sectionOpen)}
            className="flex justify-between items-center"
          >
            <p className="font-bold text-xl ">Sections</p>
            <span>
              {sectionOpen ? (
                <CiSaveUp1 size={23} />
              ) : (
                <CiSaveDown1 size={23} />
              )}
            </span>
          </div>
          <div className="flex flex-wrap gap-4 pb-10 mt-10">
            <div className="create-section mt-10 p-3 shadow-md w-1/3 rounded-md border-r-2 mr-12 mb-4 h-max">
              <p className="font-bold text-center mb-4">Create section</p>
              <p className="font-bold mb-2">Sectio name</p>
              <input
                className="w-full"
                type="text"
                name=""
                id=""
                onChange={(e) => (newSectionName = e.target.value)}
                placeholder="Section name"
              />
              <p className="font-bold mt-4 mb-2">Sectio image</p>
              <input
                type="file"
                className=" w-full"
                onChange={(e) => {
                  newSectionImage = e.target.files.length
                    ? e.target.files[0]
                    : null;

                  console.log(newSectionImage);
                }}
              />
              <button
                onClick={async () => {
                  let createResult = await createSection(newSectionName);

                  if (
                    createResult === "error" ||
                    createResult === "unauthorized"
                  )
                    return;

                  console.log("section image was: " + newSectionImage);
                  if (!newSectionImage) return;

                  var extension = newSectionImage.name.includes(".")
                    ? newSectionImage.name.substring(
                        newSectionImage.name.lastIndexOf(".") + 1,
                        newSectionImage.name.length
                      )
                    : "";

                  let storageRef = ref(
                    storage,
                    `images/excercise_sections/${newSectionName}.${extension}`
                  );

                  await uploadBytes(storageRef, newSectionImage);
                }}
                className=" bg-green-700 text-white px-4 py-2 mt-4 rounded-md mx-auto w-full my-0 "
              >
                Crete section
              </button>
            </div>
            {allSections.map((ele) => {
              return (
                <>
                  <div className="sction w-1/6 shadow-md px-4 relative py-5 rounded-lg">
                    {inEditingSections.includes(ele.id) ? (
                      <>
                        <input
                          onChange={(e) => {
                            inEditingExercies.name = e.target.value;
                            console.log(inEditingExercies.name);
                          }}
                          className="border-2  my-3  rounded-xl"
                          type="text"
                          defaultValue={ele.name}
                        />
                      </>
                    ) : (
                      <>
                        <p className="font-bold text-center mb-2 mt-6">
                          {ele.name}
                        </p>
                      </>
                    )}
                    <CiEdit
                      onClick={() => {
                        setInEditinSection((prev) => [ele.id]);
                        console.log(inEditingSections);
                      }}
                      className="absolute top-0 right-4"
                      size={23}
                      color="green"
                    />
                    <MdDeleteForever
                      onClick={() => {
                        Swal.fire({
                          title: "Do you want to Delete the Section?",
                          showDenyButton: true,
                          showCancelButton: true,
                          confirmButtonText: "Delete",
                          denyButtonText: `Don't Delete`,
                        }).then(async (result) => {
                          /* Read more about isConfirmed, isDenied below */
                          if (result.isConfirmed) {
                            deletSection(ele.name);
                            Swal.fire("Section Deleted!", "", "success");
                          } else if (result.isDenied) {
                            Swal.fire("Section not deleted", "", "info");
                          }
                        });
                      }}
                      className="absolute top-0 cursor-pointer z-50"
                      color="red"
                      size={23}
                    />

                    <img
                      src="https://image-prod.iol.co.za/resize/640x64000/?source=https://xlibris.public.prod.oc.inl.infomaker.io:8443/opencontent/objects/47e4c8ec-2500-58d9-a698-e8d54f04be98&operation=CROP&offset=0x0&resize=1080x1350&webp=true"
                      alt=""
                    />
                    {inEditingSections.includes(ele.id) && (
                      <>
                        <button className=" w-full bg-green-600 mt-4 py-2 text-white font-bold rounded-lg">
                          Submit edits
                        </button>
                      </>
                    )}
                  </div>
                </>
              );
            })}
          </div>
        </div>

        {/* Start Exercises blog */}

        <div
          className={`Exercises shadow-lg p-2 rounded-md mt-6 overflow-hidden ${
            exercisesOpen ? "h-max" : "h-[40px]"
          }`}
        >
          <div
            onClick={() => setExercisesOpen(!exercisesOpen)}
            className="flex justify-between items-center"
          >
            <p className="font-bold text-xl">Exercises</p>
            <span>
              {exercisesOpen ? (
                <CiSaveUp1 size={23} />
              ) : (
                <CiSaveDown1 size={23} />
              )}
            </span>
          </div>
          <div className="flex ml-5 gap-4 pb-10">
            <div className="create-exercise flex-col justify-center  mt-10 p-3 shadow-md  rounded-md border-r-2 mr-12 mb-4 h-max ">
              <p className="font-bold text-center mb-4">Create Exercise</p>
              <p className="font-bold mb-2">Exercise section</p>
              <select
                className="w-full outline-none border-2 rounded-xl px-2 mb-3"
                name="sectionName"
                onChange={updateNewExcercise}
              >
                {allSectionsWithExcercises.map((a) => (
                  <option>{a.name}</option>
                ))}
              </select>
              <p className="font-bold mb-2">Exercise name</p>
              <input
                className="w-full"
                type="text"
                name="name"
                placeholder="Exercise name"
                onChange={updateNewExcercise}
              />
              <p className="font-bold mb-2">Exercise Description</p>
              <textarea
                className="w-full min-h-[150px] border-2 p-2 rounded-xl resize-none outline-none"
                type="text"
                name="description"
                placeholder="Exercise Description"
                onChange={updateNewExcercise}
              />
              <p className="font-bold mt-4 mb-2">Exercise Video</p>
              <input
                type="file"
                className=" w-full"
                onChange={(e) =>
                  (newExerciseVideo = e.target.files.length
                    ? e.target.files[0]
                    : null)
                }
              />
              <button
                onClick={async () => {
                  let result = await createExcercise(newExcercise);
                  console.log("create exercise: " + result);

                  if (
                    result === "error" ||
                    result === "sectionNotFound" ||
                    result === "unauthorized"
                  )
                    return;

                  setNewExcercise({
                    name: "",
                    description: "",
                    sectionName: "",
                  });

                  console.log("new video: " + newExerciseVideo);

                  if (!newExerciseVideo) return;

                  var extension = newExerciseVideo.name.includes(".")
                    ? newExerciseVideo.name.substring(
                        newExerciseVideo.name.lastIndexOf(".") + 1,
                        newExerciseVideo.name.length
                      )
                    : "";

                  let storageRef = ref(
                    storage,
                    `videos/exercises/${result}.${extension}`
                  );

                  await uploadBytes(storageRef, newExerciseVideo);
                }}
                className=" bg-green-700 text-white px-4 py-2 mt-4 rounded-md mx-auto w-full my-0 "
              >
                Create Exercise
              </button>
            </div>
            <div className="flex-1 mr-4 ">
              {allSectionsWithExcercises.map((ele) => {
                return (
                  <>
                    <div
                      className={`section-and-realated-exercises pb-8 px-3 w-full shadow-md overflow-hidden ${
                        openSection.includes(ele.id) ? "h-max" : "h-[20px]"
                      } mt-14 rounded-md`}
                    >
                      <div className="head">
                        <div
                          onClick={() => {
                            if (openSection.includes(ele.id)) {
                              setOpenSection(
                                openSection.filter((id) => id !== ele.id)
                              );
                            } else {
                              setOpenSection([...openSection, ele.id]);
                            }
                            console.log(openSection);
                          }}
                          className="flex justify-between flex-row-reverse items-center"
                        >
                          {openSection.includes(ele.id) ? (
                            <CiSaveUp1 size={23} />
                          ) : (
                            <CiSaveDown1 size={23} />
                          )}
                          <p className="font-bold text-xl">{ele.name}</p>
                        </div>
                        {ele.excercises.length > 0 ? (
                          ele.excercises.map((e) => {
                            return (
                              <>
                                <div
                                  className={`mt-5 w-[97%] p-2 -z-50 ${
                                    openExercises.includes(e.id)
                                      ? "h-[400px]"
                                      : "h-[39px]"
                                  } rounded-lg  shadow-md overflow-hidden duration-500`}
                                >
                                  <div
                                    onClick={() => {
                                      if (openExercises.includes(e.id)) {
                                        setOpenExercises(
                                          openExercises.filter(
                                            (id) => id !== e.id
                                          )
                                        );
                                      } else {
                                        setOpenExercises([
                                          ...openExercises,
                                          e.id,
                                        ]);
                                      }
                                    }}
                                    className="px-2 flex items-center justify-between relative"
                                  >
                                    <p className="font-bold ">{e.name}</p>

                                    <span>
                                      {openExercises.includes(e.id) ? (
                                        <CiSaveUp1 size={23} />
                                      ) : (
                                        <CiSaveDown1 size={23} />
                                      )}
                                    </span>
                                  </div>
                                  <div className="content mt-10 grid grid-cols-2 gap-5 shadow-md m-2 p-4 h-[80%] relative">
                                    {inEditingExercise === e.id ? (
                                      <MdOutlineCancel
                                        color="green"
                                        className="absolute top-0 right-4"
                                        size={23}
                                        onClick={() => {
                                          userIsEditingExercise
                                            ? Swal.fire({
                                                title:
                                                  "Do you want to ignore the changes?",
                                                showDenyButton: true,
                                                showCancelButton: true,
                                                confirmButtonText: "Ignore",
                                                denyButtonText: `Apply `,
                                              }).then((result) => {
                                                /* Read more about isConfirmed, isDenied below */
                                                if (result.isConfirmed) {
                                                  Swal.fire(
                                                    "Changes will not be applied !",
                                                    "",
                                                    "error"
                                                  );
                                                  setInEditingExercise(null);
                                                } else if (result.isDenied) {
                                                  Swal.fire(
                                                    "Changes are Saved !",
                                                    "",
                                                    "success"
                                                  );
                                                  setInEditingExercise(null);
                                                }
                                              })
                                            : setInEditingExercise(null);
                                        }}
                                      />
                                    ) : (
                                      <CiEdit
                                        onClick={() =>
                                          setInEditingExercise(e.id)
                                        }
                                        className="absolute top-0 right-4"
                                        size={23}
                                        color="green"
                                      />
                                    )}
                                    <MdDeleteForever
                                      className="absolute top-0 right-11"
                                      color="red"
                                      size={23}
                                      onClick={async () => {
                                        await deleteExcerciseById(e.id);
                                      }}
                                    />

                                    <div>
                                      <img
                                        className=""
                                        src="https://steelfitusa.com/cdn/shop/articles/The-Anatomy-of-the-Biceps.jpg?v=1660142064&width=1500"
                                        alt=""
                                      />
                                    </div>
                                    <p
                                      style={{ overflowWrap: "anywhere" }}
                                      className=" h-[90%] w-[90%]  "
                                    >
                                      {inEditingExercise === e.id ? (
                                        <>
                                          <input
                                            onChange={() => {
                                              setUserIsEditingExercise(true);
                                            }}
                                            className="px-2"
                                            type="text"
                                            defaultValue={e.name}
                                          />
                                          <textarea
                                            onChange={() => {
                                              setUserIsEditingExercise(true);
                                            }}
                                            className=" resize-none h-[70%] w-full mt-4 p-1 border-2 outline-none rounded-xl"
                                            type="text"
                                            defaultValue={e.description}
                                          />
                                          <button className="px-2 bg-green-600 text-white py-1 rounded-lg">
                                            Submit edits
                                          </button>
                                        </>
                                      ) : (
                                        <>
                                          <p className="mb-5 font-bold">
                                            {e.name}
                                          </p>
                                          <p className=" ">{e.description}</p>
                                        </>
                                      )}
                                    </p>
                                  </div>
                                </div>
                              </>
                            );
                          })
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <p className="mt-10 font-bold text-3xl">
                              No exercises related
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                );
              })}
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Exercises;
