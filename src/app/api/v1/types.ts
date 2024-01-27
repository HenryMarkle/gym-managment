export { Permission, type AddUserParams, type User, type Announcement, type SafeUser };

enum Permission {
    Employee,
    Admin,
}

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
};

type SafeUser = {
    email: string;
    name: string | null;
    permission: number;
    age: number;
    gender: string;
    salary: number;
    startDate: string;
}

type Announcement = {
    id: number;
    text: string;
    sent: string;
};