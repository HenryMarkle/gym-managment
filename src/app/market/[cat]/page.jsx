"use client";
import { useParams } from "next/navigation";
import { useEffect } from "react";

function page({}) {
  const params = useParams();
  useEffect(() => {
    console.log(
      "the category you should bring the data by is" + " " + params.cat
    );
  });
  return <div>page</div>;
}

export default page;
