---
title: Kaprekar's Routine
difficulty: hard
topic: Loops
xp: 45
plan: free
---
Take a four-digit number whose digits are not all the same. Arrange its digits in descending order and in ascending order, subtract the smaller from the larger, and repeat with the result, always keeping four digits (pad with leading zeros). Indian mathematician D. R. Kaprekar found that you always reach **6174** within 7 steps.

Print the number of steps needed to reach 6174. If the input is already 6174, print 0.

For 3524: 5432 − 2345 = 3087, then 8730 − 0378 = 8352, then 8532 − 2358 = 6174. That's 3 steps.

**Input:** one integer `n` (it may be written with fewer than 4 digits, such as 21, meaning 0021).

**Output:** the number of steps.

**Constraints:** 1 ≤ n ≤ 9998, and n's four digits (with leading zeros) are not all equal.

## Hints

1. Each step, count how many of each digit 0–9 the number has. Building the largest number means taking digits from 9 down to 0; the smallest, from 0 up to 9.
2. Repeat with `n = largest − smallest` until `n == 6174`, counting steps.

```c starter
#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    int steps = 0;
    /* repeat until n is 6174 */
    printf("%d\n", steps);
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    int steps = 0;
    while (n != 6174) {
        int count[10] = {0}, t = n;
        for (int i = 0; i < 4; i++) { count[t % 10]++; t /= 10; }
        int big = 0, small = 0;
        for (int d = 9; d >= 0; d--) for (int k = 0; k < count[d]; k++) big = big * 10 + d;
        for (int d = 0; d <= 9; d++) for (int k = 0; k < count[d]; k++) small = small * 10 + d;
        n = big - small;
        steps++;
    }
    printf("%d\n", steps);
    return 0;
}
```

```test sample
3524
---
3
```

```test hidden
6174
---
0
```

```test hidden
21
---
3
```

```test hidden
9998
---
5
```

```test hidden
1000
---
5
```
