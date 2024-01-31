import { Decimal } from "@prisma/client/runtime/library";

export { Permission, type AddUserParams, type User, type Announcement, type SafeUser, type Customer, type AddCustomerParams };

enum Permission {
    Employee,
    Admin,
}
type Customer = {
    id: number;
    name: string;
    surname: string;
    age: number;
    gender: string;
    duration: number | null;
    daysLeft: number | null;
    bucketPrice: number;
    paymentAmount: number;
    startedAt: string;
    endsAt: string;
};

type AddCustomerParams = {
    name: string;
    surname: string;
    age: number;
    gender: string;
    payment: number;
    bucketPrice: number;
    endDate: Date;
    startDate: Date;
};

type AddUserParams = {
    name?: string;
    email: string;
    password: string;
    permission: Permission;
    age: number;
    gender: string;
    salary: number;
    startDate: Date;
};

type User = {
    id: number;
    email: string;
    name: string | null;
    password: string;
    session: string;
    lastLogin: Date | null;
    permission: number;
    age: number;
    gender: string;
    salary: number;
    startDate: Date;
    deletedAt: Date | null;
};

type SafeUser = {
    email: string;
    name: string | null;
    permission: number;
    age: number;
    gender: string;
    salary: number;
    startDate: string;
    deletedAt: string | null;
}

type Announcement = {
    id: number;
    text: string;
    sent: string;
};