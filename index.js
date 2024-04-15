function prime_factors(n) {
  let index = 0;
  const factors = [];

  while (n % 2 === 0) {
    factors[index++] = 2;
    n = n / 2;
  }
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    while (n % i === 0) {
        factors[index++] = i;
        n = n / i;
    }
  }
  if (n > 2) {
    factors[index++] = n;
  }
  return factors;
}

function generateFactorsByJs(input) {

  //const input = document.getElementById('arrayInput').value;
  const number = input;
  console.log(`[JS] Array elements: ${number}`);

  const factors = prime_factors(number);

  return factors;
}

function generateFactorsByWasm(input) {
  // Get the input value and split it into an array of numbers
  //const input = document.getElementById('arrayInput').value;

  const numBytes = 8; // since long long is 8 bytes
  const number = input;
  console.log(`[JS] Array elements: ${number}`);

  const size = Math.ceil(Math.sqrt(Number(number))) + 2;

  // Allocate memory in the WebAssembly module
  const factorsPointer = Module._malloc(size * numBytes);

  const index = Module._prime_factors(number, factorsPointer); // Call the function
  // Create a JavaScript array to hold the factors
  let factors = [];
  for (let i = 0; i < index; i++) {
    // Read the BigInt from the heap
    const factor = Module.getValue(factorsPointer + i * numBytes, 'i64');
    factors.push(factor.toString()); // Convert BigInt to string for easy handling
  }
   // Free the allocated memory
   Module._free(factorsPointer);
   
   return factors;
}

document.getElementById('sumButton').addEventListener('click', function() {

  const compDiv = document.getElementById('div-comparison');

  compDiv.style.display = 'block';

  const inputValue = document.getElementById('arrayInput').value;

  const resultWasm = generateFactorsByWasm(inputValue);
  const resultJs = generateFactorsByJs(inputValue);

  // Display the result in the HTML
  const resultDiv = document.getElementById('printArrayResult');
  resultDiv.textContent = `${resultWasm.join(', ')}`;

  const resultDiv2 = document.getElementById('printArrayResult2');
  resultDiv2.textContent = `${resultJs.join(', ')}`;

});

document.getElementById('HideCompareButton').addEventListener('click', function() {
  const compDiv = document.getElementById('div-comparison');
  compDiv.style.display = 'none';
});