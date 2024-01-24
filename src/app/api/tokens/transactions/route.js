import { NextResponse } from 'next/server'
import Transaction from '@/models/Transaction'
import connectDB from '@/lib/connect'
import { randomBytes as rB } from 'crypto'

export const GET = async () => {
    try {
        await connectDB();
        const transactions = await Transaction.find({});
        if (transactions.length === 0) {
            return NextResponse.json({
                "status": "error",
                "message": "No transactions found"
            });
        }
        return NextResponse.json(transactions, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            "status": "error",
            "message": error.message
        });
    }
}

export const POST = async ({ body }) => {
    try {
      let bodyText = '';
      for await (const chunk of body) {
        bodyText += chunk;
      }
      console.log(bodyText);
      const { transAmount, transType, transTitleHolder, transStatus } = JSON.parse(bodyText);
      if ( !transAmount || !transType || !transTitleHolder || !transStatus ) {
        return NextResponse.json({
          "status": "error",
          "error": "Please provide all fields"
        }, { status: 400 })
      }
      await connectDB();
      const transaction = new Transaction({
        transId: rB(12).toString('hex'),
        transAmount,
        transTitleHolder,
        transType,
        transStatus
      });
      await transaction.save();
      return NextResponse.json({
        "status": "success",
        "message": "Transaction created successfully",
        transaction
      }, { status: 201 })
    } catch (error) {
      console.error(error);
      return NextResponse.json({
        "status": "error",
        "error": error.message
      }, { status: 500 })
    }
  }