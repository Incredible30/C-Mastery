---
title: Fast Modular Power
difficulty: medium
topic: Recursion
xp: 30
plan: free
---
Compute a^b mod m, where `b` can be as large as 10^18. Multiplying `b` times is far too slow, so use **fast exponentiation**:

- a^b = (a^(b/2))² when b is even
- a^b = a × a^(b−1) when b is odd

**Input:** three integers `a b m`.

**Output:** a^b mod m.

**Constraints:** 0 ≤ a ≤ 10^9, 0 ≤ b ≤ 10^18, 1 ≤ m ≤ 10^9

## Hints

1. Recursively compute `half = power(a, b / 2, m)`, then return `half * half % m`, times `a % m` once more if `b` is odd.
2. Keep values below `m` (≤ 10^9) so products stay below 10^18 and fit in `long long`. Remember `power(a, 0, m)` is `1 % m`.

```c starter
#include <stdio.h>

long long power_mod(long long a, long long b, long long m) {
    return 0;
}

int main(void) {
    long long a, b, m;
    scanf("%lld %lld %lld", &a, &b, &m);
    printf("%lld\n", power_mod(a, b, m));
    return 0;
}
```

```c solution
#include <stdio.h>

long long power_mod(long long a, long long b, long long m) {
    if (b == 0) return 1 % m;
    long long half = power_mod(a, b / 2, m);
    long long r = half * half % m;
    if (b % 2) r = r * (a % m) % m;
    return r;
}

int main(void) {
    long long a, b, m;
    if (scanf("%lld %lld %lld", &a, &b, &m) != 3) return 1;
    printf("%lld\n", power_mod(a, b, m));
    return 0;
}
```

```test sample
2 10 1000
---
24
```

```test hidden
5 0 1
---
0
```

```test hidden
1000000000 1000000000000000000 999999937
---
306034211
```

```test hidden
3 200 13
---
9
```
