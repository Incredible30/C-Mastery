---
title: Shift a Letter
difficulty: medium
topic: Type Casting
xp: 20
plan: free
---
Shift a lowercase letter forward by `k` places in the alphabet, wrapping from `z` back to `a`. With k = 3, `a` becomes `d` and `y` becomes `b`. Also print the letter's position in the alphabet, counting `a` as 1.

**Input:** a lowercase letter and an integer `k`.

**Output:** the letter's position, then the shifted letter, separated by a space.

**Constraints:** 0 ≤ k ≤ 10^9

## Hints

1. `c - 'a'` turns a letter into 0–25. Add `k`, then use `% 26` to wrap around.
2. Add `'a'` back to turn the number into a letter again.

```c starter
#include <stdio.h>

int main(void) {
    char c;
    int k;
    scanf(" %c %d", &c, &k);
    /* print the position and the shifted letter */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    char c;
    int k;
    if (scanf(" %c %d", &c, &k) != 2) return 1;
    int pos = c - 'a';
    printf("%d %c\n", pos + 1, 'a' + (pos + k % 26) % 26);
    return 0;
}
```

```test sample
a 3
---
1 d
```

```test sample
y 3
---
25 b
```

```test hidden
z 0
---
26 z
```

```test hidden
m 26
---
13 m
```

```test hidden
q 1000000000
---
17 c
```
