Run with:
```
emcc lib/factorPrimo.c -o func/factorPrimo.js -s WASM=1 -s WASM_BIGINT -s EXPORTED_FUNCTIONS=_prime_factors,_prime_factors_o3,_malloc,_free -s EXPORTED_RUNTIME_METHODS=stringToUTF8,getValue
```