"use client";
import Image from "next/image";
import { Spinner } from "@nextui-org/react";
import Topbar from "@/components/topbar";
import Hero from "@/components/hero";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function Home() {
  const [mongodbUser, setData] = useState<any>("nothing");
  const { data: session, status } = useSession();
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
    console.log(session?.user);
    setData({
      data: { username: session?.user?.name, email: session?.user?.email },
    });
    getUserDetails();
  }, [session]);
  return (
    <>
      <Hero userData={mongodbUser} />
    </>
  );
}
