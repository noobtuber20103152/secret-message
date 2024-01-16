"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { EyeIcon, EyeOffIcon, MailIcon, UserIcon } from "lucide-react";
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      if (response.status === 200) {
        toast.success("Logged in successfully!!");
        router.push("/");
      }
    } catch (error: any) {
      toast.error("email or password are incorrect!!");
      console.log("Login failed", error.message);
    } finally {
      setLoading(false);
    }
  };
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <div className="max-w-xl h-screen my-auto flex items-center justify-center  mx-auto px-4">
      <Card className="w-full">
        <CardBody>
          <h1 className="text-xl font-bold mb-4">Log In Your Account</h1>

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
            <Button onClick={onLogin} className="w-full" color="primary">
              Log In
            </Button>
            <p className="text-center mt-2">
              Don&apos;t have an account{" "}
              <Link href="/signup">
                <span className="text-blue-600">Sign up</span>
              </Link>{" "}
              here
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
