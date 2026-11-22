---
title: Digit Frequency
difficulty: medium
topic: Loops
xp: 25
plan: free
---
Count how many times each digit 0–9 appears in a non-negative integer. Print only the digits that appear, in increasing order, as `digit:count`, separated by spaces.

For 1213, print `1:2 2:1 3:1`.

**Input:** one integer `n`.

**Output:** the digit counts as described.

**Constraints:** 0 ≤ n ≤ 10^18

## Hints

1. Keep ten counters in an array `count[10]`, all starting at 0.
2. Peel off digits with `% 10` and `/ 10`. Use a `do-while` so that 0 is counted as one digit 0.

```c starter
#include <stdio.h>

int main(void) {
    long long n;
    scanf("%lld", &n);
    int count[10] = {0};
    /* count and print */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    long long n;
    if (scanf("%lld", &n) != 1) return 1;
    int count[10] = {0};
    do {
        count[n % 10]++;
        n /= 10;
    } while (n > 0);
    int first = 1;
    for (int d = 0; d < 10; d++) {
        if (count[d]) {
            printf(first ? "%d:%d" : " %d:%d", d, count[d]);
            first = 0;
        }
    }
    printf("\n");
    return 0;
}
```

```test sample
1213
---
1:2 2:1 3:1
```

```test hidden
0
---
0:1
```

```test hidden
1000000000000000000
---
0:18 1:1
```

```test hidden
9876543210
---
0:1 1:1 2:1 3:1 4:1 5:1 6:1 7:1 8:1 9:1
```
