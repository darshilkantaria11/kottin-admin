// /app/api/positions/route.js
import { dbConnect } from '../../utils/mongoose';
import Position from '../../models/position';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await dbConnect();
        const positions = await Position.find(); // Fetch all positions from the database
        return NextResponse.json(positions, { status: 200 });
    } catch (error) {
        console.error('Error:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
