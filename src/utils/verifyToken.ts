import { jwtDecode } from 'jwt-decode';

export const verifyToken = (token: string) => {
    console.log(token);
    return jwtDecode(token);
};
