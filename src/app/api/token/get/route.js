import Auth from '@/lib/auth';
import { NextResponse } from 'next/server';

export const GET = () => {
    const token = Auth.generateToken();
    return NextResponse.json({ token: token});
}