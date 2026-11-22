---
title: Subarray With Given Sum
difficulty: hard
topic: Arrays
xp: 45
plan: pro
time_limit_ms: 1000
---
Given an array of **non-negative** integers and a target `s`, find the first contiguous subarray (the one that ends earliest, and among those the longest) whose sum is exactly `s`. Print its 1-based start and end positions, or `-1`.

**Input:** `n` and `s`, then `n` integers.

**Output:** `start end`, or `-1`.

**Constraints:** 1 ≤ n ≤ 100000, 0 ≤ values ≤ 10^9, 1 ≤ s ≤ 10^14. Must finish within 1 second.

## Hints

1. Use a sliding window with two indexes. Extend the right end one step at a time, adding the new element to a running sum.
2. While the sum is larger than `s`, remove elements from the left end. Since values are non-negative, this never skips an answer.

```c starter
#include <stdio.h>

long long a[100000];

int main(void) {
    int n;
    long long s;
    scanf("%d %lld", &n, &s);
    for (int i = 0; i < n; i++) scanf("%lld", &a[i]);
    /* sliding window */
    return 0;
}
```

```c solution
#include <stdio.h>

long long a[100000];

int main(void) {
    int n;
    long long s;
    if (scanf("%d %lld", &n, &s) != 2) return 1;
    for (int i = 0; i < n; i++) if (scanf("%lld", &a[i]) != 1) return 1;
    long long sum = 0;
    int left = 0;
    for (int right = 0; right < n; right++) {
        sum += a[right];
        while (sum > s && left <= right) sum -= a[left++];
        if (sum == s) { printf("%d %d\n", left + 1, right + 1); return 0; }
    }
    printf("-1\n");
    return 0;
}
```

```test sample
6 33
1 4 20 3 10 5
---
3 5
```

```test hidden
3 100
1 2 3
---
-1
```

```test hidden
5 5
5 0 0 0 0
---
1 1
```

```test hidden
4 2000000000
1000000000 1000000000 1000000000 1000000000
---
1 2
```
