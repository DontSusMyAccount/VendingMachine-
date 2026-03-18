import "./css/table.css";
import "./css/style.css";
import { Customer } from "./types/customer";
import { setupTable } from "./table";
import { validateCustomer } from "./validate";

function showMessage(message: string, type: "success" | "error") {
  const messageElement = document.querySelector<HTMLDivElement>("#message")!;
  messageElement.innerHTML = message;
  messageElement.classList.remove("hide", "success", "error");
  messageElement.classList.add(type);
}

function setupForm(formElement: HTMLFormElement, customers: Customer[], callback: (customer: Customer) => void) {
  formElement.addEventListener("change", (event) => {
    const target = event.target as HTMLInputElement;

    const creditCardMetadata = document.querySelector<HTMLDivElement>('#creditCardMetadata')!;
    const onlineBankingMetadata = document.querySelector<HTMLDivElement>('#onlineBankingMetadata')!;

    if (target.id === 'paymentType') {
      if (target.value === 'CreditCard') {
        creditCardMetadata.classList.remove('hide');
        onlineBankingMetadata.classList.add('hide');
      } else if (target.value === 'OnlineBanking') {
        creditCardMetadata.classList.add('hide');
        onlineBankingMetadata.classList.remove('hide');
      } else {
        creditCardMetadata.classList.add('hide');
        onlineBankingMetadata.classList.add('hide');
      }
    }
  });

  formElement.addEventListener("submit", (event) => {
    event.preventDefault();

    try {
      const customer = validateCustomer({
        name: document.querySelector<HTMLInputElement>("#customerName")?.value,
        isVerified: document.querySelector<HTMLInputElement>("#isVerified")?.checked,
        payment: {
          type: document.querySelector<HTMLSelectElement>("#paymentType")?.value,
          amount: document.querySelector<HTMLInputElement>("#amount")?.value,
          metadata: {
            cardNumber: document.querySelector<HTMLInputElement>("#cardNumber")?.value,
            cardHolderName: document.querySelector<HTMLInputElement>("#cardHolderName")?.value,
            accountNumber: document.querySelector<HTMLInputElement>("#accountNumber")?.value,
            bankNumber: document.querySelector<HTMLInputElement>("#bankName")?.value,
          },
        },
      });

      customers.push(customer);
      callback(customer);
      showMessage("Submit complete", "success");

    } catch (error) {
      if (error instanceof Error) {
        showMessage(error.message, "error");
      } else {
        showMessage(String(error), "error");
      }
    }
  });
}

export function setup() {
  const customer: Customer[] = [];

  const tableElement = document.querySelector<HTMLTableElement>("#paymentTable")!;
  const tableColums = ["Customer Name", "Amount", "Payment Method", "Metadata", "Verified"];

  setupTable(tableElement, tableColums, customer);

  const formElement = document.querySelector<HTMLFormElement>("#addCustomerForm")!;
  setupForm(formElement, customer, () => setupTable(tableElement, tableColums, customer));

}

setup();
