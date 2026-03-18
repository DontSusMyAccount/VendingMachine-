import { Customer, CustomerForm } from "./types/customer";
import { AllPayment, AllPaymentForm } from "./types/payment";

function assertNonEmpty(condition: unknown, message: string): asserts condition {
    if (condition === null || condition === undefined || condition === '') {
        throw new Error(message);
    }
}

function assert(condition: boolean, message: string): asserts condition {
    if (!condition) {
        throw new Error(message);
    }
}

export function validateCustomer(customer: CustomerForm): Customer {

    assertNonEmpty(customer.name, "Name is required");
    assert(customer.isVerified !== null && customer.isVerified !== undefined, "isVerified is required");

    const payment = validatePayment(customer.payment);

    return {
        name: customer.name,
        isVerified: customer.isVerified,
        payment: payment
    }
}

export function validatePayment(payment?: AllPaymentForm): AllPayment {
    assertNonEmpty(payment, 'Payment is required');
    assertNonEmpty(payment.type, 'Payment type is required');
    assertNonEmpty(payment.amount, 'Payment amount is required');

    const amount = parseInt(payment.amount);
    assert(!Number.isNaN(amount), 'Amount must be a number');
    assert(amount > 0, 'Amount must be greater than 0');

    if (payment.type === 'CreditCard') {
        assertNonEmpty(payment.metadata?.cardNumber, 'Card number is required');
        assertNonEmpty(payment.metadata?.cardHolderName, 'Card holder name is required');
        return {
            type: payment.type,
            amount,
            metadata: {
                cardNumber: payment.metadata?.cardNumber,
                cardHolderName: payment.metadata?.cardHolderName,
            }
        }
    }

    if (payment.type === 'OnlineBanking') {
        assertNonEmpty(payment.metadata?.accountNumber, 'Account number is required');
        assertNonEmpty(payment.metadata?.bankNumber, 'Bank number is required');
        return {
            type: payment.type,
            amount,
            metadata: {
                accountNumber: payment.metadata?.accountNumber,
                bankNumber: payment.metadata?.bankNumber,
            }
        }
    }

    if (payment.type === 'Cash') {
        return {
            type: payment.type,
            amount,
            metadata: undefined,
        }
    }

    throw new Error('Unknown payment type');
}