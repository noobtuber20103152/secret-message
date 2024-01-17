"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button, Card, CardBody, Input, Spinner } from "@nextui-org/react";
import { EyeIcon, EyeOffIcon, MailIcon, UserIcon } from "lucide-react";
import toast from "react-hot-toast";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const onSignup = async () => {
    console.log(user);
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log(response.status);
      if (response.status == 200) {
        toast.success("Account created successfully, Please login!");
        router.push("/");
      } else {
        toast.error("username or email already taken!!");
      }
    } catch (error: any) {
      toast.error("username or email already taken!!");
      console.log("Signup failed", error.message);
    } finally {
      setLoading(false);
    }
  };
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="max-w-xl h-screen my-auto flex items-center justify-center  mx-auto px-4">
      <Card className="w-full">
        <CardBody>
          <h1 className="text-xl font-bold mb-4">Sign Up Your Account</h1>
          <div className="my-2">
            <Input
              type="email"
              placeholder="username"
              labelPlacement="outside"
              onChange={(e: any) => {
                setUser({ ...user, username: e.target.value });
              }}
              startContent={
                <UserIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
            />
          </div>
          <div className="my-2">
            <Input
              onChange={(e: any) => {
                setUser({ ...user, email: e.target.value });
              }}
              type="email"
              placeholder="you@example.com"
              labelPlacement="outside"
              startContent={
                <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
            />
          </div>
          <div className="my-2">
            <Input
              placeholder="password"
              labelPlacement="outside"
              onChange={(e: any) => {
                setUser({ ...user, password: e.target.value });
              }}
              startContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeIcon className="text-xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeOffIcon className="text-xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              className="w-full"
            />
          </div>

          <div className="my-2">
            {loading ? (
              <div className="flex itece justify-center">
                <Spinner />
              </div>
            ) : (
              <Button onClick={onSignup} className="w-full" color="primary">
                Sign Up
              </Button>
            )}
            <p className="text-center mt-2">
              Already have an account{" "}
              <Link href="/login">
                <span className="text-blue-600">Login</span>
              </Link>{" "}
              here
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
