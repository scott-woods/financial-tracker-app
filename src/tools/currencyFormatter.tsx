export const currencyFormatter = (amount:number) => amount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    })