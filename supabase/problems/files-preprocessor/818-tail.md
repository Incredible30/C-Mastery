---
title: Tail
difficulty: medium
topic: Streams
xp: 35
plan: free
---
Write a tiny `tail`. The first line holds `N`. Print the last `N` lines of the text that follows (or all of them if there are fewer). You don't know how many lines are coming, so keep only the most recent `N` in a **ring buffer** instead of storing everything.

**Input:** `N` on the first line, then any number of lines.

**Output:** the last `N` lines, in their original order.

**Constraints:** 1 ≤ N ≤ 100, lines of at most 1000 characters, up to 100000 lines

## Hints

1. Store line number `k` in slot `k % N`. After reading `count` lines, the oldest kept line is `max(0, count - N)`.
2. Strip the newline with `buf[strcspn(buf, "\r\n")] = '\0';` so every line prints the same way with `puts`.

```c starter
#include <stdio.h>
#include <string.h>

#define MAXN 100
#define LEN 1002

static char ring[MAXN][LEN];

int main(void) {
    char buf[LEN];
    int n;
    if (!fgets(buf, sizeof buf, stdin) || sscanf(buf, "%d", &n) != 1) return 1;
    /* read the remaining lines into the ring buffer, then print the last n */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <string.h>

#define MAXN 100
#define LEN 1002

static char ring[MAXN][LEN];

int main(void) {
    char buf[LEN];
    int n;
    if (!fgets(buf, sizeof buf, stdin) || sscanf(buf, "%d", &n) != 1 || n < 1) return 1;
    long count = 0;
    while (fgets(buf, sizeof buf, stdin)) {
        buf[strcspn(buf, "\r\n")] = '\0';
        strcpy(ring[count % n], buf);
        count++;
    }
    long start = count > n ? count - n : 0;
    for (long i = start; i < count; i++) puts(ring[i % n]);
    return 0;
}
```

```test sample
3
alpha
beta
gamma
delta
epsilon
---
gamma
delta
epsilon
```

```test hidden
5
only
two
---
only
two
```

```test hidden
1
first line
second line
the very last line
---
the very last line
```

```test hidden
2
a

b
c
---
b
c
```
