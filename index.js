function generateFactorsByWasm() {
  // Get the input value and split it into an array of numbers
  const input = document.getElementById('arrayInput').value;

  const numBytes = 8; // since long long is 8 bytes
  const number = parseInt(input);
  console.log(`[JS] Array elements: ${number}`);

  const size = Math.ceil(Math.sqrt(Number(number))) + 2;

  // Allocate memory in the WebAssembly module
  const factorsPointer = Module._malloc(size * numBytes);

  const index = Module._prime_factors(number, factorsPointer); // Call the function
  // Create a JavaScript array to hold the factors
  let factors = [];
  for (let i = 0; i < index; i++) {
    // Read the BigInt from the heap
    const factor = Module.HEAP32[(factorsPointer / 8) + i];
    factors.push(factor.toString()); // Convert BigInt to string for easy handling
  }
   // Free the allocated memory
   Module._free(factorsPointer);

  // Display the result in the HTML
  const resultDiv = document.getElementById('printArrayResult');
  resultDiv.textContent = `Array sum: ${factors.join(', ')}`;
}

