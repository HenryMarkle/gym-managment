"use client";
import { useParams } from "next/navigation";
import { getCustomerById } from "../../api/v1/customer";
import { CiCircleRemove } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import React, { use, useEffect, useState } from "react";
function page() {
  const params = useParams();

  const [user, setUser] = useState([
    {
      name: "Ali",
      surname: "Assani",
      age: 13,
      bucketPrice: 3300,
      paymentAmount: 2000,
      formattedStartDate: "10-10-2002",
      formatedEndDate: "10-10-2002",
      gender: "Male",
    },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const editing = "bg-black-200 shadow-md duration-300 p-2 w-[67%] mt-[2px]";
  // useEffect(() => {
  //   const getElements = async () => {
  //     const result = await getCustomerById(Number(params.id));
  //     return result;
  //   };
  //   getElements().then((d) => {
  //     setUser([d]);
  //     console.log(d);
  //   });
  // }, []);

  return (
    <div className="ml-[30%] w-[60%] shadow-xl h-[94vh] mx-auto my-10 rounded-xl p-3">
      {user.map((ele) => {
        const startedAt = ele.startedAt;
        const dateObject = new Date(startedAt);
        const formattedStartDate = dateObject.toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });

        const endsAt = ele.endsAt;
        const endDateObjext = new Date(endsAt);
        const formatedEndDate = endDateObjext.toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });

        const getDayDifference = (formattedStartDate, formatedEndDate) => {
          const startDate = new Date(formattedStartDate);
          const endDate = new Date(formatedEndDate);

          const timeDifference = endDate.getTime() - startDate.getTime();

          const dayDifference = timeDifference / (1000 * 60 * 60 * 24);

          return Math.abs(dayDifference);
        };

        return (
          <>
            <div className="header w-full flex justify-between px-4">
              <p className="  font-bold text-[22px] ">
                Inoformations of {ele.name}
              </p>
              <div className=" flex gap-3">
                <span>
                  <CiEdit
                    onClick={() => setIsEditing(!isEditing)}
                    color="green"
                    size={26}
                  />
                </span>
                <span>
                  <CiCircleRemove color="red" size={26} />
                </span>
              </div>
            </div>

            <div className="customer-informations flex flex-row p-2 w-full  items-center mt-12 ">
              <div className="left w-[50%] flex flex-col gap-8 justify-center">
                <div className="name w-[95%] flex flex-col">
                  <span className=" opacity-80  text-[15px]">name </span>
                  <input
                    className={
                      isEditing
                        ? `${editing} border-2 border-[#ffcb00] rounded-[31px] p-2`
                        : " duration-300 border-2 border-[#ffcb00] rounded-[31px] p-1 w-[67%] mt-[2px]"
                    }
                    type="text"
                    disabled={isEditing ? false : true}
                    defaultValue={ele.name}
                    name=""
                    id=""
                  />
                </div>
                <div className="name w-[95%] flex flex-col">
                  <span className=" opacity-80  text-[15px]">surname </span>
                  <input
                    className={
                      isEditing
                        ? `${editing} border-2 border-[#ffcb00] rounded-[31px] p-2`
                        : " duration-300 border-2 border-[#ffcb00] rounded-[31px] p-1 w-[67%] mt-[2px]"
                    }
                    type="text"
                    defaultValue={ele.surname}
                    disabled={isEditing ? false : true}
                  />
                </div>
                <div className="name w-[95%] flex flex-col">
                  <span className=" opacity-80  text-[15px]">age </span>
                  <input
                    className={
                      isEditing
                        ? `${editing} border-2 border-[#ffcb00] rounded-[31px] p-2`
                        : " duration-300 border-2 border-[#ffcb00] rounded-[31px] p-1 w-[67%] mt-[2px]"
                    }
                    type="text"
                    defaultValue={ele.age}
                    disabled={isEditing ? false : true}
                  />
                </div>
                <div className="name w-[95%] flex flex-col">
                  <span className=" opacity-80  text-[15px]">price </span>
                  <input
                    className={
                      isEditing
                        ? `${editing} border-2 border-[#ffcb00] rounded-[31px] p-2`
                        : " duration-300 border-2 border-[#ffcb00] rounded-[31px] p-1 w-[67%] mt-[2px]"
                    }
                    type="text"
                    defaultValue={ele.bucketPrice}
                    disabled={isEditing ? false : true}
                  />
                </div>
                <div className="name w-[95%] flex flex-col">
                  <span className=" opacity-80  text-[15px]">paid </span>
                  <input
                    className={
                      isEditing
                        ? `${editing} border-2 border-[#ffcb00] rounded-[31px] p-2`
                        : " duration-300 border-2 border-[#ffcb00] rounded-[31px] p-1 w-[67%] mt-[2px]"
                    }
                    type="text"
                    defaultValue={ele.paymentAmount}
                    disabled={isEditing ? false : true}
                  />
                </div>
              </div>
              <div className="right w-[50%] mb-[5px] flex flex-col gap-8 justify-center">
                <div className="name w-[95%] flex flex-col">
                  <span className=" opacity-80  text-[15px]">started at </span>
                  <input
                    className={
                      isEditing
                        ? `${editing} border-2 border-[#ffcb00] rounded-[31px] p-2`
                        : " duration-300 border-2 border-[#ffcb00] rounded-[31px] p-1 w-[67%] mt-[2px]"
                    }
                    type={isEditing ? "date" : "text"}
                    defaultValue={formattedStartDate}
                    disabled={isEditing ? false : true}
                  />
                </div>
                <div className="name w-[95%] flex flex-col">
                  <span className=" opacity-80  text-[15px]">end at </span>
                  <input
                    className={
                      isEditing
                        ? `${editing} border-2 border-[#ffcb00] rounded-[31px] p-2`
                        : " duration-300 border-2 border-[#ffcb00] rounded-[31px] p-1 w-[67%] mt-[2px]"
                    }
                    type={isEditing ? "date" : "text"}
                    defaultValue={formatedEndDate}
                    disabled={isEditing ? false : true}
                  />
                </div>
                <div className="name w-[95%] flex flex-col">
                  <span className=" opacity-80  text-[15px]">Days left </span>
                  <input
                    className={
                      isEditing
                        ? `${editing} border-2 border-[#ffcb00] rounded-[31px] p-2`
                        : " duration-300 border-2 border-[#ffcb00] rounded-[31px] p-1 w-[67%] mt-[2px]"
                    }
                    type="text"
                    defaultValue={getDayDifference(
                      formatedEndDate,
                      formattedStartDate
                    )}
                    disabled={isEditing ? false : true}
                  />
                </div>
                <div className="name w-[95%] flex flex-col">
                  <span className=" opacity-80 text-[15px]">gender </span>
                  <input
                    className={
                      isEditing
                        ? `${editing} border-2 border-[#ffcb00] rounded-[31px] p-2`
                        : " duration-300 border-2 border-[#ffcb00] rounded-[31px] p-1 w-[67%] mt-[2px]"
                    }
                    type="text"
                    disabled={isEditing ? false : true}
                    defaultValue={ele.gender}
                    name=""
                    id=""
                  />
                </div>
                <button className=" bg-customRed w-[50%] text-center mt-5 py-2 font-bold rounded-[31px] text-white shadow-md">
                  Submit
                </button>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default page;
