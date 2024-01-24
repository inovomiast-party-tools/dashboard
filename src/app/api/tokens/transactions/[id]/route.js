import { NextResponse } from 'next/server'
import Transaction from '@/models/Transaction'
import connectDB from '@/lib/connect'

export const GET = async ({ params }) => {
    try {
        const { id } = params;
        await connectDB();
        const transaction = await Transaction.find({ transId: id });
        if (transactions.length === 0 || transactions === null) {
            return NextResponse.json({
                "status": "error",
                "message": "No transactions found"
            });
        }
        return NextResponse.json(transaction, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            "status": "error",
            "message": error.message
        });
    }
}