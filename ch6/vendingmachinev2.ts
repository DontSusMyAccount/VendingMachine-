abstract class Payment {
    protected amount: number = 0;
    protected isCash: boolean = false;

    public getAmount(): number {
        return this.amount;
    }

    public isCashPayment(): boolean {
        return this.isCash;
    }

    public abstract isPaymentSuccess(): boolean;
}

class CashPayment extends Payment {
    constructor() {
        super();
        this.isCash = true;
    }

    public addMoney(cash: number) {
        this.amount += cash; ``
    }

    public isPaymentSuccess(): boolean {
        return true;
    }
}

class QRCodePayment extends Payment {
    public payWithQRCode(amount: number): void {
        this.amount = amount;
    }

    // ระบบสุ่ม ไม่มี API
    public isPaymentSuccess(): boolean {
        const random = Math.floor(Math.random() * 10);
        return random > 3;
    }
}

class VendingMachine {
    constructor(private price: number, private amount: number, private totalCash: number) { }

    private isOutofStock(): boolean {
        return this.amount <= 0;
    }

    private isPayEnough(amount: number): boolean {
        return this.price > amount;
    }

    private isEnoughChange(amount: number): boolean {
        return this.totalCash >= amount - this.price;
    }

    private calculateChange(amount: number): number {
        return amount - this.price;
    }

    public pay(payment: Payment): string {
        if (this.isOutofStock()) {
            return "ของหมด";
        }

        if (this.isPayEnough(payment.getAmount())) {
            return "เงินไม่พอ";
        }

        if (payment.isCashPayment() && !this.isEnoughChange(payment.getAmount())) {
            return "เงินทอนไม่พอ";
        }

        if (!payment.isPaymentSuccess()) {
            return "การชำระเงินไม่สำเร็จ";
        }

        if (payment.isCashPayment()) {
            this.totalCash += this.price;
        }

        const change = this.calculateChange(payment.getAmount());

        if (change > 0) {
            return `กรุณารับเงินทอน: ${change} บาท`;
        }
        return "กำลังส่งมอบสินค้า";
    }
}


const vendingMachine = new VendingMachine(5, 5, 100);

// CASH
const cash = new CashPayment();
cash.addMoney(15);
const result1 = vendingMachine.pay(cash);

// QRCODE
const qr = new QRCodePayment();
qr.payWithQRCode(10);
const result2 = vendingMachine.pay(qr);

console.log(result1);
console.log(result2);