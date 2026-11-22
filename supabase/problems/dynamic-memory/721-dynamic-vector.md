---
title: A Growable Vector
difficulty: medium
topic: realloc
xp: 30
plan: free
---
Build a growable array type: `struct Vec { int *data; size_t size, cap; };`. Capacity starts at 0 and **doubles** when a push needs room (0 → 1 → 2 → 4 → 8 …). Popping never shrinks it.

**Input:** `q`, then `q` commands: `push x`, `pop`, `get i` (0-based), `size` or `cap`.

**Output:** `pop` prints the removed value or `EMPTY`; `get` prints the value or `OUT OF RANGE`; `size` and `cap` print those numbers.

**Constraints:** 1 ≤ q ≤ 10^5

## Hints

1. In `push`: if `size == cap`, set `new_cap = cap ? cap * 2 : 1` and `realloc` to it. `realloc(NULL, n)` behaves like `malloc(n)`.
2. `get i` is valid when `i < size`. Free `data` at the end.

```c starter
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Vec { int *data; size_t size, cap; };

int main(void) {
    struct Vec v = {NULL, 0, 0};
    int q;
    char cmd[8];
    scanf("%d", &q);
    while (q--) {
        scanf("%7s", cmd);
        /* handle command */
    }
    free(v.data);
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Vec { int *data; size_t size, cap; };

static int push(struct Vec *v, int x) {
    if (v->size == v->cap) {
        size_t nc = v->cap ? v->cap * 2 : 1;
        int *t = realloc(v->data, nc * sizeof *t);
        if (!t) return 0;
        v->data = t;
        v->cap = nc;
    }
    v->data[v->size++] = x;
    return 1;
}

int main(void) {
    struct Vec v = {NULL, 0, 0};
    int q;
    char cmd[8];
    if (scanf("%d", &q) != 1) return 1;
    while (q--) {
        if (scanf("%7s", cmd) != 1) return 1;
        if (strcmp(cmd, "push") == 0) {
            int x;
            if (scanf("%d", &x) != 1 || !push(&v, x)) return 1;
        } else if (strcmp(cmd, "pop") == 0) {
            if (v.size == 0) printf("EMPTY\n");
            else printf("%d\n", v.data[--v.size]);
        } else if (strcmp(cmd, "get") == 0) {
            long long i;
            if (scanf("%lld", &i) != 1) return 1;
            if (i < 0 || (size_t)i >= v.size) printf("OUT OF RANGE\n");
            else printf("%d\n", v.data[i]);
        } else if (strcmp(cmd, "size") == 0) printf("%zu\n", v.size);
        else printf("%zu\n", v.cap);
    }
    free(v.data);
    return 0;
}
```

```test sample
9
cap
push 10
push 20
push 30
cap
get 1
pop
size
get 2
---
0
4
20
30
2
OUT OF RANGE
```

```test hidden
3
pop
get 0
size
---
EMPTY
OUT OF RANGE
0
```

```test hidden
7
push 1
push 2
push 3
push 4
push 5
cap
get -1
---
8
OUT OF RANGE
```
