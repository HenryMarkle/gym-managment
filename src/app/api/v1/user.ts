'use server';

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { AddUserParams, Announcement, Permission, User } from '../v1/types';
import { cookies } from "next/headers";


/**
 * creates a new user for the system
 *
 * @returns a new user ID when operation is successful
 * @returns 'duplicate' if another user has the same email
 * @returns 'error' when an error occurs
 */
export async function addUser(
  user: AddUserParams
): Promise<number | "duplicate" | "error"> {
  const client = new PrismaClient();

  try {
    await client.$connect();

    // Check if user already exists

    if (await client.user.count({ where: { email: user.email } }))
      return "duplicate";

    const hashed = await bcrypt.hash(user.password, 10);

    const result = await client.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashed,
        age: user.age,
        gender: user.gender,
        salary: user.salary,
        startDate: user.startDate,
        permission: user.permission === Permission.Admin ? 0 : 1,
      },
    });

    return result.id;
  } catch (e) {
    console.log(e);
    return "error";
  } finally {
    await client.$disconnect();
  }
}

export async function getCurrentUserId(): Promise<number | 'noSession' | 'notFound' | 'error'> {
  const client = new PrismaClient();

  try {
    await client.$connect();
    const session = cookies().get('session');
    if (!session) return 'noSession';
    const result = await client.user.findUnique({ where: { session: session.value }, select: { id: true } });
    if ((!result)) return 'notFound';
    return result.id;
  } catch (e) {
    console.log(e);
    return 'error';
  } finally {
    await client.$disconnect();
  }
}


/**
 *
 * @returns true if operation is successful
 * @returns false if operation fails
 */
export async function updateUser(user: User): Promise<Boolean> {
  const client = new PrismaClient();

  await client.$connect();

  try {
    await client.user.update({ where: { email: user.email }, data: user });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  } finally {
    await client.$disconnect();
  }
}

/**
 *
 * @returns true if operation is successful
 * @returns false if operation fails
 */
export async function deleteUser(email: string): Promise<Boolean> {
  const client = new PrismaClient();

  await client.$connect();

  try {
    await client.user.delete({ where: { email } });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  } finally {
    await client.$disconnect();
  }
}

/**
 *
 * @returns a User object if the user is found
 * @returns null if no user with the given email was found
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  const client = new PrismaClient();

  await client.$connect();

  try {
    const result = await client.user.findUnique({ where: { email } });
    return result;
  } catch (e) {
    console.log(e);
    return null;
  } finally {
    await client.$disconnect();
  }
}

/**
 * @returns a list of all users
 * @returns null if an error occurs
 */
export async function getAllUsers(): Promise<User[] | null> {
  const client = new PrismaClient();

  await client.$connect();

  try {
    const result = await client.user.findMany({});
    return result;
  } catch (e) {
    console.log(e);
    return null;
  } finally {
    await client.$disconnect();
  }
}

export async function getAllAnnouncments(): Promise<Announcement[] | null> {
  const client = new PrismaClient();

  try {
    await client.$connect();
    const results = await client.message.findMany({  });
    return results.map(a => {return { sent: a.sent.toISOString(), id: a.id, text: a.text }; });
  } catch (e) {
    console.log(e);
    return null;
  } finally {
    await client.$disconnect();
  }
}

export async function createAnnouncement(
  text: string,
  toUsers: number[]
): Promise<number | null> {
  const client = new PrismaClient();

  await client.$connect();

  try {
    const result = await client.message.create({
      data: {
        text,
        readStatus: {
          create: toUsers.map((u) => {
            return { userId: u, read: false };
          }),
        },
      },
    });
    return result.id;
  } catch (e) {
    console.log(e);
    return null;
  } finally {
    await client.$disconnect();
  }
}

export async function markAsRead(
  messageId: number,
  userId: number
): Promise<"success" | "messageNotFound" | "userNotFound" | "error"> {
  const client = new PrismaClient();

  try {
    await client.$connect();

    const user = await client.user.findUnique({ where: { id: userId } });
    const message = await client.message.findUnique({
      where: { id: messageId },
      include: { readStatus: true },
    });

    if (!user) return "userNotFound";
    if (!message) return "messageNotFound";

    const foundUser = message.readStatus.find((s) => s.userId === user.id);

    if (!foundUser) return "error";

    await client.messageRead.update({
      where: { id: foundUser.id },
      data: { read: true },
    });

    return "success";
  } catch (e) {
    console.log(e);
    return "error";
  } finally {
    await client.$disconnect();
  }
}
