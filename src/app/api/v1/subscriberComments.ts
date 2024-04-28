import { cookies } from "next/headers";
import client from "./client";

async function getAuthState() {
    const sc = cookies().get("session");
  
    if (!sc) return null;
  
    const user = await client.user.findUnique({ where: { session: sc.value } });
  
    return user;
}

function dateToString(data: Object): Object {
    const newData: { [key: string]: Object } = {};
    
    for (const [ key, value ] of Object.entries(data)) {
        if (value instanceof Date) {
            newData[key] = value.toDateString();
        } else {
            newData[key] = value;
        }
    }

    return newData;
}

export async function getAllComments(includeDeleted: boolean = false) {
    try {
        await client.$connect();

        if (!getAuthState()) return 'unauthorized';

        const comments = includeDeleted 
            ? await client.subscriberComment.findMany({}) 
            : await client.subscriberComment.findMany({ where: { deletedAt: null } });

        return comments.map(dateToString);
    } catch (e) {
        console.log(`getAllComments(): err: ${e}`);
        return 'error';
    } finally {
        await client.$disconnect();
    }
}

export async function getAllCommentsOfManager(managerId: number, includeDeleted: boolean = false) {
    try {
        await client.$connect();

        if (!getAuthState()) return 'unauthorized';

        const comments = includeDeleted 
            ? await client.subscriberComment.findMany({ where: { senderId: managerId } })
            : await client.subscriberComment.findMany({ where: { senderId: managerId, deletedAt: null } });

        return comments.map(dateToString);
    } catch (e) {
        console.log(`getAllCommentsOfManager(): err: ${e}`);
        return 'error';
    } finally {
        await client.$disconnect();
    }
}

export async function getAllCommentsOfSubscriber(subscriberId: number, includeDeleted: boolean = false) {
    try {
        await client.$connect();

        if (!getAuthState()) return 'unauthorized';

        const comments = includeDeleted 
            ? await client.subscriberComment.findMany({ where: { subscriberId } })
            : await client.subscriberComment.findMany({ where: { subscriberId, deletedAt: null } });

        return comments.map(dateToString);
    } catch (e) {
        console.log(`getAllCommentsOfSubscriber(): err: ${e}`);
        return 'error';
    } finally {
        await client.$disconnect();
    }
}

export async function createComment(text: string, senderId: number, userId: number) {
    try {
        await client.$connect();

        if (!getAuthState()) return 'unauthorized';

        const comment = await client.subscriberComment.create({ data: { text, senderId, subscriberId: userId } });

        return comment.id;
    } catch (e) {
        console.log(`createComment(): err: ${e}`);
        return 'error';
    } finally {
        await client.$disconnect();
    }
}

export async function deleteComment(commentId: number, permanant: boolean = false) {
    try {
        await client.$connect();

        if (!getAuthState()) return 'unauthorized';

        if (permanant) {
            await client.subscriberComment.delete({ where: { id: commentId } });
        } else {
            await client.subscriberComment.update({ where: { id: commentId }, data: { deletedAt: new Date() } });
        }

    } catch (e) {
        console.log(`deleteComment(): err: ${e}`);
        return 'error';
    } finally {
        await client.$disconnect();
    }
}