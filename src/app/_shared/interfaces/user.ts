import { FormControl } from '@angular/forms';

export interface UserRegisterRequest {
    phoneNumber: "string",
    username: "string",
    email: "string",
    providerData: {
        businuessType: number,
        license: "string",
        commercialRecord: "string"
    }
}



export interface UserLoginRequest {
    phoneNumber: string,
    recaptchaResponseValue: string
}

export interface UserLoginResponse {
    succeeded: boolean,
    message: string,
    responseCode: number,
    data: {
        id: string,
        phoneNumber: string,
        email: string,
        otpSentVia: number,
        createdAt: string,
        otpSecret: string
    }
}



export interface ProviderRegForm {
    id: FormControl<number>;
    fullName: FormControl<string>;
    email: FormControl<string>;
    mobile: FormControl<string>;
    license: FormControl<number>;
    commercialRecord: FormControl<number>;
    userTypeId: FormControl<number>;
}