import { NextResponse  } from "next/server";
import config from '../config/config.json';
import fs from 'fs';


export async function GET() {
    return NextResponse.json({ ...config });
}

export async function POST(request) {
    const body = await request.json();

    const newConfig = {
        ...config,
        currentPosition: body.nextPosition,
    }

    fs.writeFile(process.cwd() + '/src/app/config/config.json', JSON.stringify(newConfig, null, 2), (err) => {
        if (err) {
            return NextResponse.json({
                message: 'config update failed',
            });
        }
    });

    return NextResponse.json({
        message: 'config update success',
        config: newConfig,
    });
}