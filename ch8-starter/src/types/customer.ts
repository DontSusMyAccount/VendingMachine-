import { AllPayment, AllPaymentForm } from "./payment";

export interface Customer {
    name: string;
    payment: AllPayment;
    isVerified: boolean;
}

export interface CustomerForm {
    name?: string;
    isVerified?: boolean;
    payment?: AllPaymentForm;
}