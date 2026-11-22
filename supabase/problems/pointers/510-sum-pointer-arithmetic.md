---
title: Sum With Pointer Arithmetic
difficulty: easy
topic: Pointer Arithmetic
xp: 15
plan: free
---
Write `long long sum(const int *begin, const int *end)` that adds every element from `begin` up to (but not including) `end`. Ranges given as two pointers like this are used all over C libraries.

**Input:** `n`, then `n` integers.

**Output:** their sum.

**Constraints:** 1 ≤ n ≤ 100000, |values| ≤ 10^9

## Hints

1. `main` calls `sum(a, a + n)`. `a + n` points one past the last element; it may be compared against but never dereferenced.
2. `while (begin < end) total += *begin++;`

```c starter
#include <stdio.h>

int a[100000];

long long sum(const int *begin, const int *end) {
    return 0;
}

int main(void) {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    printf("%lld\n", sum(a, a + n));
    return 0;
}
```

```c solution
#include <stdio.h>

int a[100000];

long long sum(const int *begin, const int *end) {
    long long total = 0;
    while (begin < end) total += *begin++;
    return total;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) if (scanf("%d", &a[i]) != 1) return 1;
    printf("%lld\n", sum(a, a + n));
    return 0;
}
```

```test sample
5
1 2 3 4 5
---
15
```

```test hidden
3
1000000000 1000000000 1000000000
---
3000000000
```

```test hidden
2
-7 7
---
0
```
