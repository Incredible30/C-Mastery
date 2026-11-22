---
title: Count Inversions
difficulty: hard
topic: Sorting
xp: 50
plan: pro
time_limit_ms: 1000
---
An **inversion** is a pair of positions `i < j` with `a[i] > a[j]`. It measures how far an array is from sorted. Count the inversions. With up to 100000 elements, checking every pair is too slow.

**Input:** `n`, then `n` integers.

**Output:** the number of inversions.

**Constraints:** 1 ≤ n ≤ 100000. Must finish within 1 second.

## Hints

1. Use **merge sort**. While merging two sorted halves, whenever you take an element from the right half, every element still waiting in the left half forms an inversion with it.
2. Add `mid - i + 1` (the remaining left-half elements) at that moment. The count can reach about 5 × 10^9, so use `long long`.

```c starter
#include <stdio.h>

int a[100000], tmp[100000];

int main(void) {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    /* count inversions with merge sort */
    return 0;
}
```

```c solution
#include <stdio.h>

int a[100000], tmp[100000];

static long long sort_count(int lo, int hi) {
    if (lo >= hi) return 0;
    int mid = (lo + hi) / 2;
    long long inv = sort_count(lo, mid) + sort_count(mid + 1, hi);
    int i = lo, j = mid + 1, k = lo;
    while (i <= mid && j <= hi) {
        if (a[i] <= a[j]) tmp[k++] = a[i++];
        else { tmp[k++] = a[j++]; inv += mid - i + 1; }
    }
    while (i <= mid) tmp[k++] = a[i++];
    while (j <= hi) tmp[k++] = a[j++];
    for (k = lo; k <= hi; k++) a[k] = tmp[k];
    return inv;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) if (scanf("%d", &a[i]) != 1) return 1;
    printf("%lld\n", sort_count(0, n - 1));
    return 0;
}
```

```test sample
5
2 4 1 3 5
---
3
```

```test hidden
1
7
---
0
```

```test hidden
6
6 5 4 3 2 1
---
15
```

```test hidden
5
1 1 1 1 1
---
0
```
