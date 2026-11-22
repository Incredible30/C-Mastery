---
title: Delete Every Occurrence
difficulty: medium
topic: Linked Lists
xp: 30
plan: free
---
Remove every node holding the value `x` from a linked list, freeing each removed node. Deleting the head is the tricky case; a **pointer to a pointer** (`struct Node **pp`) handles it the same way as any other node.

**Input:** `n` and `x`, then `n` integers.

**Output:** the remaining list joined by ` -> `, or `EMPTY`.

**Constraints:** 1 ≤ n ≤ 10^5

## Hints

1. Start with `struct Node **pp = &head;`. `*pp` is the link that points at the current node.
2. If `(*pp)->val == x`, save the node, set `*pp = node->next`, and free it. Otherwise move on: `pp = &(*pp)->next;`.

```c starter
#include <stdio.h>
#include <stdlib.h>

struct Node { int val; struct Node *next; };

int main(void) {
    int n, x;
    struct Node *head = NULL, *tail = NULL;
    scanf("%d %d", &n, &x);
    for (int i = 0; i < n; i++) {
        struct Node *node = malloc(sizeof *node);
        scanf("%d", &node->val);
        node->next = NULL;
        if (tail) tail->next = node; else head = node;
        tail = node;
    }
    /* delete all x */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>

struct Node { int val; struct Node *next; };

int main(void) {
    int n, x;
    struct Node *head = NULL, *tail = NULL;
    if (scanf("%d %d", &n, &x) != 2) return 1;
    for (int i = 0; i < n; i++) {
        struct Node *node = malloc(sizeof *node);
        if (!node || scanf("%d", &node->val) != 1) return 1;
        node->next = NULL;
        if (tail) tail->next = node; else head = node;
        tail = node;
    }
    struct Node **pp = &head;
    while (*pp) {
        if ((*pp)->val == x) { struct Node *dead = *pp; *pp = dead->next; free(dead); }
        else pp = &(*pp)->next;
    }
    if (!head) printf("EMPTY\n");
    else {
        for (struct Node *p = head; p; p = p->next) printf(p == head ? "%d" : " -> %d", p->val);
        printf("\n");
    }
    while (head) { struct Node *next = head->next; free(head); head = next; }
    return 0;
}
```

```test sample
7 3
3 1 3 2 3 3 4
---
1 -> 2 -> 4
```

```test hidden
3 5
5 5 5
---
EMPTY
```

```test hidden
4 9
1 2 3 4
---
1 -> 2 -> 3 -> 4
```
