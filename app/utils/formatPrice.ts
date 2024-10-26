export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XAF",
    maximumFractionDigits: 0,
    currencyDisplay: "name",
  })
    .format(price)
    .replace("francs CFA", "Frs CFA"); 
};
