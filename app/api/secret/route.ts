import { connect } from "@/database/db-config";
import Secret from "@/database/model/secret-model";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, username, secret } = reqBody;
    const newSecret = new Secret({
      username: username,
      email: email,
      secret: secret,
      isPublic: true,
    });
    const savedSecret = await newSecret.save();
    return NextResponse.json({
      message: "Secret created successfully",
      success: true,
      savedSecret,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    let x: any = req.url;
    const url: any = new URL(x);
    const id: any = url.searchParams.get("id");
    const secret = await Secret.findOne({ _id: id });
    const result = await Secret.updateOne(
      { _id: id },
      { $set: { isPublic: false } }
    );
    return NextResponse.json({
      message: "Secret found",
      data: secret,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
