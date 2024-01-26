"use server";

import { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export type Customer = {
  id: number;
  name: string;
  surname: string;
  age: number;
  gender: string;
  duration: number | null;
  daysLeft: number | null;
  bucketPrice: Decimal;
  paymentAmount: Decimal;
  startedAt: Date;
  endsAt: Date;
};

export type AddCustomerParams = {
  name: string;
  surname: string;
  age: number;
  gender: string;
  payment: number;
  bucketPrice: number;
  endDate: Date;
  startDate: Date;
};

/** 
    Returns the ID of the newly created customer on success.
    Returns 'duplicate' when another subscriber with same name and surname was found.
    Returns 'error' when an exception is thrown.
*/
export async function addCustomer(
  params: AddCustomerParams
): Promise<number | "duplicate" | "error"> {
  const client = new PrismaClient();

  try {
    await client.$connect();

    if (
      await client.subscriber.count({
        where: { name: params.name, surname: params.surname },
      })
    )
      return "duplicate";

    const res = await client.subscriber.create({
      data: {
        name: params.name,
        surname: params.surname,
        age: params.age,
        paymentAmount: params.payment,
        startedAt: params.startDate,
        endsAt: params.endDate,
        gender: params.gender,
        bucketPrice: params.bucketPrice,
      },
    });

    return res.id;
  } catch (e) {
    console.log(e);
    return "error";
  } finally {
    await client.$connect();
  }
}

/**
 * @returns a list of all subscribers
 * @returns null if an error has occurred
 */
export async function getAllCustomers(): Promise<Customer[] | null> {
  const client = new PrismaClient();

  await client.$connect();

  try {
    const customers = await client.subscriber.findMany();
    return customers;
  } catch (e) {
    console.log(e);
    return null;
  } finally {
    await client.$disconnect();
  }
}

/**
 * Finds a subscriber by an ID
 * @param id the ID of the subscriber
 * @returns the subscriber if found
 * @returns null if the subscriber was not found
 * @returns 'error' if an error has occurred
 */
export async function getCustomerById(
  id: number
): Promise<Customer | null | "error"> {
  const client = new PrismaClient();

  await client.$connect();

  try {
    const customer = await client.subscriber.findUnique({ where: { id } });
    return customer;
  } catch (e) {
    console.log(e);
    return "error";
  } finally {
    await client.$disconnect();
  }
}

export async function deleteCustomerById(id: number) {
    const client = new PrismaClient();

    await client.$connect();

    try {
        await client.subscriber.delete({ where: { id } });
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
export async function updateCustomer(data: Customer): Promise<Boolean> {
    const client = new PrismaClient();

    await client.$connect();

    try {
        await client.subscriber.update({ where: { id: data.id }, data });
        return true;
    } catch (e) {
        console.log(e);
        return false;
    } finally {
        await client.$disconnect();
    }
}
