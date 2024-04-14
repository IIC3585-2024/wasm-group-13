#include <stdio.h>
#include <math.h>
#include <stdlib.h>

// Función para calcular el máximo común divisor
long long gcd(long long a, long long b) {
    while (b != 0) {
        long long t = b;
        b = a % b;
        a = t;
    }
    return a;
}

// Función para imprimir y almacenar los factores primos de un número usando long long long long
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

    return index;
}

int main() {
    long long number = 7086221232; // Un ejemplo con un número grande

    // Estimación de tamaño para el array de factores
    int size = (int)sqrt(number) + 2;  // Aproximadamente la cantidad de factores posibles
    long long *factors = (long long*) malloc(size * sizeof(long long));
    printf("Factores primos de %lld: ", number);
    int index = prime_factors(number, factors);

    // Imprimir los factores primos desde el array
    printf("Los factores primos son: ");
    for (int i = 0; i < index; i++) {
        printf("%lld ", factors[i]);
    }

    // Liberar la memoria asignada
    free(factors);
    return 0;
}