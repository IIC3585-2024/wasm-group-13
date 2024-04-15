function prime_factors(n) {
  let index = 0;
  const factors = [];

  while (n % 2 === 0) {
    factors[index++] = 2;
    n = n / 2;
    console.log("[JS] 2");
  }
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    while (n % i === 0) {
        factors[index++] = i;
        n = n / i;
        console.log(`[JS] ${i}`);
    }
  }
  if (n > 2) {
    factors[index++] = n;
    console.log(`[JS] ${n}`);
  }
  return factors;
}

function generateFactorsByWasm() {
  // Get the input value and split it into an array of numbers
  const input = document.getElementById('arrayInput').value;

  const numBytes = 8; // since long long is 8 bytes
  const number = Number(input);
  console.log(`[JS] Array elements: ${number}`);

  const size = Math.ceil(Math.sqrt(Number(number))) + 2;

  // Allocate memory in the WebAssembly module
  const factorsPointer = Module._malloc(size * numBytes);

  const str = input.toString();
  const strPtr = Module._malloc((str.length + 1) * Uint8Array.BYTES_PER_ELEMENT);
  Module.stringToUTF8(str, strPtr, str.length + 1);

  const index = Module._prime_factors(strPtr, factorsPointer); // Call the function

  Module._free(strPtr);
  // Create a JavaScript array to hold the factors
  let factors = [];

  for (let i = 0; i < index; i++) {
    // Read the BigInt from the heap

    const factor = Module.getValue(factorsPointer + i * numBytes, 'i64');
    console.log(factor)
    factors.push(factor.toString()); // Convert BigInt to string for easy handling
  }
   // Free the allocated memory
   Module._free(factorsPointer);

  // Display the result in the HTML
  const resultDiv = document.getElementById('printArrayResult');
  resultDiv.textContent = `Array sum: ${factors.join(', ')}`;

  const factors2 = prime_factors(number);
  const resultDiv2 = document.getElementById('printArrayResult2');
  resultDiv2.textContent = `Array sum: ${factors2.join(', ')}`;
}

