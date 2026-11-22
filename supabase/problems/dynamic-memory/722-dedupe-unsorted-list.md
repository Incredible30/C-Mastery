---
title: Remove Duplicates From a List
difficulty: medium
topic: Linked Lists
xp: 25
plan: free
---
Remove repeated values from an **unsorted** linked list, keeping only the first occurrence of each value, and free the removed nodes.

**Input:** `n`, then `n` integers.

**Output:** the list after removing duplicates, joined by ` -> `.

**Constraints:** 1 ≤ n ≤ 5000

## Hints

1. For each node `p`, scan the rest of the list with a runner and unlink any later node with the same value.
2. Unlinking needs the node **before** the one being removed: check `runner->next->val` and set `runner->next = runner->next->next`.

```c starter
#include <stdio.h>
#include <stdlib.h>

struct Node { int val; struct Node *next; };

int main(void) {
    int n;
    struct Node *head = NULL, *tail = NULL;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        struct Node *node = malloc(sizeof *node);
        scanf("%d", &node->val);
        node->next = NULL;
        if (tail) tail->next = node; else head = node;
        tail = node;
    }
    /* remove duplicates */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>

struct Node { int val; struct Node *next; };

int main(void) {
    int n;
    struct Node *head = NULL, *tail = NULL;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) {
        struct Node *node = malloc(sizeof *node);
        if (!node || scanf("%d", &node->val) != 1) return 1;
        node->next = NULL;
        if (tail) tail->next = node; else head = node;
        tail = node;
    }
    for (struct Node *p = head; p; p = p->next) {
        struct Node *r = p;
        while (r->next) {
            if (r->next->val == p->val) { struct Node *dead = r->next; r->next = dead->next; free(dead); }
            else r = r->next;
        }
    }
    for (struct Node *p = head; p; p = p->next) printf(p == head ? "%d" : " -> %d", p->val);
    printf("\n");
    while (head) { struct Node *next = head->next; free(head); head = next; }
    return 0;
}
```

```test sample
8
4 2 4 1 2 2 5 1
---
4 -> 2 -> 1 -> 5
```

```test hidden
3
7 7 7
---
7
```

```test hidden
4
1 2 3 4
---
1 -> 2 -> 3 -> 4
```
