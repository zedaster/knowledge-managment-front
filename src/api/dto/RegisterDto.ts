export interface RegisterDto {
    login: string;
    // email: string
    password: string;
    repeatPassword: string;

    lastName: string;
    firstName: string;
    patronymic?: string;
}