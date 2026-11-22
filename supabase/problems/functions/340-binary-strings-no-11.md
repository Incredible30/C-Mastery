---
title: Binary Strings Without 11
difficulty: hard
topic: Recursion
xp: 45
plan: free
---
Print all binary strings of length `n` that never have two `1`s next to each other, in increasing order, then their count.

For n = 3: `000 001 010 100 101`, count 5.

**Input:** one integer `n`.

**Output:** the strings one per line, then the count.

**Constraints:** 1 ≤ n ≤ 12

## Hints

1. Build the string one character at a time. You can always add `0`; you can add `1` only if the previous character isn't `1`.
2. Trying `0` before `1` produces the strings in increasing order. The count follows the Fibonacci pattern.

```c starter
#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    /* generate and print */
    return 0;
}
```

```c solution
#include <stdio.h>

static int n, count;
static char buf[13];

static void gen(int pos) {
    if (pos == n) {
        buf[n] = '\0';
        printf("%s\n", buf);
        count++;
        return;
    }
    buf[pos] = '0';
    gen(pos + 1);
    if (pos == 0 || buf[pos - 1] != '1') {
        buf[pos] = '1';
        gen(pos + 1);
    }
}

int main(void) {
    if (scanf("%d", &n) != 1) return 1;
    gen(0);
    printf("%d\n", count);
    return 0;
}
```

```test sample
3
---
000
001
010
100
101
5
```

```test hidden
1
---
0
1
2
```

```test hidden
5
---
00000
00001
00010
00100
00101
01000
01001
01010
10000
10001
10010
10100
10101
13
```
