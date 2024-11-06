export const formatPrice = (price: number): string => {
  try {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XAF",
      maximumFractionDigits: 0,
      currencyDisplay: "name",
    })
      .format(price)
      .replace("francs CFA (BEAC)", "Frs CFA")
      .replace("francs CFA", "Frs CFA");
  } catch (error) {
    console.error("Error formatting price:", error);
    return `${price} Frs CFA`;
  }
};
