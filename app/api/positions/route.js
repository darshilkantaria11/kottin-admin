import { dbConnect } from '../../utils/mongoose';
import Position from '../../models/position';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await dbConnect();
        console.log("Fetching positions from MongoDB...");
        const positions = await Position.find(); // Fetch all positions from the database
        console.log(`Found ${positions.length} positions.`);
        
        return NextResponse.json(positions, {
            headers: {
                // Prevent caching and revalidate on every request
                'Cache-Control': 'public, max-age=0, must-revalidate, stale-while-revalidate=60'
            }
        });
    } catch (error) {
        console.error('Error:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
