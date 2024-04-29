import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { getContacts, updateContacts } from "../../app/api/v1/dashboard";

export function ContactPage() {
  const [contacts, setContacts] = useState(null);
  const [edited, setEdited] = useState(false);

  useEffect(() => {
    getContacts().then((c) => {
      if (c === "error" || c === "unauthorized") {
      } else {
        setContacts(c);
      }
    });
  }, []);

  return (
    <>
      <div className="contact grid grid-cols-2 gap-7 p-4">
        <div className="email flex flex-col relative">
          <label> Email</label>
          <MdOutlineEmail
            size={19}
            color="black"
            className=" absolute right-3 top-[33px] "
          />
          <input
            type="text"
            placeholder=" Email"
            value={contacts?.email}
            onChange={(e) => {
              setContacts((c) => {
                return { ...c, email: e.target.value };
              });
              setEdited(true);
            }}
          />
        </div>{" "}
        <div className="whatsapp flex flex-col relative">
          <label> WhatsApp Number</label>
          <input
            type="text"
            placeholder="WhatsApp Number"
            value={contacts?.whatsapp}
            onChange={(e) => {
              setContacts((c) => {
                return { ...c, whatsapp: e.target.value };
              });
              setEdited(true);
            }}
          />
          <FaWhatsapp
            size={19}
            color="black"
            className=" absolute right-3 top-[33px] "
          />
        </div>
        <div className="faceBook flex flex-col relative">
          <label> Facebook</label>
          <input type="text" placeholder="Facebook" />
        </div>{" "}
        <div className="Ig flex flex-col relative">
          <label> Instagram</label>
          <input type="text" placeholder="Instagram" />
        </div>{" "}
        <div className="X flex flex-col relative">
          <label> X (Twitter)</label>
          <input type="text" placeholder="X (Twitter)" />
        </div>{" "}
        <button
          onClick={() => {
            Swal.fire({
              title: `Do you want to save the Product?
                      You will be able to edit the product from Products page.
                      `,
              showDenyButton: false,
              showCancelButton: true,
              confirmButtonText: "Save",
              denyButtonText: `Don't save`,
            }).then(async (result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                const result = await updateContacts(contacts);

                if (result === "error" || result === "unauthorized") {
                } else {
                  Swal.fire("Saved!", "", "success");
                  setEdited(false);
                }
              } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
              }
            });
          }}
          className={`bg-[#eee] duration-500 hover:bg-green-600 hover:text-white h-[40px] self-end rounded-[31px] text-green-500 text-[23px] shadow-2xl `}
        >
          Create
        </button>
      </div>
    </>
  );
}
