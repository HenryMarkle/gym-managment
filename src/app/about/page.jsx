import React from "react";

function page() {
  return (
    <>
      <div className="px-20 py-12 flex gap-20">
        <div className="left w-1/2 h-[79vh] relative">
          <div className="bor border-orange-600 border-[28px] h-full w-1/2 relative"></div>

          <div className="img absolute top-16 left-[18%] rounded-3xl overflow-hidden">
            <img
              className="z-[999]"
              width="290px"
              src="https://images.pexels.com/photos/4753890/pexels-photo-4753890.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="gym image"
            />
          </div>
        </div>
        <div className="right w-[70%]">
          <p className="text-2xl text-website2 font-extrabold">About Us !</p>
          <div className="mt-4">
            <p className="mb-4 text-3xl font-bold">
              We Have Been Training Since Years !
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
              quos vel magni adipisci, sit placeat nostrum qui neque porro
              ullam! Incidunt culpa repellendus doloremque impedit sapiente
              nobis error atque sit! Lorem ipsum dolor, sit amet consectetur
              adipisicing elit. Voluptates obcaecati ducimus harum deleniti
              earum, corrupti facilis id esse veniam incidunt sunt eius ea
              tenetur enim ipsa, beatae iure maxime numquam. Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Harum quos vel magni
              adipisci, sit placeat nostrum qui neque porro ullam! Incidunt
              culpa repellendus doloremque impedit sapiente nobis error atque
              sit! Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Voluptates obcaecati ducimus harum deleniti earum, corrupti
              facilis id esse veniam incidunt sunt eius ea tenetur enim ipsa,
              beatae iure maxime numquam. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Harum quos vel magni adipisci, sit placeat
              nostrum qui neque porro ullam! Incidunt culpa repellendus
              doloremque impedit sapiente nobis error atque sit! Lorem ipsum
              dolor, sit amet consectetur adipisicing elit. Voluptates obcaecati
              ducimus harum deleniti earum, corrupti facilis id esse veniam
              incidunt sunt eius ea tenetur enim ipsa, beatae iure maxime
              numquam. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Harum quos vel magni adipisci, sit placeat nostrum qui neque porro
              ullam! Incidunt culpa repellendus doloremque impedit sapiente
              nobis error atque sit! Lorem ipsum dolor, sit amet consectetur
              tenetur enim ipsa, beatae iure maxime numquam nobis error atque
              sit! Lorem ipsum dolor, sit amet consectetur tenetur enim ipsa,
              beatae iure maxime numquam nobis error atque sit! Lorem ipsum
              dolor, sit amet consectetur tenetur enim ipsa, beatae iure maxime
              numquam
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
