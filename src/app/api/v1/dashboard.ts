'use server';

import { readFile, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from 'path';
import client from './client';
import { cookies } from "next/headers";

async function importJSON(): Promise<Dashboard> {
    const content = await readFile(path.join(process.cwd(), "dashboard.json"));
    
    return JSON.parse(content.toString('utf-8')) satisfies Dashboard;
}

async function exportJSON(dashboard: Dashboard) {
    await writeFile(path.join(process.cwd(), "dashboard.json"), JSON.stringify(dashboard));
}

type Plan = {
    title: string;
    description: string;
    price: number;
}

type Product = {
    name: string;
    description: string;
    price: number;
    marka: string;
}

type Contacts =  {
    email: string;
    facebook: string;
    whatsapp: string;
    instagram: string;
    twitter: string;
}

type Dashboard = {
    gymTitle: string;
    starterSentence: string;
    plans: { [key: string]: Plan };
    adsOnImageBoldText: string;
    adsOnImageDescription: string;
    products: { [key: string]: Product };
    contacts: Contacts
}

export async function getHomeGeneralInfo(): Promise<{ title: string, sentence: string } | 'error' | 'unauthorized'> {
    try {
        await client.$connect();

        const d = await importJSON();

        return { title: d.gymTitle, sentence: d.starterSentence };

    } catch (e) {
        console.log('failed to fetch dashboard general info: '+e);
        return 'error';
    } finally {
        await client.$disconnect();
    }
}

export async function getHomeInfo(): Promise<Dashboard | 'error' | 'unauthorized'> {
    try {
        await client.$connect();

        return await importJSON();

    } catch (e) {
        console.log('failed to fetch dashboard general info: '+e);
        return 'error';
    } finally {
        await client.$disconnect();
    }
}

export async function updateHomeGeneralInfo({ title, starter, description}: { title: string | null, starter: string | null, description: string | null }): Promise<boolean | 'error' | 'unauthorized'> {
    try {
        await client.$connect();

        const sc = cookies().get('session');
        if (!sc) {
            console.log('unauthorized')
            return 'unauthorized';
        }
        if (!await client.user.count({ where: { session: sc.value } })) {
            console.log('unauthorized')
            return 'unauthorized';
        }

    } catch (e) {
        console.log('failed to fetch user auth status: '+e);
        return 'error';
    } finally {
        client.$disconnect();
    }

    //

    try { 
        
        const dashboard = await importJSON();

        dashboard.gymTitle = title ?? dashboard.gymTitle;
        dashboard.starterSentence = starter ?? dashboard.starterSentence;

        await exportJSON(dashboard);
    } catch (e) {
        console.log("failed to update dashboard data: "+e);
        return 'error';
    }


    console.log('Dashboard home general info successfully updated')
    return true;
}

export async function getHomePlans(): Promise<Plan[] | 'unauthorized' | 'error'> {
    try {
        const d = await importJSON();

        return Object.values(d.plans);
    } catch (e) {
        console.log('failed to fetch plans: '+e);
        return 'error';
    } finally {
    }
}

export async function addPlanForm(formData: FormData) {
    try {
        await client.$connect();

        const sc = cookies().get('session');
        if (!sc) return;
        if (!await client.user.count({ where: { session: sc.value } })) return;
    } catch (e) {
        console.log('failed to add a plan: '+e);
        return 'error';
    } finally {
        await client.$disconnect();
    }

    const title: string | null = formData.get('plan-title') as unknown as string;
    const description: string | null = formData.get('plan-description') as unknown as string;
    const price: number | null = formData.get('plan-price') as unknown as number;

    if (!title || !description || !price) {
        console.log('failed to add a plan: invalid data');
        return;
    }

    const plan: Plan = {
        title, description, price
    };

    try {
        const d = await importJSON();
        d.plans[title] = plan;
        await exportJSON(d);
    } catch (e) {
        console.log('failed to add a plan: '+e);
    }
}

export async function addPlan(plan: Plan): Promise<'success' | 'unauthorized' | 'error'> {
    try {
        await client.$connect();

        const sc = cookies().get('session');
        if (!sc) return 'unauthorized';
        if (!await client.user.count({ where: { session: sc.value } })) return 'unauthorized';
    } catch (e) {
        console.log('failed to add a plan: '+e);
        return 'error';
    } finally {
        await client.$disconnect();
    }

    try {
        const d = await importJSON();
        d.plans[plan.title] = plan;
        await exportJSON(d);
        return 'success'
    } catch (e) {
        console.log('failed to add a plan: '+e);
        return 'error';
    }
}

export async function deletePlan(name: string): Promise<boolean | 'unauthorized' | 'error'> {
    try {
        await client.$connect();

        const sc = cookies().get('session');
        if (!sc) return 'unauthorized';
        if (!await client.user.count({ where: { session: sc.value } })) return 'unauthorized';

        const d = await importJSON();

        (d.plans[name] as Plan | undefined) = undefined;

        await exportJSON(d);

        return true;
    } catch (e) {
        console.log('failed to delete a plan: '+e);
        return 'error';
    } finally {
        await client.$disconnect();
    }

}

export async function getAdsInfo(): Promise<{ title: string, description: string } | 'unauthorized' | 'error'> {
    try {
        const d = await importJSON();


        return { title: d.adsOnImageBoldText, description: d.adsOnImageDescription };
    } catch (e) {
        console.log('failed to get ads info: '+e);
        return 'error';
    } finally {
    }
}

export async function updateAdsInfo(data: { title: string, description: string }): Promise<'success' | 'unauthorized' | 'error'> {
    try {
        await client.$connect();

        const sc = cookies().get('session');
        if (!sc) return 'unauthorized';
        if (!await client.user.count({ where: { session: sc.value } })) return 'unauthorized';

        const d = await importJSON();

        d.adsOnImageBoldText = data.title;
        d.adsOnImageDescription = data.description;

        await exportJSON(d);

        return 'success';
    } catch (e) {
        console.log('failed to update ads info: '+e);
        return 'error';
    } finally {
        await client.$disconnect();
    }
}

export async function getHomeProducts(): Promise<Product[] | 'unauthorized' | 'error'> {
    try {
        const d = await importJSON();

        return Object.values(d.products);
    } catch (e) {
        console.log('failed to get a product: '+e);
        return 'error';
    } finally {
    }
}

export async function addHomeProduct(product: Product): Promise<'success' | 'unauthorized' | 'error'> {
    try {
        await client.$connect();

        const sc = cookies().get('session');
        if (!sc) return 'unauthorized';
        if (!await client.user.count({ where: { session: sc.value } })) return 'unauthorized';

        const d = await importJSON();

        d.products[product.name] = product

        await exportJSON(d);

        return 'success';
    } catch (e) {
        console.log('failed to add a product: '+e);
        return 'error';
    } finally {
        await client.$disconnect();
    }
}

export async function deleteHomeProduct(name: string): Promise<'success' | 'unauthorized' | 'error'> {
    try {
        await client.$connect();

        const sc = cookies().get('session');
        if (!sc) return 'unauthorized';
        if (!await client.user.count({ where: { session: sc.value } })) return 'unauthorized';

        const d = await importJSON();

        (d.products[name] as Product | undefined) = undefined

        await exportJSON(d);

        return 'success';
    } catch (e) {
        console.log('failed to delete home products: '+e);
        return 'error';
    } finally {
        await client.$disconnect();
    }
}

export async function getContacts(): Promise<Contacts | 'unauthorized' | 'error'> {
    try {

        const d = await importJSON();

        return d.contacts;
    } catch (e) {
        console.log('failed to get contacts: '+e);
        return 'error';
    } finally {
    }
}

export async function updateContacts(contacts: Contacts): Promise<"success" | "unauthorized" | "error"> {
    try {
        await client.$connect();

        const sc = cookies().get('session');
        if (!sc) return 'unauthorized';
        if (!await client.user.count({ where: { session: sc.value } })) return 'unauthorized';

        const d = await importJSON();

        d.contacts = contacts;

        await exportJSON(d);

        return 'success';
    } catch (e) {
        console.log('failed to update contacts: '+e);
        return 'error';
    } finally {
        await client.$disconnect();
    }
}
