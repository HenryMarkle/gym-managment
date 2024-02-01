'use server';

import bcrypt from "bcrypt";
import { AddUserParams, Announcement, Permission, User, SafeUser } from '../v1/types';
import { cookies } from "next/headers";
import client from './client';


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

export async function changeUserName(id: number, newName: string) {
  await client.$connect();

  try {
    await client.user.update({ where: { id }, data: { name: newName } });
  } catch (e) {
    console.log(e);
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

export async function countUsers(): Promise<number | 'error'> {
  await client.$connect();

  try {
    const result = await client.user.count({ where: { deletedAt: { not: null } } });
    return result;
  } catch (e) {
    console.log(e);
    return 'error';
  } finally {
    await client.$disconnect();
  }
}

/**
 *
 * @returns a User object if the user is found
 * @returns null if no user with the given email was found
 */
export async function getUserByEmail(email: string): Promise<SafeUser | null> {
  await client.$connect();

  try {
    const result = await client.user.findUnique({ where: { email }, select: { name: true, email: true, permission: true, age:true, gender: true, startDate: true, salary: true, deletedAt: true } });

    if (!result) return null;

    return { ...result, deletedAt: result?.deletedAt?.toISOString() ?? null, startDate: result?.startDate.toISOString() };
  } catch (e) {
    console.log(e);
    return null;
  } finally {
    await client.$disconnect();
  }
}

function userToSafeUser(user: User): SafeUser {
  return {
    name: user.name,
    email: user.email,
    age: user.age,
    gender: user.gender,
    salary: user.salary,
    startDate: user.startDate.toISOString(),
    deletedAt: user.deletedAt?.toISOString() ?? null,
    permission: user.permission
  }
}

/**
 *
 * @returns a User object if the user is found
 * @returns null if no user with the given email was found
 */
export async function getUserById(id: number): Promise<SafeUser | null> {
  await client.$connect();

  try {
    const result = await client.user.findUnique({ where: { id }, select: { name: true, email: true, permission: true, age:true, gender: true, startDate: true, salary: true, deletedAt: true } });
    
    if (!result) return null;

    return { ...result, deletedAt: result?.deletedAt?.toISOString() ?? null, startDate: result?.startDate.toISOString() };
  } catch (e) {
    console.log(e);
    return null;
  } finally {
    await client.$disconnect();
  }
}

export async function getCurrentUser(): Promise<SafeUser | null> {
  try {
    const cd = cookies().get('session');
  
    if (!cd ) {
      console.log('getCurrentUser: no cookies');
      return null;
    }

    const user = await client.user.findUnique({ where: { session: cd.value } });

    if (!user) {
      console.log('getCurrentUser: not found');
      return null;
    }

    return userToSafeUser(user);
  } catch (e) {
    console.log('getCurrentUser: error: '+e);
    return null;
  } finally {
    await client.$disconnect();
  }
}

export async function changeGymName(newName: string) {
  try {
    const cd = cookies().get('session');
    if (!cd) return;

    await client.$connect();
    const u = await client.user.findUnique({ where: { session: cd.value } });

    if (!u) {
      console.log("(update gym name): not found");
      return;
    }

    await client.user.update({ where: { id: u.id }, data: { gymName: newName } });
  } catch (e) {
    console.log('(change gym name): '+e);
  } finally {
    await client.$disconnect();
  }
}

/**
 * @returns a list of all users
 * @returns null if an error occurs
 */
export async function getAllUsers(): Promise<{ 
  id: number, 
  name: string | null, 
  email: string, 
  permission: number,
  salary: number,
  age: number,
  gender: string,
  startDate: string, 
} [] | null> {
  await client.$connect();

  try {
    const result = await client.user.findMany({ select: { 
      id: true, 
      name: true, 
      email: true, 
      permission: true,
      salary: true,
      age: true,
      gender: true,
      startDate: true, 
    } });
    return [ ...result.map(r => { return { ...r, startDate: r.startDate.toISOString(), permission: r.permission == Permission.Admin ? 0 : 1 }; }) ];
  } catch (e) {
    console.log(e);
    return null;
  } finally {
    await client.$disconnect();
  }
}

export async function getAllAnnouncments(): Promise<Announcement[] | null> {
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
  all: boolean,
  toUsers: number[]
): Promise<number | null> {
  await client.$connect();

  try {
    let result: {
      id: number;
      text: string;
      sent: Date;
    } | null = null;

    if (all) {
      let allUsers = await client.user.findMany({});
      result = await client.message.create({
        data: {
          text,
          readStatus: {
            create: allUsers.map((u) => {
              return { userId: u.id, read: false };
            }),
          },
        },
      });
    } else {
      result = await client.message.create({
        data: {
          text,
          readStatus: {
            create: toUsers.map((u) => {
              return { userId: u, read: false };
            }),
          },
        },
      });
    }
    
    return result?.id ?? null;
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
