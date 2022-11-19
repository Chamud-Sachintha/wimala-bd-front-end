import { UserModel } from "./UserModel";

export class JWTResponse {
    user!: UserModel;
    jwtToken!: string;
}