function abbreviateNum(n) {

  const units = ["k", "M", "B", "T", "Qa"];
  const unitIndex = Math.floor(Math.log10(n) / 3) - 1;
  const unit = units[unitIndex];

  if (!unit) {
    return n.toString();
  }

  const divisor = Math.pow(1000, unitIndex + 1);
  const abbreviatedNum = (n / divisor).toFixed(3);

  let [integerPart, decimalPart] = abbreviatedNum.split('.');

  decimalPart.toString() === '000'? 
  decimalPart = ''
  : decimalPart = "." + decimalPart.toString() 

  return `${integerPart}${decimalPart} ${unit}`;
}

export default abbreviateNum