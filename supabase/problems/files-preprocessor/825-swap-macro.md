---
title: A Safe SWAP Macro
difficulty: medium
topic: Preprocessor
xp: 35
plan: free
---
Write a macro `SWAP(T, a, b)` that swaps two variables of type `T`. Wrap its body in `do { ... } while (0)` so it behaves like a single statement, even after an `if` with no braces.

Use it twice: first to bubble-sort `n` integers (count how many swaps happen), then to swap two doubles `x` and `y` **only if** `x < y`.

**Input:** `n`, then `n` integers, then two doubles `x y`.

**Output:** the sorted integers, then `swaps: k`, then `x y` with 2 decimals each (the larger one first).

**Constraints:** 1 ≤ n ≤ 1000

## Hints

1. `#define SWAP(T, a, b) do { T tmp_ = (a); (a) = (b); (b) = tmp_; } while (0)`
2. Without the `do/while`, `if (x < y) SWAP(double, x, y); else ...` would not compile, because the `;` after `}` ends the `if`.

```c starter
#include <stdio.h>

/* #define SWAP(T, a, b) ... */

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    int a[1000];
    for (int i = 0; i < n; i++)
        if (scanf("%d", &a[i]) != 1) return 1;
    double x, y;
    if (scanf("%lf %lf", &x, &y) != 2) return 1;
    /* bubble sort with SWAP, then conditionally swap x and y */
    return 0;
}
```

```c solution
#include <stdio.h>

#define SWAP(T, a, b) do { T tmp_ = (a); (a) = (b); (b) = tmp_; } while (0)

int main(void) {
    int n;
    if (scanf("%d", &n) != 1 || n < 1 || n > 1000) return 1;
    int a[1000];
    for (int i = 0; i < n; i++)
        if (scanf("%d", &a[i]) != 1) return 1;
    double x, y;
    if (scanf("%lf %lf", &x, &y) != 2) return 1;
    long swaps = 0;
    for (int i = 0; i < n - 1; i++)
        for (int j = 0; j < n - 1 - i; j++)
            if (a[j] > a[j + 1]) {
                SWAP(int, a[j], a[j + 1]);
                swaps++;
            }
    if (x < y) SWAP(double, x, y);
    for (int i = 0; i < n; i++) printf(i ? " %d" : "%d", a[i]);
    printf("\nswaps: %ld\n%.2f %.2f\n", swaps, x, y);
    return 0;
}
```

```test sample
5
4 1 3 5 2
1.5 2.25
---
1 2 3 4 5
swaps: 5
2.25 1.50
```

```test hidden
3
1 2 3
9.0 -1.0
---
1 2 3
swaps: 0
9.00 -1.00
```

```test hidden
4
7 7 -2 7
-0.5 -0.25
---
-2 7 7 7
swaps: 2
-0.25 -0.50
```
