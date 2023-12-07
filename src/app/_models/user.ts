import { Role } from "./role";

export interface User {
    data?: User;
    id?: string;
    email?: string;
    userName?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    token?: string;
    role: Role;
}