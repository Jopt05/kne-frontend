export interface User {
    id:       number;
    username: string;
    email:    string;
    password: string;
    status:   boolean;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
    username: string;
}
