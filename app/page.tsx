"use client";
import Image from "next/image";
import { Spinner } from "@nextui-org/react";
import Topbar from "@/components/topbar";
import Hero from "@/components/hero";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState("nothing");
  const [loading, setLoading] = useState(true);
  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data.data);
      setData(res.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <>
      
      <Hero userData={data} />
    </>
  );
}
