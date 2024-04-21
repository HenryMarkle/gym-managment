"use client";
import { notFound, useParams } from "next/navigation";
import { getCustomerById, deleteCustomerById } from "../../../api/v1/customer";
import { useRouter } from "next/navigation";
import { CiCircleRemove } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import React, { use, useEffect, useState } from "react";
import "./style.css";
import Swal from "sweetalert2";
function page() {
  const params = useParams();
  const [user, setUser] = useState({});
  const [fetchError, setFetchError] = useState(null);
  const [daysLeft, setDaysLeft] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const [startedAt, setStartedAt] = useState("");
  const [endsAt, setEndsAt] = useState("");
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    getCustomerById(Number(id)).then((u) => {
      setLoading(false);
      if (u == null) {
        setFetchError("notFound");
      } else if (u === "error") {
        setFetchError("error");
      } else {
        setFetchError(null);
        setUser(u ?? {});
        const formattedStartAt = new Date(u.startedAt).toLocaleDateString(
          "tr-GB"
        );
        setStartedAt(formattedStartAt);
        const formattedEndsAt = new Date(u.endsAt).toLocaleDateString("tr-GB");
        setEndsAt(formattedEndsAt);
        if (u?.startedAt && u?.endsAt) {
          const startDate = new Date(u.startedAt);
          const endDate = new Date(u.endsAt);
          const timeDifference = endDate - startDate;
          const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
          setDaysLeft(daysDifference);
        }
      }
    });
  }, [id]);

  const showAlert = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteCustomerById(Number(id));
        await Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        router.push("/panel/customers");
      }
    });
  };

  const [isEditing, setIsEditing] = useState(false);
  const editing = "bg-black-200 shadow-md duration-300 p-2 w-[67%] mt-[2px]";

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : fetchError ? (
        <div>Not Found</div>
      ) : (
        <div className="ml-[30%] w-[60%] shadow-xl h-[94vh] mx-auto my-10 rounded-[31px] p-3">
          <div className="header w-full flex justify-between px-4">
            <p className="  font-bold text-[22px] ">
              Information of {user.name}
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
                <CiCircleRemove
                  color="red"
                  size={26}
                  onClick={() => showAlert(user.id)}
                />
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
                      ? `${editing} border-2 border-[#ffcb00] rounded-[31px] p-1`
                      : " duration-300 border-2 border-[#a4a296] rounded-[31px] p-1 w-[67%] mt-[2px]"
                  }
                  type="text"
                  disabled={isEditing ? false : true}
                  defaultValue={user.name}
                  name=""
                  id=""
                />
              </div>
              <div className="name w-[95%] flex flex-col">
                <span className=" opacity-80  text-[15px]">surname </span>
                <input
                  className={
                    isEditing
                      ? `${editing} border-2 border-[#ffcb00] rounded-[31px] p-1`
                      : " duration-300 border-2 border-[#a4a296] rounded-[31px] p-1 w-[67%] mt-[2px]"
                  }
                  type="text"
                  defaultValue={user.surname}
                  disabled={isEditing ? false : true}
                />
              </div>
              <div className="name w-[95%] flex flex-col">
                <span className=" opacity-80  text-[15px]">age </span>
                <input
                  className={
                    isEditing
                      ? `${editing} border-2 border-[#ffcb00] rounded-[31px] p-1`
                      : " duration-300 border-2 border-[#a4a296] rounded-[31px] p-1 w-[67%] mt-[2px]"
                  }
                  type="text"
                  defaultValue={user.age}
                  disabled={isEditing ? false : true}
                />
              </div>
              <div className="name w-[95%] flex flex-col">
                <span className=" opacity-80  text-[15px]">price </span>
                <input
                  className={
                    isEditing
                      ? `${editing} border-2 border-[#ffcb00] rounded-[31px] p-1`
                      : " duration-300 border-2 border-[#a4a296] rounded-[31px] p-1 w-[67%] mt-[2px]"
                  }
                  type="text"
                  defaultValue={user.bucketPrice}
                  disabled={isEditing ? false : true}
                />
              </div>
              <div className="name w-[95%] flex flex-col">
                <span className=" opacity-80  text-[15px]">paid </span>
                <input
                  className={
                    isEditing
                      ? `${editing} border-2 border-[#ffcb00] rounded-[31px] p-1`
                      : " duration-300 border-2 border-[#a4a296] rounded-[31px] p-1 w-[67%] mt-[2px]"
                  }
                  type="text"
                  defaultValue={user.paymentAmount}
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
                      ? `${editing} border-2 border-[#ffcb00] rounded-[31px] p-1`
                      : " duration-300 border-2 border-[#a4a296] rounded-[31px] p-1 w-[67%] mt-[2px]"
                  }
                  hidden={!user?.startedAt}
                  type={"text"}
                  disabled={isEditing ? false : true}
                  defaultValue={startedAt}
                />
              </div>
              <div className="name w-[95%] flex flex-col">
                <span className=" opacity-80  text-[15px]">end at </span>
                <input
                  className={
                    isEditing
                      ? `${editing} border-2 border-[#ffcb00] rounded-[31px] p-1`
                      : " duration-300 border-2 border-[#a4a296] rounded-[31px] p-1 w-[67%] mt-[2px]"
                  }
                  type={"text"}
                  hidden={!user?.endsAt}
                  defaultValue={endsAt}
                  disabled={isEditing ? false : true}
                />
              </div>
              <div className="name w-[95%] flex flex-col">
                <span className=" opacity-80  text-[15px]">Days left </span>
                <input
                  className={
                    isEditing
                      ? `${editing} border-2 border-[#ffcb00] rounded-[31px] p-1`
                      : "duration-300 border-2 border-[#a4a296] rounded-[31px] p-1 w-[67%] mt-[2px]"
                  }
                  type="text"
                  value={daysLeft !== null ? daysLeft : ""}
                  disabled={isEditing ? false : true}
                />
              </div>
              <div className="name w-[95%] flex flex-col">
                <span className=" opacity-80 text-[15px]">gender </span>
                <input
                  className={
                    isEditing
                      ? `${editing} border-2 border-[#ffcb00] rounded-[31px] p-1`
                      : " duration-300 border-2 border-[#a4a296] rounded-[31px] p-1 w-[67%] mt-[2px]"
                  }
                  type="text"
                  disabled={isEditing ? false : true}
                  defaultValue={user.gender}
                  name=""
                  id=""
                />
              </div>
              <button
                disabled={!isEditing}
                className="submit-btn bg-customRed w-[67%] text-center mt-5 p-3 font-bold rounded-[31px] text-white shadow-md"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default page;
