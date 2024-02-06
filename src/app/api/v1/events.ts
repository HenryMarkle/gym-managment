'use server';

import { cookies } from "next/headers";
import client
 from "./client";
export async function getAllEvents(): Promise<{
    id: number;
    event: string;
    target: string;
    actorId: number;
    date: string;
}[] | 'error' | 'unauthorized'> {
  try {
    await client.$connect();
    const sc = cookies().get('session');

    if (!sc) return 'unauthorized';

    const user = await client.user.findUnique({ where: { session: sc.value } });

    if (!user) return 'unauthorized';

    const results = await client.event.findMany({});

    return results.map(e => {
        return { ...e, date: e.date.toISOString() }
    });
  } catch (e) {
    console.log(e);
    return 'error';
  } finally {
    await client.$disconnect();
  }
}