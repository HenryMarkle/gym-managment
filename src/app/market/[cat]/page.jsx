"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { getProductsOfCategory } from '../../api/v1/dashboard';

function page({}) {
  const params = useParams();
  
  const [ products, setProducts ] = useState([]);
  
  useEffect(() => {
    console.log(params);
    getProductsOfCategory(params.cat ?? '').then(c => {
      if (c === 'error') {}
      else setProducts(c);

      console.log(c);
    });
  }, []);
  return <div>page</div>;
}

export default page;
