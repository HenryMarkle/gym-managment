'use server';

import { writeFile } from "fs/promises";
import { cookies } from "next/headers";
import path from "path";
import client from "../client";

export const POST = async (req: Request) => {
    try {
        await client.$connect();

        const sc = cookies().get('session');
        if (!sc) return new Response(null, { status: 401 });
        if (!await client.user.count({ where: { session: sc.value } })) return new Response(null, { status: 401 });
    } catch (e) {
        console.log(e);

        return new Response(null, { status: 500 });
    } finally {
        await client.$disconnect();
    }
    
    const blob = await req.blob();

    const a = await blob.arrayBuffer();

    await writeFile(path.join(process.cwd(), "/images/ads_image.png"), Buffer.from(a));

    return new Response(null, { status: 200 });
}