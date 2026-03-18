interface BasePayment<TType extends string, TMetadata = undefined> {
    type: TType;
    amount: number;
    metadata: TMetadata;
}

export type Cash = BasePayment<"Cash">;

export interface CreditCardMetadata {
    cardNumber: string;
    cardHolderName: string;
}

export type CreditCard = BasePayment<"CreditCard", CreditCardMetadata>;
export interface OnlineBankingMetadata {
    accountNumber: string;
    bankNumber: string;
}

export type OnlineBanking = BasePayment<"OnlineBanking", OnlineBankingMetadata>;

export type AllPayment = Cash | CreditCard | OnlineBanking;

// payment form
export type AllPaymentForm = {
    type?: string;
    amount?: string;
    metadata?: Partial<CreditCardMetadata & OnlineBankingMetadata>;
}
