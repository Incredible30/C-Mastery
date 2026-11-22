---
title: Extract Integers
difficulty: medium
topic: Streams
xp: 35
plan: free
---
Find every integer hidden in free text. An integer is a run of digits, and it is negative when a `-` comes **directly** before the first digit. Print each integer on its own line, then `count = N` and `sum = S`.

**Input:** any text.

**Output:** the integers, then the count and the sum.

**Constraints:** each integer fits in 15 digits, at most 10^5 characters

## Hints

1. Use a small state machine over `getchar()`. Remember the previous character so you know whether a `-` came right before a digit run.
2. When a digit run ends (or at EOF), emit the number.

```c starter
#include <ctype.h>
#include <stdio.h>

int main(void) {
    int c, prev = 0;
    while ((c = getchar()) != EOF) {
        /* build numbers digit by digit */
        prev = c;
    }
    return 0;
}
```

```c solution
#include <ctype.h>
#include <stdio.h>

static long long sum;
static int count;

static void emit(long long v) {
    printf("%lld\n", v);
    sum += v;
    count++;
}

int main(void) {
    int c, prev = 0, in = 0, neg = 0;
    long long cur = 0;
    while ((c = getchar()) != EOF) {
        if (isdigit(c)) {
            if (!in) { in = 1; neg = prev == '-'; cur = 0; }
            cur = cur * 10 + (c - '0');
        } else if (in) {
            emit(neg ? -cur : cur);
            in = 0;
        }
        prev = c;
    }
    if (in) emit(neg ? -cur : cur);
    printf("count = %d\nsum = %lld\n", count, sum);
    return 0;
}
```

```test sample
Order 66 shipped 3 boxes to room -12, cost 1500.
---
66
3
-12
1500
count = 4
sum = 1557
```

```test hidden
no numbers here
---
count = 0
sum = 0
```

```test hidden
a1b22c333
- 5 and -007 and x-9
---
1
22
333
5
-7
-9
count = 6
sum = 345
```
