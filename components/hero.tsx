"use client";
import { Button, Card, CardBody, Spinner, Textarea } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Snippet } from "@nextui-org/react";
function Hero({ userData }: any) {
  const [loading, setLoading] = useState(false);
  const [createdSecret, setCreatedSecret] = useState(false);
  const [secretUrl, setSecretUrl] = useState("");
  const [secretMessage, setSecretMessage] = useState();
  const [baseURL, setBaseURL] = useState("");
  useEffect(() => {
    const host = window.location.host;
    const base = `https://${host}`;
    setBaseURL(base);
  }, []);
  const create = async () => {
    if (!userData.data) {
      toast.error("Please login!!");
      return;
    }
    if (!secretMessage) {
      toast.error("Please enter some secret message!!");
      return;
    }
    try {
      setLoading(true);
      let { data } = await axios.post("/api/secret", {
        secret: secretMessage,
        email: userData.data.email,
        username: userData.data.username,
      });
      setSecretUrl(baseURL + `/preview/${data.savedSecret._id}`);
      setCreatedSecret(true);
      toast.success("Secret created");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-4xl px-2 mx-auto mt-20 md:mt-40  py-6 md:py-20">
      <h1 className="md:text-6xl text-6xl text-pink-500 font-bold">
        Share a secret
      </h1>
      <p className="text-4xl mt-4">
        …with a link that only works one time and then self-destructs.
      </p>
      {createdSecret ? (
        <div className="py-5 mt-10">
          <Snippet className="w-full">{secretUrl}</Snippet>
        </div>
      ) : (
        <div>
          <div className="my-6 ">
            <Textarea
              onChange={(e: any) => {
                setSecretMessage(e.target.value);
              }}
              labelPlacement="outside"
              placeholder="Enter your secret"
              className="w-full "
              size="lg"
            />
          </div>
          <div className="mt-6">
            {!loading ? (
              <Button onClick={create} className="w-full uppercase">
                Create secret link
              </Button>
            ) : (
              <div>
                <Spinner />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Hero;
