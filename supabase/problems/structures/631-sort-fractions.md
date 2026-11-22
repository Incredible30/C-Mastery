---
title: Sort Fractions by Value
difficulty: medium
topic: Arrays of Structures
xp: 30
plan: free
---
Sort fractions from smallest to largest **without converting to floating point**. Fractions with equal value keep their input order. Print each in lowest terms.

**Input:** `n`, then `n` fractions as `num/den`.

**Output:** the sorted, reduced fractions on one line.

**Constraints:** 1 ≤ n ≤ 1000, |num| ≤ 10^6, 1 ≤ den ≤ 10^6

## Hints

1. With positive denominators, a/b < c/d exactly when a·d < c·b. Compare in `long long`.
2. `qsort` isn't stable, so use insertion sort (which is), or add the original index to the structure as a tie-breaker.

```c starter
#include <stdio.h>

struct Frac { long long num, den; };

struct Frac f[1000];

int main(void) {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%lld/%lld", &f[i].num, &f[i].den);
    /* reduce, sort, print */
    return 0;
}
```

```c solution
#include <stdio.h>

struct Frac { long long num, den; };

struct Frac f[1000];

static long long gcd(long long a, long long b) {
    if (a < 0) a = -a;
    while (b) { long long t = a % b; a = b; b = t; }
    return a;
}

static int less(struct Frac a, struct Frac b) { return a.num * b.den < b.num * a.den; }

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) {
        if (scanf("%lld/%lld", &f[i].num, &f[i].den) != 2) return 1;
        long long g = gcd(f[i].num, f[i].den);
        f[i].num /= g; f[i].den /= g;
    }
    for (int i = 1; i < n; i++) {
        struct Frac key = f[i];
        int j = i - 1;
        while (j >= 0 && less(key, f[j])) { f[j + 1] = f[j]; j--; }
        f[j + 1] = key;
    }
    for (int i = 0; i < n; i++) printf(i ? " %lld/%lld" : "%lld/%lld", f[i].num, f[i].den);
    printf("\n");
    return 0;
}
```

```test sample
5
1/2
-3/4
2/3
2/4
0/5
---
-3/4 0/1 1/2 1/2 2/3
```

```test hidden
1
6/8
---
3/4
```

```test hidden
3
999999/1000000
1000000/999999
1/1
---
999999/1000000 1/1 1000000/999999
```
