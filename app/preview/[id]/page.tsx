"use client";
import { Button, Spinner } from "@nextui-org/react";
import axios from "axios";
import { AlertOctagon } from "lucide-react";
import React, { useState } from "react";

function Page({ params }: any) {
  const [loading, setLoading] = useState(false);
  const { id } = params;
  const [isRevealSecret, setIsRevealSecret] = useState(false);
  const [error, setError] = useState(false);
  const [secretData, setSecretData] = useState<any>();
  const revealSecret = async () => {
    try {
      setLoading(true);
      let { data } = await axios.get(`/api/secret?id=${id}`);
      setSecretData(data?.data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
      setIsRevealSecret(true);
    }
  };
  return (
    <>
      <div className="max-w-4xl px-2 mx-auto  py-6 md:py-20">
        <h1 className="md:text-6xl text-3xl text-pink-500 font-bold">
          Preview secret
        </h1>
        <p className="text-4xl mt-4">You received a secret.</p>
        <div className="my-6 border dark:bg-black bg-gray-100 rounded-sm py-10 px-4">
          {isRevealSecret ? (
            <div>
              {secretData?.isPublic ? (
                <div>
                  <p className="text-black">{secretData.secret}</p>
                </div>
              ) : (
                <div>
                  <p className="px-4 py-4 text-sm bg-red-400 text-black flex items-center">
                    <span className="mr-2">
                      <AlertOctagon />
                    </span>
                    Secret not found - This usually means the secret link has
                    already been visited and therefore no longer exists.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div>
              {!loading ? (
                <Button
                  onClick={revealSecret}
                  radius="none"
                  color="primary"
                  className=" w-full"
                >
                  Reveal Secret
                </Button>
              ) : (
                <div className="w-full justify-center flex items-center">
                  <Spinner />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Page;
