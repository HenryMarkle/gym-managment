'use server';

import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

export async function getAllEvents(): Promise<{
    id: number;
    event: string;
    target: string;
    actorId: number;
    date: string;
}[] | 'error' | 'unauthorized'> {
    const client = new PrismaClient();

  try {
    await client.$connect();
    // const c = cookies().get('session');
    // if (!c) return 'unauthorized';
    // const manager = await client.user.findUnique({ where: { session: c.value } });
    // if (!manager) return 'unauthorized';

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