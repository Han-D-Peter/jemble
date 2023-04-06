export function getOrdinal(n: number): string {
  let ord = "th";

  if (n % 10 == 1 && n % 100 != 11) {
    ord = "st";
  } else if (n % 10 == 2 && n % 100 != 12) {
    ord = "nd";
  } else if (n % 10 == 3 && n % 100 != 13) {
    ord = "rd";
  }

  return `${n}${ord}`;
}

export function getEarningValue(grade: number) {
  if (grade === 1) {
    return 4;
  } else if (grade === 2) {
    return 100;
  } else if (grade === 3) {
    return 10000;
  }
  return 1;
}
