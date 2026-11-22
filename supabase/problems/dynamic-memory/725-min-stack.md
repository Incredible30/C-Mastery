---
title: Min Stack With Linked Nodes
difficulty: medium
topic: Linked Lists
xp: 30
plan: free
---
Build a stack from heap-allocated nodes that also reports its current **minimum** in constant time. Each node stores its value and the minimum of everything at or below it.

**Input:** `q`, then `q` commands: `push x`, `pop`, `top` or `min`.

**Output:** `pop` prints the removed value; `top` and `min` print those values; on an empty stack they print `EMPTY`.

**Constraints:** 1 ≤ q ≤ 10^5

## Hints

1. `struct Node { int val, min; struct Node *next; };`. When pushing, `min` is the smaller of `x` and the old top's `min`.
2. Push adds a node at the head; pop saves the value, moves the head forward and frees the old node.

```c starter
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Node { int val, min; struct Node *next; };

int main(void) {
    struct Node *top = NULL;
    int q;
    char cmd[8];
    scanf("%d", &q);
    while (q--) {
        scanf("%7s", cmd);
        /* handle command */
    }
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Node { int val, min; struct Node *next; };

int main(void) {
    struct Node *top = NULL;
    int q;
    char cmd[8];
    if (scanf("%d", &q) != 1) return 1;
    while (q--) {
        if (scanf("%7s", cmd) != 1) return 1;
        if (strcmp(cmd, "push") == 0) {
            struct Node *n = malloc(sizeof *n);
            if (!n || scanf("%d", &n->val) != 1) return 1;
            n->min = (top && top->min < n->val) ? top->min : n->val;
            n->next = top;
            top = n;
        } else if (!top) printf("EMPTY\n");
        else if (strcmp(cmd, "pop") == 0) {
            struct Node *dead = top;
            printf("%d\n", dead->val);
            top = dead->next;
            free(dead);
        } else if (strcmp(cmd, "top") == 0) printf("%d\n", top->val);
        else printf("%d\n", top->min);
    }
    while (top) { struct Node *next = top->next; free(top); top = next; }
    return 0;
}
```

```test sample
9
push 5
push 3
push 7
min
pop
pop
min
top
pop
---
3
7
3
5
5
5
```

```test hidden
2
min
pop
---
EMPTY
EMPTY
```

```test hidden
5
push 2
push 2
pop
min
top
---
2
2
2
```
