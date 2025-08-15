import axios from "axios";

//const api = "http://localhost:8787/api";
const api = "https://journal-backend.haskwell.workers.dev/api";

export async function Login(loginUsername: string, loginPassword: string){
    const res = await axios.post(
        `${api}/login`,
        {username: loginUsername, password: loginPassword},
        {
            withCredentials: true,
            headers: {"Content-Type": "application/json"}
        }
    )
    return res.data;
}

export async function Register(registerUsername: string, registerEmail: string, registerPassword: string){
    const res = await axios.post(
        `${api}/register`,
        {
            username: registerUsername,
            password: registerPassword,
            email: registerEmail
        },
        {
            withCredentials: true,
            headers: {"Content-Type": "application/json"}
        }
    )
    return res.data;
}

export async function Logout(){
    const res = await axios.post(
        `${api}/logout`,
        {
            
        },
        {
            withCredentials: true,
        }
    )
    return res.data;
}

export async function IsLoggedIn(){
    const res = await axios.get(
        `${api}/auth/me`,
        {withCredentials: true}
    )
    return res.data.success;
}

export async function RequestPasswordReset(requestEmail: string){
    const res = await axios.post(
        `${api}/password-reset-request`,
        {
            email: requestEmail
        },
        {
            withCredentials: true
        }
    )
    return res.data;
}

export async function PasswordReset(reqToken: string, newPassword: string){
    const res = await axios.post(
        `${api}/password-reset`,
        {
            password: newPassword,
            token: reqToken
        },
        {
            withCredentials: true
        }
    )
    return res.data;
}

export async function UpdateUsername(request: string, requestPassword: string){
    const res = await axios.patch(
        `${api}/auth/update-username`,
        {
            newUsername: request,
            password: requestPassword
        },
        {
            withCredentials: true
        }
    )
    return res.data;
}

export async function UpdateEmail(request: string, requestPassword: string){
    const res = await axios.patch(
        `${api}/auth/update-email`,
        {
            newEmail: request,
            password: requestPassword
        },
        {
            withCredentials: true
        }
    )
    return res.data;
}

export async function UpdatePassword(request: string, requestPassword: string){
    const res = await axios.patch(
        `${api}/auth/update-password`,
        {
            newPassword: request,
            password: requestPassword
        },
        {
            withCredentials: true
        }
    )
    return res.data;
}