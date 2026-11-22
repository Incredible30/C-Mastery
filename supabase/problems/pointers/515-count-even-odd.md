---
title: Count Evens and Odds
difficulty: easy
topic: Pointers
xp: 15
plan: free
---
Complete `void count_parity(const int *arr, int n, int *evens, int *odds)` that counts the even and odd numbers in the array and stores both counts through the output pointers.

**Input:** `n`, then `n` integers.

**Output:** the number of even values and the number of odd values.

**Constraints:** 1 ≤ n ≤ 1000

## Hints

1. Set both outputs to 0 before the loop.
2. Increment through the pointer with parentheses: `(*evens)++`. Without them, `*evens++` moves the pointer instead.

```c starter
#include <stdio.h>

void count_parity(const int *arr, int n, int *evens, int *odds) {
}

int main(void) {
    int n, a[1000], e, o;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    count_parity(a, n, &e, &o);
    printf("%d %d\n", e, o);
    return 0;
}
```

```c solution
#include <stdio.h>

void count_parity(const int *arr, int n, int *evens, int *odds) {
    *evens = *odds = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] % 2 == 0) (*evens)++;
        else (*odds)++;
    }
}

int main(void) {
    int n, a[1000], e, o;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) if (scanf("%d", &a[i]) != 1) return 1;
    count_parity(a, n, &e, &o);
    printf("%d %d\n", e, o);
    return 0;
}
```

```test sample
6
1 2 3 4 5 6
---
3 3
```

```test hidden
3
-3 -2 0
---
2 1
```

```test hidden
1
7
---
0 1
```
