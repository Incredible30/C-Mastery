---
title: Generate Balanced Parentheses
difficulty: hard
topic: Recursion
xp: 45
plan: free
---
Print every balanced string made of `n` pairs of parentheses, in alphabetical order (where `(` comes before `)`), one per line, then the total count.

For n = 2: `(())` and `()()`.

**Input:** one integer `n`.

**Output:** the strings, then the count on the last line.

**Constraints:** 1 ≤ n ≤ 7

## Hints

1. Build the string left to right, tracking how many `(` and `)` you've used.
2. You may add `(` while you've used fewer than `n`, and `)` while there are more open than closed. Trying `(` first gives alphabetical order.

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
static char buf[15];

static void gen(int pos, int open, int closed) {
    if (pos == 2 * n) {
        buf[pos] = '\0';
        printf("%s\n", buf);
        count++;
        return;
    }
    if (open < n) { buf[pos] = '('; gen(pos + 1, open + 1, closed); }
    if (closed < open) { buf[pos] = ')'; gen(pos + 1, open, closed + 1); }
}

int main(void) {
    if (scanf("%d", &n) != 1) return 1;
    gen(0, 0, 0);
    printf("%d\n", count);
    return 0;
}
```

```test sample
2
---
(())
()()
2
```

```test hidden
1
---
()
1
```

```test hidden
4
---
(((())))
((()()))
((())())
((()))()
(()(()))
(()()())
(()())()
(())(())
(())()()
()((()))
()(()())
()(())()
()()(())
()()()()
14
```
