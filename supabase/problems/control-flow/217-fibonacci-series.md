---
title: Fibonacci Series
difficulty: medium
topic: Loops
xp: 20
plan: free
---
Print the first `n` Fibonacci numbers, starting 0 1 1 2 3 5 …, separated by spaces. Each number is the sum of the two before it.

**Input:** one integer `n`.

**Output:** the first `n` Fibonacci numbers on one line.

**Constraints:** 1 ≤ n ≤ 90. The 90th number still fits in `long long`.

## Hints

1. Keep two variables, `a = 0` and `b = 1`. Print `a`, then compute `next = a + b` and shift: `a = b; b = next`.
2. Use `long long`; the numbers grow very fast.

```c starter
#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    /* print the series */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    long long a = 0, b = 1;
    for (int i = 0; i < n; i++) {
        printf(i ? " %lld" : "%lld", a);
        long long next = a + b;
        a = b;
        b = next;
    }
    printf("\n");
    return 0;
}
```

```test sample
8
---
0 1 1 2 3 5 8 13
```

```test hidden
1
---
0
```

```test hidden
2
---
0 1
```

```test hidden
90
---
0 1 1 2 3 5 8 13 21 34 55 89 144 233 377 610 987 1597 2584 4181 6765 10946 17711 28657 46368 75025 121393 196418 317811 514229 832040 1346269 2178309 3524578 5702887 9227465 14930352 24157817 39088169 63245986 102334155 165580141 267914296 433494437 701408733 1134903170 1836311903 2971215073 4807526976 7778742049 12586269025 20365011074 32951280099 53316291173 86267571272 139583862445 225851433717 365435296162 591286729879 956722026041 1548008755920 2504730781961 4052739537881 6557470319842 10610209857723 17167680177565 27777890035288 44945570212853 72723460248141 117669030460994 190392490709135 308061521170129 498454011879264 806515533049393 1304969544928657 2111485077978050 3416454622906707 5527939700884757 8944394323791464 14472334024676221 23416728348467685 37889062373143906 61305790721611591 99194853094755497 160500643816367088 259695496911122585 420196140727489673 679891637638612258 1100087778366101931 1779979416004714189
```
