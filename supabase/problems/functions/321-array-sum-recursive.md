---
title: Recursive Array Sum and Maximum
difficulty: medium
topic: Recursion
xp: 25
plan: free
---
Write two recursive functions: `long long sum(int a[], int n)` returns the sum of the first `n` elements, and `int max_of(int a[], int n)` returns the largest of them. No loops in either function.

**Input:** `n`, then `n` integers.

**Output:** the sum and the maximum, separated by a space.

**Constraints:** 1 ≤ n ≤ 1000, −10^9 ≤ each value ≤ 10^9

## Hints

1. `sum(a, n)` is `a[n - 1] + sum(a, n - 1)`, with `sum(a, 0) = 0`.
2. `max_of(a, 1)` is `a[0]`. For larger `n`, compare `a[n - 1]` with `max_of(a, n - 1)`.

```c starter
#include <stdio.h>

long long sum(int a[], int n) { return 0; }
int max_of(int a[], int n) { return a[0]; }

int main(void) {
    int n, a[1000];
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    printf("%lld %d\n", sum(a, n), max_of(a, n));
    return 0;
}
```

```c solution
#include <stdio.h>

long long sum(int a[], int n) {
    if (n == 0) return 0;
    return a[n - 1] + sum(a, n - 1);
}

int max_of(int a[], int n) {
    if (n == 1) return a[0];
    int rest = max_of(a, n - 1);
    return a[n - 1] > rest ? a[n - 1] : rest;
}

int main(void) {
    int n, a[1000];
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) if (scanf("%d", &a[i]) != 1) return 1;
    printf("%lld %d\n", sum(a, n), max_of(a, n));
    return 0;
}
```

```test sample
5
3 9 -2 7 1
---
18 9
```

```test hidden
1
-5
---
-5 -5
```

```test hidden
3
1000000000 1000000000 1000000000
---
3000000000 1000000000
```
