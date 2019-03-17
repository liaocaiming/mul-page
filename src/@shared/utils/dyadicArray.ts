export  default function dyadicArray(data: any[], num: number): any[] {
  const arr = [];
  while (data.length > 0) {
    arr.push(data.splice(0, num));
  }
  return arr;
}
