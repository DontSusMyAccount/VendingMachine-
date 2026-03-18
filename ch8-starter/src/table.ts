import { Customer } from "./types/customer";

export function setupTable(
    tableElement: HTMLTableElement,
    tableColums: string[],
    customers: Customer[],
) {
    tableElement.innerHTML = "";
    const headerRow = tableElement.insertRow();
    headerRow.innerHTML = tableColums.map((column) => `<th>${column}</th>`).join("");

    customers.forEach((customer) => appendTableRow(tableElement, customer));
}

export function appendTableRow(
    tableElement: HTMLTableElement,
    customer: Customer,
) {
    const row = tableElement.insertRow();
    const { name, payment, isVerified } = customer;

    const metadataDisplay = payment.metadata
        ? Object.entries(payment.metadata)
            .map(([key, value]) => `${key}: ${value}`)
            .join('<br>')
        : '-';

    row.innerHTML = `
        <td>${name}</td>
        <td>${payment.amount}</td>
        <td>${payment.type}</td>
        <td>${metadataDisplay}</td>
        <td>${isVerified ? 'Yes' : 'No'}</td>
    `;
}