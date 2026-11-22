---
title: Rotate an Array
difficulty: medium
topic: Arrays
module: arrays-strings
xp: 30
plan: free
---
Rotate an array of `n` integers to the right by `k` positions and print the result.

Rotating `1 2 3 4 5` right by 2 gives `4 5 1 2 3`: each element moves 2 places right, and elements that fall off the end wrap around to the front.

**Input:** the first line has `n` and `k`. The second line has `n` integers.

**Output:** the rotated array on one line, separated by spaces.

**Constraints:** 1 ≤ n ≤ 100000, 0 ≤ k ≤ 10^9

## Hints

1. Rotating by `n` gives back the same array, so only `k % n` matters.
2. The element at index `i` moves to index `(i + k) % n`. Fill a second array using that rule.
3. Challenge: do it in place by reversing the whole array, then reversing the first `k` and the last `n - k` elements.

```c starter
#include <stdio.h>

int a[100000], out[100000];

int main(void) {
    int n;
    long long k;
    scanf("%d %lld", &n, &k);
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    /* rotate right by k and print */
    return 0;
}
```

```c solution
#include <stdio.h>

int a[100000], out[100000];

int main(void) {
    int n;
    long long k;
    if (scanf("%d %lld", &n, &k) != 2) return 1;
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    int shift = (int)(k % n);
    for (int i = 0; i < n; i++) out[(i + shift) % n] = a[i];
    for (int i = 0; i < n; i++) printf(i ? " %d" : "%d", out[i]);
    printf("\n");
    return 0;
}
```

```test sample
5 2
1 2 3 4 5
---
4 5 1 2 3
```

```test sample
3 0
7 8 9
---
7 8 9
```

```test hidden
1 1000000000
42
---
42
```

```test hidden
4 6
10 20 30 40
---
30 40 10 20
```

```test hidden
6 1
-1 -2 -3 -4 -5 -6
---
-6 -1 -2 -3 -4 -5
```
