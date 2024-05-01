'use server';

import { cookies } from "next/headers";
import client from "./client";


async function getAuthState() {
  const sc = cookies().get("session");

  if (!sc) return null;

  const user = await client.user.findUnique({ where: { session: sc.value } });

  return user;
}

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

export async function didManagerSeeEvent(eventId: number): Promise<boolean | "unauthorized" | 'error'> {
  try {
    await client.$connect();
    
    const manager = await getAuthState();

    if (!manager) return 'unauthorized';

    const eventSeen = await client.seenEvent.findFirst({ where: { id: eventId, userId: manager.id } });

    return eventSeen !== null;
  } catch (e) {
    console.log(`didManagerSeeEvent(): ${e}`);
    return 'error';
  } finally {
    await client.$disconnect();
  }
}

export async function markEventAsSeen(eventId: number): Promise<undefined | "unauthorized" | "error"> {
  try {
    await client.$connect();
    
    const manager = await getAuthState();

    if (!manager) return 'unauthorized';

    await client.seenEvent.create({ data: { eventId, userId: manager.id } });

  } catch (e) {
    console.log(`markEventAsSeen(): ${e}`);
    return 'error';
  } finally {
    await client.$disconnect();
  }
}

export async function markAllEventsAsSeen(): Promise<undefined | 'unauthorized' | 'error'> {
  try {
    await client.$connect();
    
    const manager = await getAuthState();

    if (!manager) return 'unauthorized';

    const allEventIds = await client.event.findMany({ select: { id: true } });

    for (const id of allEventIds) {
      if (await client.seenEvent.count({ where: { eventId: id.id } })) continue;

      await client.seenEvent.create({ data: { eventId: id.id, userId: manager.id } });
    }

  } catch (e) {
    console.log(`markAllEventsAsSeen(): ${e}`);
    return 'error';
  } finally {
    await client.$disconnect();
  }
}