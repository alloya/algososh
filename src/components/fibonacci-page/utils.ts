export  const getFibonacciNumbers = (numberOfElements: number) => {
  const fib: number[] = [1, 1];
  let previous = fib[0];
  let current = fib[1];
  let next = fib[0] + fib[1];
  for (let i = 0; i < numberOfElements - 1; i++) {
    fib.push(next);
    previous = current;
    current = next;
    next = current + previous;
  }
  return fib;
}