#include <stdio.h>
#include <math.h>
#include <stdlib.h>

// Función para calcular el máximo común divisor
long gcd(long a, long b) {
    while (b != 0) {
        long t = b;
        b = a % b;
        a = t;
    }
    return a;
}

// Función para imprimir y almacenar los factores primos de un número usando long long
int prime_factors(long long n, long long *factors) {
    int index = 0;

    // División por 2 para eliminar todos los factores pares
    while (n % 2 == 0) {
        factors[index++] = 2;
        n = n / 2;
    }

    // n debe ser impar en este punto, por lo que podemos omitir los números pares
    for (long long i = 3; i <= sqrt(n); i += 2) {
        // Mientras i divide n, añade i al array y divide n
        while (n % i == 0) {
            factors[index++] = i;
            n = n / i;
        }
    }

    // Este condicional es para un factor primo mayor que la raíz cuadrada de n
    if (n > 2) {
        factors[index++] = n;
    }

    for (long long i = 0; i < index; i++) {
        printf("[C] factors[%lld] %lld \n", i, factors[i]);
    }

    return index;
}

int main() {
    // NO APLICABLE
    /*
    long number = 134; // Un ejemplo con un número grande

    // Estimación de tamaño para el array de factores
    int size = (int)sqrt(number) + 2;  // Aproximadamente la cantidad de factores posibles
    long *factors = (long*) malloc(size * sizeof(long));
    printf("Factores primos de %ld: ", number);
    int index = prime_factors(number, factors);

    // Imprimir los factores primos desde el array
    printf("Los factores primos son: ");
    for (int i = 0; i < index; i++) {
        printf("%ld ", factors[i]);
    }

    // Liberar la memoria asignada
    free(factors);
    */
    return 0;
}
