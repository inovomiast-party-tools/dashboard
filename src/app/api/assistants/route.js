import { NextResponse } from "next/server";
import connectDB from "@/lib/connect";
import Assistant from "@/models/Assistant";
import { v4 as uuid4 } from "uuid";

export const GET = async () => {
  try {
    await connectDB();
    const assistants = await Assistant.find({});
    return NextResponse.json(assistants, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error);
  }
};

export const POST = async ({ body }) => {
  try {
    let bodyText = '';
    for await (const chunk of body) {
      bodyText += chunk;
    }
    console.log(bodyText);
    const { assistantName, assistantPhone } = JSON.parse(bodyText);
    if ( !assistantName || !assistantPhone ) {
      return NextResponse.json({
        "status": "error",
        "error": "Please provide all fields"
      }, { status: 400 })
    }
    await connectDB();
    const assistant = new Assistant({
      assistantId: uuid4(),
      assistantName,
      assistantPhone,
      assistantAssistance: false
    });
    await assistant.save();
    return NextResponse.json({
      "status": "success",
      "message": "Assistant created successfully",
      assistant
    }, { status: 201 })
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      "status": "error",
      "error": error.message
    }, { status: 500 })
  }
}