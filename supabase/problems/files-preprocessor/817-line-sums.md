---
title: Sum of Each Line
difficulty: easy
topic: Streams
xp: 20
plan: free
---
Each line contains zero or more integers. Print the sum of each line. Read the line with `fgets`, then pull the numbers out of the buffer with `sscanf` and the `%n` conversion, which reports how many characters were consumed.

**Input:** lines of integers separated by spaces.

**Output:** one sum per line (0 for an empty line).

**Constraints:** at most 1000 lines of at most 1000 characters, |values| ≤ 10^9

## Hints

1. `const char *p = buf; int used; while (sscanf(p, "%lld%n", &x, &used) == 1) { sum += x; p += used; }`
2. `%n` doesn't count as a converted item, so the return value is still 1 per number.

```c starter
#include <stdio.h>
#include <string.h>

int main(void) {
    char buf[1002];
    while (fgets(buf, sizeof buf, stdin)) {
        /* sum the numbers on this line */
    }
    return 0;
}
```

```c solution
#include <stdio.h>
#include <string.h>

int main(void) {
    char buf[1002];
    while (fgets(buf, sizeof buf, stdin)) {
        const char *p = buf;
        long long x, sum = 0;
        int used;
        while (sscanf(p, "%lld%n", &x, &used) == 1) { sum += x; p += used; }
        printf("%lld\n", sum);
    }
    return 0;
}
```

```test sample
1 2 3
10 -4

1000000000 1000000000
---
6
6
0
2000000000
```

```test hidden
7
---
7
```

```test hidden
-1 -2 -3
0 0
---
-6
0
```
