---
title: Modular Arithmetic
difficulty: hard
topic: Arithmetic
xp: 40
plan: free
---
Competitive programming often asks for answers "modulo m". Given integers `a`, `b` and a positive modulus `m`, print (a + b) mod m, (a − b) mod m and (a × b) mod m, where every result must be between 0 and m − 1.

Careful: in C, `-7 % 3` is `-1`, but the mathematical answer is `2`.

**Input:** three integers `a b m`.

**Output:** the three results separated by spaces.

**Constraints:** −10^9 ≤ a, b ≤ 10^9, 1 ≤ m ≤ 10^9

## Hints

1. Reduce first: `a = ((a % m) + m) % m` makes `a` non-negative and below `m`. Do the same for `b`.
2. After reducing, `a × b` is below 10^18 and fits in `long long`. Apply the same fix after subtracting.

```c starter
#include <stdio.h>

int main(void) {
    long long a, b, m;
    scanf("%lld %lld %lld", &a, &b, &m);
    /* print (a+b), (a-b) and (a*b), each mod m */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    long long a, b, m;
    if (scanf("%lld %lld %lld", &a, &b, &m) != 3) return 1;
    a = ((a % m) + m) % m;
    b = ((b % m) + m) % m;
    printf("%lld %lld %lld\n", (a + b) % m, ((a - b) % m + m) % m, a * b % m);
    return 0;
}
```

```test sample
7 5 3
---
0 2 2
```

```test sample
-7 2 3
---
1 0 1
```

```test hidden
1000000000 1000000000 999999937
---
126 0 3969
```

```test hidden
-1000000000 1000000000 1
---
0 0 0
```

```test hidden
0 -1 1000000000
---
999999999 1 0
```
