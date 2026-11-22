---
title: Second Largest Element
difficulty: medium
topic: Arrays
module: arrays-strings
xp: 35
plan: pro
---
Given `n` integers, print the second largest **distinct** value. If there isn't one (for example, all values are equal), print `-1`.

Try to solve it in a single pass, without sorting.

**Input:** the first line has `n`. The second line has `n` integers.

**Output:** the second largest distinct value, or `-1`.

**Constraints:** 1 ≤ n ≤ 100000, −10^9 ≤ each value ≤ 10^9

## Hints

1. Keep two variables: the largest value seen so far and the second largest.
2. When you find a new largest, the old largest becomes the second largest.
3. Skip values equal to the current largest, so duplicates don't count. Use a flag to know whether a second value was ever found, because −1 itself can be a valid answer.

```c starter
#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        long long x;
        scanf("%lld", &x);
        /* track the largest and second largest */
    }
    /* print the answer */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    long long first = 0, second = 0;
    int have_first = 0, have_second = 0;
    for (int i = 0; i < n; i++) {
        long long x;
        if (scanf("%lld", &x) != 1) return 1;
        if (!have_first || x > first) {
            if (have_first) { second = first; have_second = 1; }
            first = x;
            have_first = 1;
        } else if (x != first && (!have_second || x > second)) {
            second = x;
            have_second = 1;
        }
    }
    if (have_second) printf("%lld\n", second);
    else printf("-1\n");
    return 0;
}
```

```test sample
5
12 35 1 10 34
---
34
```

```test sample
3
7 7 7
---
-1
```

```test hidden
4
10 10 9 8
---
9
```

```test hidden
1
5
---
-1
```

```test hidden
3
-5 -1 -9
---
-5
```

```test hidden
5
1 2 3 4 5
---
4
```
