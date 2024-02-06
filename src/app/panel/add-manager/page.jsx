"use client";
import React, { useEffect, useState } from "react";
import { addUser } from "../../api/v1/user";
import Swal from "sweetalert2";
import "./main.css";
function page() {
  const [startedAt, setStartedAt] = useState();
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [gender, setGender] = useState();
  const [age, setAge] = useState();
  const [salary, setSalary] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    console.log(startedAt, name, gender, surname, age, salary);
  }, [startedAt, name, gender, surname, age, salary]);

  return (
    <>
      <div className="add ml-[30%] mt-10 flex justify-between px-4 py-16 mr-[10%] gap-10 shadow-xl h-[650px] rounded-[31px]">
        <div className="left w-[45%]">
          <div className="start-date flex-col flex"></div>{" "}
          <div className="name flex-col flex ">
            <label htmlFor="">Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
            />
          </div>{" "}
          <div className="surname flex-col flex">
            <label htmlFor="">Surname</label>
            <input
              onChange={(e) => setSurname(e.target.value)}
              type="text"
              placeholder="Surname"
            />
          </div>{" "}
          <div className="surname flex-col flex">
            <label htmlFor="">Salary</label>
            <input
              onChange={(e) => setSalary(e.target.value)}
              type="number"
              placeholder="Salary"
            />
          </div>
          <div className="gender flex-col flex">
            <label htmlFor="">Gender</label>
            <select
              onChange={(e) => setGender(e.target.value)}
              name="gender"
              id=""
              className=" outline-none rounded-xl"
            >
              <option value="Gender">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>{" "}
        </div>
        <div className="right w-[45%]">
          <div className="age flex-col flex">
            <label htmlFor="">Age</label>
            <input
              onChange={(e) => setAge(e.target.value)}
              type="number"
              placeholder="Age"
            />
          </div>

          <div className="email flex-col flex">
            <label htmlFor="">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="password flex-col flex">
            <label htmlFor="">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
          </div>
          <button
            onClick={async () => {
              Swal.fire({
                title: "Do you want to save the changes?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Save",
                denyButtonText: `Don't save`,
              }).then(async (result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  Swal.fire("Saved!", "", "success");
                  const res = await addUser({
                    name,
                    surname,
                    age: Number(age),
                    gender,
                    salary: Number(salary),
                    startDate: new Date().toISOString(),
                    email,
                    password,
                  });
                  console.log("add-manager: " + JSON.stringify(res));
                } else if (result.isDenied) {
                  Swal.fire("Changes are not saved", "", "info");
                }
              });
            }}
            className=" mt-[25px] px-9 w-full py-2 rounded-xl bg-customRed text-white font-bold text-[18px] "
          >
            Create
          </button>
        </div>
      </div>
    </>
  );
}

export default page;
