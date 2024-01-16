import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { MailIcon } from "lucide-react";
import React from "react";

function Page() {
  return (
    <div className="max-w-xl h-screen my-auto flex items-center justify-center  mx-auto px-4">
      <Card className="w-full">
        <CardBody>
          <h1 className="text-xl font-bold mb-4">Forgot password</h1>

          <div className="my-2">
            <Input
              type="email"
              placeholder="you@example.com"
              labelPlacement="outside"
              startContent={
                <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
            />
          </div>

          <div className="my-2">
            <Button className="w-full" color="primary">
              Send Mail
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Page;
