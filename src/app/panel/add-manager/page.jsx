"use client";
import React, { useState } from "react";
import { addUser } from "../../api/v1/user";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

function AddUserPage() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [gender, setGender] = useState("Gender");
  const [age, setAge] = useState("");
  const [salary, setSalary] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAddUser = async () => {
    const result = await Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    });
    if (result.isConfirmed) {
      try {
        await addUser({
          name,
          surname,
          age: Number(age),
          gender,
          salary: Number(salary),
          startDate: new Date().toISOString(),
          email,
          password,
        });
        Swal.fire("Saved!", "", "success");
      } catch (error) {
        console.error("Error adding user:", error);
        Swal.fire("Error", "Failed to add user", "error");
      }
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const router = useRouter();

  return (
    <div className="bg-bg_custom pt-10 h-[100vh]">
      <div className="add ml-[30%] px-4 mr-[10%] shadow-sm rounded-[6px] bg-white">
        <div className="head flex justify-between items-center pt-10">
          <p className="font-bold text-[20px]">Create Manager</p>
          <div>
            <button
              onClick={handleCancel}
              className="mr-4 bg-white text-txt_secondery shadow-sm px-4 py-2 rounded-[5px] border-[1px] border-border_secondery border-solid"
            >
              Cancel
            </button>
            <button
              onClick={handleAddUser}
              className="bg-bg_secondery shadow-sm text-white px-4 py-2 rounded-[5px]"
            >
              Create Manager
            </button>
          </div>
        </div>
        <div className="mt-12 flex w-full h-[450px] gap-3">
          {/* Left Column */}
          <div className="left w-1/2 z-30 flex flex-col gap-3">
            <div className="name flex-col flex">
              <label className="font-bold text-md mb-[5px]">Name</label>
              <input
                className="py-2 px-3 border-2 border-red rounded-[9px]"
                onChange={(e) => setName(e.target.value)}
                name="name"
                type="text"
                placeholder="Name"
              />
            </div>
            <div className="surname flex-col flex">
              <label className="font-bold text-md mb-[5px]">Surname</label>
              <input
                className="py-2 px-3 border-2 border-red rounded-[9px]"
                onChange={(e) => setSurname(e.target.value)}
                name="surname"
                type="text"
                placeholder="Surname"
              />
            </div>
            <div className="start-date flex-col flex">
              <label className="font-bold text-md mb-[5px]">Start Date</label>
              <input
                className="py-2 px-3 border-2 border-red rounded-[9px]"
                onChange={(e) => setName(e.target.value)}
                name="startDate"
                type="date"
                placeholder="Start date"
              />
            </div>

            <div className="age flex-col flex">
              <label className="font-bold text-md mb-[5px]">Age</label>
              <input
                className="py-2 px-3 border-2 border-red rounded-[9px]"
                onChange={(e) => setAge(e.target.value)}
                name="age"
                type="number"
                placeholder="Age"
              />
            </div>
          </div>
          {/* Right Column */}
          <div className="right w-1/2 z-30 flex flex-col gap-3">
            <div className="end-date flex-col flex">
              <label className="font-bold text-md mb-[5px]">Email</label>
              <input
                className="py-2 px-3 border-2 border-red rounded-[9px]"
                onChange={(e) => setEmail(e.target.value)}
                name="endDate"
                type="text"
                placeholder="Email"
              />
            </div>
            <div className="price flex-col flex">
              <label className="font-bold text-md mb-[5px]">Password</label>
              <input
                className="py-2 px-3 border-2 border-red rounded-[9px]"
                onChange={(e) => setPassword(e.target.value)}
                name="bucketPrice"
                type="number"
                placeholder="Bucket price"
              />
            </div>{" "}
            <div className="price flex-col flex">
              <label className="font-bold text-md mb-[5px]">Salary</label>
              <input
                className="py-2 px-3 border-2 border-red rounded-[9px]"
                onChange={(e) => setSalary(e.target.value)}
                name="bucketPrice"
                type="number"
                placeholder="Salary"
              />
            </div>
            <div className="gender flex-col flex">
              <label className="font-bold text-md mb-[5px]">Gender</label>
              <select
                className="outline-none py-2 px-3 border-2 border-red rounded-[9px]"
                onChange={(e) => setGender(e.target.value)}
                name="gender"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddUserPage;
