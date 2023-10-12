export const formatMoney = (price) => {
  if (price >= 1000000) {
    const millionValue = (price / 1000000).toFixed(1);
    if (millionValue.endsWith(".0")) {
      return parseInt(millionValue) + " triệu";
    } else {
      return millionValue + " triệu";
    }
  }
};
