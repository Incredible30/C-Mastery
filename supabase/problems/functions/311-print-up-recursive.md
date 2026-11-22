---
title: Count Up and Down With Recursion
difficulty: easy
topic: Recursion
xp: 15
plan: free
---
Without any loop, print the numbers from 1 to `n` on one line, then from `n` down to 1 on the next line. Write two recursive functions, `up(int i, int n)` and `down(int i)`.

**Input:** one integer `n`.

**Output:** two lines of numbers separated by spaces.

**Constraints:** 1 ≤ n ≤ 1000

## Hints

1. `down(i)` prints `i`, then calls `down(i - 1)`, stopping when `i` reaches 0.
2. `up(i, n)` prints `i` and calls `up(i + 1, n)` until `i > n`. Print a space before every number except the first.

```c starter
#include <stdio.h>

void up(int i, int n) { /* print i..n */ }
void down(int i) { /* print i..1 */ }

int main(void) {
    int n;
    scanf("%d", &n);
    up(1, n);
    printf("\n");
    down(n);
    printf("\n");
    return 0;
}
```

```c solution
#include <stdio.h>

void up(int i, int n) {
    if (i > n) return;
    printf(i > 1 ? " %d" : "%d", i);
    up(i + 1, n);
}

void down(int i) {
    if (i == 0) return;
    printf("%d", i);
    if (i > 1) printf(" ");
    down(i - 1);
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    up(1, n);
    printf("\n");
    down(n);
    printf("\n");
    return 0;
}
```

```test sample
5
---
1 2 3 4 5
5 4 3 2 1
```

```test hidden
1
---
1
1
```

```test hidden
12
---
1 2 3 4 5 6 7 8 9 10 11 12
12 11 10 9 8 7 6 5 4 3 2 1
```
