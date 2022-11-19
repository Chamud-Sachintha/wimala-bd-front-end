import { Role } from "./role";

export class UserModel {
    firstName!: string
    lastName!: string
    userName!: string
    userPassword!: string;
    role!: Role[];
}