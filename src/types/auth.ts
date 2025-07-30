export type RegistrationData = {
    name: string;
    phoneNumber: string;
    address: string;
    email: string;
    password: string;
    roles: string[];
};

export type LoginData = {
    email: string;
    password: string;
};

export type FormData = {
    name: string;
    phoneNumber: string;
    address: string;
    email: string;
};
