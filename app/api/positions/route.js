import { dbConnect } from '../../utils/mongoose';
import Position from '../../models/position';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await dbConnect();
        const positions = await Position.find(); // Fetch all positions from the database
        const response = NextResponse.json(positions, { status: 200 });

        // Set headers to prevent caching
        response.headers.set('Cache-Control', 'no-store'); // Prevent caching
        response.headers.set('Pragma', 'no-cache'); // HTTP 1.0
        response.headers.set('Expires', '0'); // Proxies

        return response;
    } catch (error) {
        console.error('Error:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
