import { Role } from "./Role";


export class UserModel {
    firstName!: string
    lastName!: string
    userName!: string
    userPassword!: string;
    role!: Role[];
}