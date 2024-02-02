"use client";
import { notFound, useParams } from "next/navigation";
import { getCustomerById, deleteCustomerById } from "../../api/v1/customer";
import { CiCircleRemove } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import React, { use, useEffect, useState } from "react";
import './style.css';

function page() {
  const params = useParams();

  const [user, setUser] = useState({});
  const [ fetchError, setFetchError ] = useState(null);

  useEffect(() => {
    const {id} = params;

    getCustomerById(Number(id)).then(u => {
      if (u == null) {
        setFetchError('notFound');
      } else if (u == "error") {
        setFetchError("error");
      } else {
        setFetchError(null)
        setUser(u);
      }
    });
  }, []);


  const [isEditing, setIsEditing] = useState(false);
  const editing = "bg-black-200 shadow-md duration-300 p-2 w-[67%] mt-[2px]";
  

  return (
    <>
     {fetchError ? <div>Not Found</div> : 
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
           <CiCircleRemove color="red" size={26} onClick={async (e) => await deleteCustomerById(Number(params.id))} />
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
                 ? `${editing} border-2 border-[#ffcb00] rounded-[31px] p-3`
                 : " duration-300 border-2 border-[#a4a296] rounded-[31px] p-3 w-[67%] mt-[2px]"
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
                 ? `${editing} border-2 border-[#ffcb00] rounded-[31px] p-3`
                 : " duration-300 border-2 border-[#a4a296] rounded-[31px] p-3 w-[67%] mt-[2px]"
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
                 ? `${editing} border-2 border-[#ffcb00] rounded-[31px] p-3`
                 : " duration-300 border-2 border-[#a4a296] rounded-[31px] p-3 w-[67%] mt-[2px]"
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
                 ? `${editing} border-2 border-[#ffcb00] rounded-[31px] p-3`
                 : " duration-300 border-2 border-[#a4a296] rounded-[31px] p-3 w-[67%] mt-[2px]"
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
                 ? `${editing} border-2 border-[#ffcb00] rounded-[31px] p-3`
                 : " duration-300 border-2 border-[#a4a296] rounded-[31px] p-3 w-[67%] mt-[2px]"
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
                 ? `${editing} border-2 border-[#ffcb00] rounded-[31px] p-3`
                 : " duration-300 border-2 border-[#a4a296] rounded-[31px] p-3 w-[67%] mt-[2px]"
             }
             hidden={!(user?.startedAt)}
             type={isEditing ? "date" : "text"}
             disabled={isEditing ? false : true}
             value={new Date(user.startedAt).toDateString()}
           />
         </div>
         <div className="name w-[95%] flex flex-col">
           <span className=" opacity-80  text-[15px]">end at </span>
           <input
             className={
               isEditing
                 ? `${editing} border-2 border-[#ffcb00] rounded-[31px] p-3`
                 : " duration-300 border-2 border-[#a4a296] rounded-[31px] p-3 w-[67%] mt-[2px]"
             }
             type={isEditing ? "date" : "text"}
             hidden={!(user?.endsAt)}
             value={new Date(user.endsAt).toDateString()}
             disabled={isEditing ? false : true}
           />
         </div>
         <div className="name w-[95%] flex flex-col">
           <span className=" opacity-80  text-[15px]">Days left </span>
           <input
             className={
               isEditing
                 ? `${editing} border-2 border-[#ffcb00] rounded-[31px] p-3`
                 : " duration-300 border-2 border-[#a4a296] rounded-[31px] p-3 w-[67%] mt-[2px]"
             }
             type="text"
             // defaultValue={getDayDifference(
             //   formatedEndDate,
             //   formattedStartDate
             // )}
             disabled={isEditing ? false : true}
           />
         </div>
         <div className="name w-[95%] flex flex-col">
           <span className=" opacity-80 text-[15px]">gender </span>
           <input
             className={
               isEditing
                 ? `${editing} border-2 border-[#ffcb00] rounded-[31px] p-3`
                 : " duration-300 border-2 border-[#a4a296] rounded-[31px] p-3 w-[67%] mt-[2px]"
             }
             type="text"
             disabled={isEditing ? false : true}
             defaultValue={user.gender}
             name=""
             id=""
           />
         </div>
         <button disabled={!isEditing} className="submit-btn bg-customRed w-[67%] text-center mt-5 p-3 font-bold rounded-[31px] text-white shadow-md">
           Update
         </button>
       </div>
     </div>
   </div>}
    </>
  );
}

export default page;
