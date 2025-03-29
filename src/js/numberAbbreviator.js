function abbreviateNumBigInt(n) {
  const units = ["k", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc"];

  const bigIntN = BigInt(n);

  if (bigIntN < 1000n) {
    return bigIntN.toString();
  }

  let logValue = 0;
  let tempN = bigIntN;
  let decimalPart = 0
  while (tempN >= 1000n) {
    decimalPart = tempN % 1000n
    tempN /= 1000n;
    logValue++;
  }
  
  if(logValue - 1 >= units.length) {
    return`∞`
  }
  else{
    const unit = units[logValue - 1]; 

    const abbreviatedNumStr = tempN.toString();

    let formattedDecimalPart = decimalPart == 0 ? '' : '.' + decimalPart

    return `${abbreviatedNumStr}${formattedDecimalPart}${unit}`;
  }
}

export default abbreviateNumBigInt;