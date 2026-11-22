---
title: Ticket Counter With Static
difficulty: easy
topic: Scope & Storage
xp: 15
plan: free
---
A token machine hands out ticket numbers starting from `s`. Write `int next_ticket(int start)` that uses a `static` variable: the first call returns `start`, and every later call returns one more than the previous call (ignoring its argument).

Call it `n` times and print the tickets.

**Input:** two integers `s` and `n`.

**Output:** the `n` ticket numbers on one line, separated by spaces.

**Constraints:** 1 ≤ s ≤ 10^6, 1 ≤ n ≤ 1000

## Hints

1. A `static` local variable keeps its value between calls, and is initialised only once.
2. Keep a static flag to know whether this is the first call, and a static counter for the last ticket.

```c starter
#include <stdio.h>

int next_ticket(int start) {
    /* use static variables */
    return start;
}

int main(void) {
    int s, n;
    scanf("%d %d", &s, &n);
    for (int i = 0; i < n; i++) printf(i ? " %d" : "%d", next_ticket(s));
    printf("\n");
    return 0;
}
```

```c solution
#include <stdio.h>

int next_ticket(int start) {
    static int started = 0, last = 0;
    if (!started) {
        started = 1;
        last = start;
    } else {
        last++;
    }
    return last;
}

int main(void) {
    int s, n;
    if (scanf("%d %d", &s, &n) != 2) return 1;
    for (int i = 0; i < n; i++) printf(i ? " %d" : "%d", next_ticket(s));
    printf("\n");
    return 0;
}
```

```test sample
100 4
---
100 101 102 103
```

```test hidden
1 1
---
1
```

```test hidden
1000000 6
---
1000000 1000001 1000002 1000003 1000004 1000005
```
