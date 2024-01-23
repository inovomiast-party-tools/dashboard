import { NextResponse } from "next/server";
import connectDB from "@/lib/connect";
import Assistant from "@/models/Assistant";

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
    let bodyText = "";
    for await (const chunk of body) {
      bodyText += chunk;
    }
    console.log("Original bodyText:", bodyText);

    // Check if bodyText is an array of character codes
    if (bodyText.startsWith("[") && bodyText.endsWith("]")) {
      // Convert the string of character codes to an actual string
      const charCodes = JSON.parse(bodyText);
      bodyText = String.fromCharCode(...charCodes);
    }

    console.log("Converted bodyText:", bodyText);

    // Remove a whitespace character at position 3 if it exists
    if (bodyText.charAt(2) === ' ') {
      bodyText = bodyText.slice(0, 2) + bodyText.slice(3);
    }

    console.log("Processed bodyText:", bodyText);

    const { assistantId, assistantName, assistantPhone } = JSON.parse(bodyText);

    // Uncomment the following lines if you want to enforce field presence
    // if (!assistantId || !assistantName || !assistantPhone) {
    //   return NextResponse.json({
    //     "status": "error",
    //     "error": "Please provide all fields"
    //   }, { status: 400 });
    // }

    await connectDB();
    const assistant = new Assistant({
      assistantId: assistantId,
      assistantName: assistantName,
      assistantPhone: assistantPhone,
      assistantAssistance: false,
    });
    await assistant.save();
    return NextResponse.json(
      {
        status: "success",
        message: "Assistant created successfully",
        assistant,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: "error",
        error: error.message,
      },
      { status: 500 }
    );
  }
};