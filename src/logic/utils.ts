/**
 *
 * Pads an array to the correct length
 *
 * @param arr - The array to pad
 * @param size - The size to pad to
 * @param fill - What to fill the array with, default: null
 * @returns The array that is padded to the correct length
 */

export function padArray(
  arr: Array<any>,
  size: number,
  fill = null
): Array<any> {
  return arr.concat(Array(size - arr.length).fill(fill));
}

/**
 *
 * Makes the lengths of two arrays equal.
 *
 * @param arr1 - first array
 * @param arr2 - second array
 * @returns The arrays of same length
 */
export function fixLengths(
  arr1: Array<any>,
  arr2: Array<any>
): Array<Array<any>> {
  if (arr1.length < arr2.length) {
    arr1 = padArray(arr1, arr2.length);
  } else if (arr2.length < arr1.length) {
    arr2 = padArray(arr2, arr1.length);
  }

  return [arr1, arr2];
}

/**
 *
 * Compares two arrays and then returns how many matching elements there are
 *
 * @param arr1
 * @param arr2
 * @return The number of matching elements
 */
export function score(arr1: Array<any>, arr2: Array<any>): number {
  [arr1, arr2] = fixLengths(arr1, arr2);

  var scr: number = 0;
  for (let value of arr2) {
    if (arr1.includes(value) && value != null) {
      scr++;
    }
  }

  return scr;
}

/**
 * One got encodes an array to its indices
 * @param arr - The array
 * @returns The encoded array
 */
export function oneHotEncode(arr: Array<String>): Array<number> {
  return arr.map((e, i) => i + 1);
}
