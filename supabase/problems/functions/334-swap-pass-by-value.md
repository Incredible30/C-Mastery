---
title: Pass by Value Puzzle
difficulty: medium
topic: Functions
xp: 20
plan: free
---
In C, functions get **copies** of their arguments. Complete `int bump(int x)` so it adds 10 to its parameter and returns the new value. In `main`, call it as `int r = bump(n);` and print `n` and `r` to show that `n` itself did not change. Then print the result of calling `bump` three times in a row on its own result: `bump(bump(bump(n)))`.

**Input:** one integer `n`.

**Output:** three numbers separated by spaces: `n` after the call, `r`, and the triple-call result.

**Constraints:** −10^9 ≤ n ≤ 10^9

## Hints

1. Changing `x` inside `bump` changes only the copy. `n` in `main` keeps its value.
2. Use `long long` if you're worried about overflow, though the limits fit in an `int` with room to spare.

```c starter
#include <stdio.h>

int bump(int x) {
    /* add 10 to x and return it */
    return x;
}

int main(void) {
    int n;
    scanf("%d", &n);
    int r = bump(n);
    printf("%d %d %d\n", n, r, bump(bump(bump(n))));
    return 0;
}
```

```c solution
#include <stdio.h>

int bump(int x) {
    x += 10;
    return x;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    int r = bump(n);
    printf("%d %d %d\n", n, r, bump(bump(bump(n))));
    return 0;
}
```

```test sample
5
---
5 15 35
```

```test hidden
0
---
0 10 30
```

```test hidden
-1000000000
---
-1000000000 -999999990 -999999970
```

```test hidden
1000000000
---
1000000000 1000000010 1000000030
```
