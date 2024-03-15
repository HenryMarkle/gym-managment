'use server'

import { cookies } from "next/headers";
import client from "./client";

type Trainer = {
    id: number;
    job: string;
    name: string;
    description: string;
    instagram: string;
    facebook: string;
    twitter: string;
};

async function getAuthState() {
    const sc = cookies().get("session");
  
    if (!sc) return null;
  
    const user = await client.user.findUnique({ where: { session: sc.value } });
  
    return user;
}

export async function getTrainers(): Promise<Trainer[] | 'error'> {
    try {
        client.$connect();

        return await client.trainer.findMany({});
    } catch (e) {
        console.log('getTrainers(): '+e);
        return 'error';
    } finally {
        client.$disconnect();
    }
}

export async function createTrainer(data: Trainer): Promise<'unauthorized' | 'error' | number> {
    try {
        client.$connect();

        if (!getAuthState) return 'unauthorized';

        const created = await client.trainer.create({ data });

        return created.id;
    } catch (e) {
        console.log('createTrainer(): '+e);
        return 'error';
    } finally { client.$disconnect(); }
}

export async function replaceTrainerById(id: number, data: Trainer): Promise<'unauthorized' | 'error' | undefined> {
    try {
        if (!getAuthState()) return 'unauthorized';

        await client.$connect();

        await client.trainer.update({ where: { id }, data });

        return;
    } catch (e) {
        console.log('replaceTrainerById(): '+e);
        return 'error';
    } finally { client.$disconnect(); }
}

export async function deleteTrainerbyId(id: number): Promise<'unauthorized' | 'error' | undefined> {
    try {
        if (!getAuthState()) return 'unauthorized';

        await client.$connect();
        await client.trainer.delete({ where: { id } });

        return;
    } catch (e) {
        console.log('deleteTrainerById(): '+e);
        return 'error';
    } finally { client.$disconnect(); }
}
