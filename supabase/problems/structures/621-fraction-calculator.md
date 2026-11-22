---
title: Fraction Calculator
difficulty: medium
topic: Structures
xp: 30
plan: free
---
Build a calculator for fractions using `struct Frac { long long num, den; };`. Support `+ - * /`. Always reduce the result, keep the denominator positive, and print a whole number when the denominator is 1. Dividing by a zero fraction prints `ERROR`.

**Input:** `q`, then `q` lines like `1/2 + 3/4`.

**Output:** one result per line: `num/den`, a whole number, or `ERROR`.

**Constraints:** 1 ≤ q ≤ 1000, |numerators| ≤ 10^6, 1 ≤ denominators ≤ 10^6

## Hints

1. Read with `scanf("%lld/%lld %c %lld/%lld", ...)`.
2. Write one `normalize` function: divide by the gcd of the absolute values, and if the denominator is negative, flip both signs.

```c starter
#include <stdio.h>

struct Frac { long long num, den; };

int main(void) {
    int q;
    scanf("%d", &q);
    while (q--) {
        struct Frac a, b;
        char op;
        scanf("%lld/%lld %c %lld/%lld", &a.num, &a.den, &op, &b.num, &b.den);
        /* compute, normalize, print */
    }
    return 0;
}
```

```c solution
#include <stdio.h>

struct Frac { long long num, den; };

static long long gcd(long long a, long long b) {
    if (a < 0) a = -a;
    if (b < 0) b = -b;
    while (b) { long long t = a % b; a = b; b = t; }
    return a;
}

static struct Frac normalize(struct Frac f) {
    long long g = gcd(f.num, f.den);
    if (g) { f.num /= g; f.den /= g; }
    if (f.den < 0) { f.num = -f.num; f.den = -f.den; }
    return f;
}

int main(void) {
    int q;
    if (scanf("%d", &q) != 1) return 1;
    while (q--) {
        struct Frac a, b, r;
        char op;
        if (scanf("%lld/%lld %c %lld/%lld", &a.num, &a.den, &op, &b.num, &b.den) != 5) return 1;
        if (op == '+') { r.num = a.num * b.den + b.num * a.den; r.den = a.den * b.den; }
        else if (op == '-') { r.num = a.num * b.den - b.num * a.den; r.den = a.den * b.den; }
        else if (op == '*') { r.num = a.num * b.num; r.den = a.den * b.den; }
        else {
            if (b.num == 0) { printf("ERROR\n"); continue; }
            r.num = a.num * b.den; r.den = a.den * b.num;
        }
        r = normalize(r);
        if (r.den == 1) printf("%lld\n", r.num);
        else printf("%lld/%lld\n", r.num, r.den);
    }
    return 0;
}
```

```test sample
4
1/2 + 3/4
2/3 - 2/3
3/4 * 4/9
1/2 / -3/4
---
5/4
0
1/3
-2/3
```

```test hidden
2
5/1 / 0/7
-7/3 + 1/3
---
ERROR
-2
```

```test hidden
2
1000000/1 * 1000000/1
1/1000000 - 1/999999
---
1000000000000
-1/999999000000
```
