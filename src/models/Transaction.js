import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
    transId: {
        type: String,
        required: true,
        unique: true
    },
    transAmount: {
        type: Number,
        required: true
    },
    transType: {
        type: String
    },
    transTitleHolder: {
        type: String,
        required: true,
    },
    transStatus: {
        type: String
    }
});

const Transaction = mongoose.models.transaction || mongoose.model('transaction', TransactionSchema);

export default Transaction;