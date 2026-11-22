---
title: Queue With Linked Nodes
difficulty: medium
topic: Linked Lists
xp: 25
plan: free
---
Implement an unbounded queue with heap-allocated nodes and two pointers, `front` and `back`. Adding at the back and removing from the front are both O(1).

**Input:** `q`, then `q` commands: `enq x`, `deq`, `front` or `size`.

**Output:** `deq` prints the removed value, `front` the first value, `size` the count; `deq`/`front` on an empty queue print `EMPTY`.

**Constraints:** 1 ≤ q ≤ 10^5

## Hints

1. `enq`: make a node with `next = NULL`; if the queue is empty it becomes both `front` and `back`, otherwise `back->next = node; back = node;`.
2. `deq`: take the front, move `front` forward, and if the queue became empty set `back = NULL` too.

```c starter
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Node { int val; struct Node *next; };

int main(void) {
    struct Node *front = NULL, *back = NULL;
    int q, size = 0;
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

struct Node { int val; struct Node *next; };

int main(void) {
    struct Node *front = NULL, *back = NULL;
    int q, size = 0;
    char cmd[8];
    if (scanf("%d", &q) != 1) return 1;
    while (q--) {
        if (scanf("%7s", cmd) != 1) return 1;
        if (strcmp(cmd, "enq") == 0) {
            struct Node *n = malloc(sizeof *n);
            if (!n || scanf("%d", &n->val) != 1) return 1;
            n->next = NULL;
            if (back) back->next = n; else front = n;
            back = n;
            size++;
        } else if (strcmp(cmd, "size") == 0) printf("%d\n", size);
        else if (!front) printf("EMPTY\n");
        else if (strcmp(cmd, "deq") == 0) {
            struct Node *dead = front;
            printf("%d\n", dead->val);
            front = dead->next;
            if (!front) back = NULL;
            free(dead);
            size--;
        } else printf("%d\n", front->val);
    }
    while (front) { struct Node *next = front->next; free(front); front = next; }
    return 0;
}
```

```test sample
7
enq 4
enq 9
front
deq
size
deq
deq
---
4
4
1
9
EMPTY
```

```test hidden
3
front
size
deq
---
EMPTY
0
EMPTY
```

```test hidden
5
enq 1
deq
enq 2
front
size
---
1
2
1
```
