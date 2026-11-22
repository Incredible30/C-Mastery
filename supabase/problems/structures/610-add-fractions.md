---
title: Add Fractions
difficulty: easy
topic: Structures
xp: 20
plan: free
---
Define `struct Frac { long long num, den; };` and add two fractions, printing the result in lowest terms as `num/den`.

**Input:** `a b c d`, meaning a/b + c/d.

**Output:** the reduced sum.

**Constraints:** 1 ≤ a, b, c, d ≤ 10^6

## Hints

1. a/b + c/d = (a·d + c·b) / (b·d).
2. Divide the numerator and denominator by their greatest common divisor (Euclid: `gcd(a, b) = b ? gcd(b, a % b) : a`).

```c starter
#include <stdio.h>

struct Frac { long long num, den; };

int main(void) {
    struct Frac x, y;
    scanf("%lld %lld %lld %lld", &x.num, &x.den, &y.num, &y.den);
    /* add and reduce */
    return 0;
}
```

```c solution
#include <stdio.h>

struct Frac { long long num, den; };

static long long gcd(long long a, long long b) { return b ? gcd(b, a % b) : a; }

static struct Frac add(struct Frac a, struct Frac b) {
    struct Frac r = {a.num * b.den + b.num * a.den, a.den * b.den};
    long long g = gcd(r.num, r.den);
    r.num /= g; r.den /= g;
    return r;
}

int main(void) {
    struct Frac x, y;
    if (scanf("%lld %lld %lld %lld", &x.num, &x.den, &y.num, &y.den) != 4) return 1;
    struct Frac r = add(x, y);
    printf("%lld/%lld\n", r.num, r.den);
    return 0;
}
```

```test sample
1 2 1 3
---
5/6
```

```test hidden
1 4 3 4
---
1/1
```

```test hidden
2 6 4 12
---
2/3
```

```test hidden
999999 1000000 1 1000000
---
1/1
```
