'use server';

import { cookies } from 'next/headers';
import bcrypt from 'bcrypt';
import { randomUUID } from "crypto";
import { SMTPClient } from 'emailjs';
import 'dotenv/config';
import { generate } from 'generate-password';
import { Permission } from './types';
import client from "./client";


/**
/// Returns true when signin is successful.
/// Returns false otherwise
*/
export async function doSignin(email: string, password: string): Promise<boolean> {
    await client.$connect();
    
    try {
        const found = await client.user.findUnique({ where: { email } });

        if (!found) return false;

        const result = await bcrypt.compare(password, found.password);

        if (!result) return false;

        const session = randomUUID();

        await client.user.update({ where: {email }, data: { session, lastLogin: new Date() } });

        cookies().set({
            name: 'session',
            value: session,
            httpOnly: true,
            path: '/',
            sameSite: 'strict',
            secure: true
        });

        return true;
    }
    catch (e) {
        console.log(e);
        return false;
    }
    finally {
        await client.$disconnect();
    }
}

/**
 * returns true if email was found and signed out
 * return false if email was not found
 * returns 'error' if error occured
 */
export async function doSignout(email: string): Promise<boolean | 'error'> {
    await client.$connect();
    
    try {
        if (!await client.user.count({ where: { email } })) return false;

        await client.user.update({ where: { email }, data: { session: randomUUID().toString() } });

        return true;
    }
    catch (e) {
        console.log(e);
        return 'error';
    }
    finally {
        await client.$disconnect();
    }
}

export async function changePassword(oldPassword: string, newPassword: string): Promise<Boolean | 'unauthorized'> {
    await client.$connect();
    
    try {
        const cookieData = cookies().get('session');
        if (!cookieData) return 'unauthorized';
        const manager = await client.user.findUnique({ where: { session: cookieData.value } });
        if (!manager) return 'unauthorized';

        const userPassword = await client.user.findUnique({ where: { id: manager.id }, select: { password: true } });

        if (!userPassword) return false;

        if (!bcrypt.compare(oldPassword, userPassword.password)) return false;

        const hashed = await bcrypt.hash(newPassword, 10);

        await client.user.update({ where: { id: manager.id }, data: { password: hashed } });

        return true;
    }
    catch (e) {
        console.log(e);
        return false;
    }
    finally {
        await client.$disconnect();
    }
}

/**
 * 
 * @param email email address
 * 
 * returns true if email was found and a password reset mail was sent
 * return false if email not found
 * returns 'error' if an error occurred
 */
export async function resetPasswaord(email: string): Promise<boolean | 'error'> {
    try {
        await client.$connect();
        if (!await client.user.count({ where: {email } })) return false;

        const newPassword = generate({
            length: 10,
            numbers: true,
            lowercase: true,
        });

        await client.user.update({ where: { email }, data: { password: await bcrypt.hash(newPassword, 10) } });

        const smtpClient = new SMTPClient({
            user: process.env.EMAIL_JS_USER,
            password: process.env.EMAIL_JS_PASSWORD,
            host: process.env.EMAIL_JS_HOST,
            ssl: true
        });

        await smtpClient.sendAsync({
            text: newPassword,
            from: process.env.EMAIL_JS_HOST || '',
            to: email,
            subject: 'Password Reset'
        });

        return true;
    }
    catch (e) {
        console.log(e);
        return 'error';
    }
    finally {
        await client.$disconnect();
    }
}

export async function signup(email: string, password: string, age: number, salary: number, gender: string, name?: string): Promise<'success' | 'duplicate' | 'error'> {
    try {

        await client.$connect();

        if (await client.user.count({ where: { email } })) return 'duplicate';

        const hashed = await bcrypt.hash(password, 10);

        await client.user.create({ data: {
            email,
            password: hashed,
            name,
            age,
            gender,
            salary,
            permission: Permission.Employee,
        }});

        return 'success';
    } catch (e) {
        console.log(e);
        return 'error';
    } finally {
        await client.$disconnect();
    }
}
