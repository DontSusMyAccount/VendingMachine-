class CashPayment {
    private amount: number = 0;

    public addMoney(cash: number) {
        this.amount += cash;
    }

    public getAmount() {
        return this.amount;
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

    public pay(cashPayment: CashPayment) {
        if (this.isOutofStock()) {
            throw new Error("ของหมด");
        }

        if (this.isPayEnough(cashPayment.getAmount())) {
            throw new Error("เงินไม่พอ");
        }

        if (!this.isEnoughChange(cashPayment.getAmount())) {
            throw new Error("เงินทอนไม่พอ");
        }

        this.totalCash += this.price;

        const change = this.calculateChange(cashPayment.getAmount());

        if (change > 0) {
            return `กรุณารับเงินทอน: ${change}`;
        }
        return 'ขอบคุณ';
    }

}
const name = prompt("ชื่อของคุณ: ")

const vendingMachine = new VendingMachine(5, 5, 100);
const cashPayment = new CashPayment();
cashPayment.addMoney(10);
cashPayment.addMoney(5);

const result = vendingMachine.pay(cashPayment);
console.log('สวัสดีคุณ', name, result, 'บาท');
