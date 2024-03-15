import { cookies } from "next/headers";
import client from "./client";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

async function getAuthState() {
    const sc = cookies().get("session");
  
    if (!sc) return null;
  
    const user = await client.user.findUnique({ where: { session: sc.value } });
  
    return user;
}

const reminderPath = path.join(process.cwd(), "reminder.json");

async function loadJSON(): Promise<string> {
    if (!existsSync(reminderPath)) await writeFile(reminderPath, '{}');
    const text = await readFile(reminderPath);
    return JSON.parse(text.toString());
}

async function writeJSON(obj: object) {
    await writeFile(reminderPath, JSON.stringify(obj))
}

export async function setSubOverReminder(userIds: number[], durationLeftinDays: number): Promise<'unauthorized' | 'error' | undefined> {
    try {
        if (!(await getAuthState())) return 'unauthorized';
        

    } catch (e) {
        console.log('setSubOverReminder(): '+e);
        return 'error';
    }
}