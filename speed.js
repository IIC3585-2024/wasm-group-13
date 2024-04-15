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
  //console.log(`[JS] Array elements: ${number}`);

  const factors = prime_factors(number);

  return factors;
}

function generateFactorsByWasm(input) {
  // Get the input value and split it into an array of numbers
  //const input = document.getElementById('arrayInput').value;

  const numBytes = 8; // since long long is 8 bytes
  const number = input;
  //console.log(`[JS] Array elements: ${number}`);

  const size = Math.ceil(Math.sqrt(Number(number))) + 2;

  // Allocate memory in the WebAssembly module
  const factorsPointer = Module._malloc(size * numBytes);

  const index = Module._prime_factors_o3(number, factorsPointer); // Call the function
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

function generateFactorsByWasmO3(input) {
  // Get the input value and split it into an array of numbers
  //const input = document.getElementById('arrayInput').value;

  const numBytes = 8; // since long long is 8 bytes
  const number = input;
  //console.log(`[JS] Array elements: ${number}`);

  const size = Math.ceil(Math.sqrt(Number(number))) + 2;

  // Allocate memory in the WebAssembly module
  const factorsPointer = Module._malloc(size * numBytes);

  Module._prime_factors_o3(number, factorsPointer); // Call the function

  // Free the allocated memory
  Module._free(factorsPointer);

}


document.getElementById('sumButton').addEventListener('click', function() {

  const inputValue1 = parseInt(document.getElementById('arrayInput').value);
  const inputValue2 = parseInt(document.getElementById('arrayInput2').value);

  const resultDiv = document.getElementById('printArrayResult');
  const resultDiv2 = document.getElementById('printArrayResult2');
  const resultDiv3 = document.getElementById('printArrayResult3');

  // Progress bars
  const progress = document.getElementById('wasmPg');

  let start = performance.now();
  //console.log(`[JS] Array elements: ${inputValue1} ${inputValue2} ${typeof inputValue1} ${typeof inputValue2}`)
  for (let i = inputValue1; i < inputValue2; i++) {
    let pp = ((i - inputValue1) / (inputValue2 - inputValue1)) * 100;
    progress.style.width = `${pp.toFixed(0)}%`;
    //console.log(`[JS] ${i}`)
    generateFactorsByWasm(i.toString());
  }
  let end = performance.now();
  const wasmTime = end - start;
  // Display the result in the HTML
  resultDiv.textContent = `Tiempo de ejecución: ${wasmTime.toFixed(2)} ms`;

  const progress3 = document.getElementById('wasmO3Pg');

  start = performance.now();
  for (let i = inputValue1; i < inputValue2; i++) {
    let pp = ((i - inputValue1) / (inputValue2 - inputValue1)) * 100;
    progress3.style.width = `${pp.toFixed(0)}%`;
    generateFactorsByWasmO3(i.toString());
  }
  end = performance.now();
  const wasmO3Time = end - start;
  // Display the result in the HTML
  resultDiv3.textContent = `Tiempo de ejecución: ${wasmO3Time.toFixed(2)} ms`;

  const progress2 = document.getElementById('jsPg');
  start = performance.now();
  for (let i = inputValue1; i < inputValue2; i++) {
    let pp = ((i - inputValue1) / (inputValue2 - inputValue1)) * 100;
    progress2.style.width = `${pp.toFixed(0)}%`;
    generateFactorsByJs(i);
  }
  end = performance.now();
  const jsTime = end - start;
  resultDiv2.textContent = `Tiempo de ejecución: ${jsTime.toFixed(2)} ms`;
});

document.getElementById('sumButton2').addEventListener('click', function() {

  const inputValue1 = parseInt(document.getElementById('arrayInput').value);
  const inputValue2 = parseInt(document.getElementById('arrayInput2').value);

  const resultDiv = document.getElementById('printArrayResult');
  const resultDiv2 = document.getElementById('printArrayResult2');
  const resultDiv3 = document.getElementById('printArrayResult3');


  let start = performance.now();

  for (let i = inputValue1; i < inputValue2; i++) {
    generateFactorsByWasm(i.toString());
  }

  let end = performance.now();
  const wasmTime = end - start;

  // Display the result in the HTML
  resultDiv.textContent = `Tiempo de ejecución: ${wasmTime.toFixed(2)} ms`;

  start = performance.now();
  for (let i = inputValue1; i < inputValue2; i++) {
    generateFactorsByWasmO3(i.toString());
  }

  end = performance.now();
  const wasmO3Time = end - start;
  // Display the result in the HTML
  resultDiv3.textContent = `Tiempo de ejecución: ${wasmO3Time.toFixed(2)} ms`;



  start = performance.now();
  for (let i = inputValue1; i < inputValue2; i++) {
    generateFactorsByJs(i);
  }
  end = performance.now();
  const jsTime = end - start;
  resultDiv2.textContent = `Tiempo de ejecución: ${jsTime.toFixed(2)} ms`;
});


document.getElementById('HideCompareButton').addEventListener('click', function() {
  // Progress bars
  const progress = document.getElementById('wasmPg');
  progress.style.width = '0%';
  const progress2 = document.getElementById('jsPg');
  progress2.style.width = '0%';
  const progress3 = document.getElementById('wasmO3Pg');
  progress3.style.width = '0%';
});