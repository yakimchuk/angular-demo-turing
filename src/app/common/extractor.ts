export function extractNaturalNumber(value: any, defaultValue: number) {

  let int = parseInt(value);

  if (isNaN(int) || int < 1 || int % 1 !== 0) {
    int = defaultValue;
  }

  return int;
}
