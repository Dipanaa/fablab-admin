import { UserResponseAuth } from "./userResponseAuth.interface";


export interface TokenJwt {
  token:      string;
  expiracion: Date;
  usuario: UserResponseAuth;
}
