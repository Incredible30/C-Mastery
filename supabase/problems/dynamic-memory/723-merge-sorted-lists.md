---
title: Merge Two Sorted Lists
difficulty: medium
topic: Linked Lists
xp: 30
plan: free
---
Merge two sorted linked lists into one sorted list by **relinking** the existing nodes (no new nodes). When values are equal, the node from the first list comes first.

**Input:** `n` and `n` sorted integers, then `m` and `m` sorted integers.

**Output:** the merged list joined by ` -> `.

**Constraints:** 1 ≤ n, m ≤ 10^5

## Hints

1. Use a **dummy** node on the stack as the start of the result, and a `tail` pointer that always points at the last node added.
2. Attach the smaller head, advance that list, and when one list runs out attach the rest of the other in one step.

```c starter
#include <stdio.h>
#include <stdlib.h>

struct Node { int val; struct Node *next; };

static struct Node *read_list(void) {
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
    return head;
}

struct Node *merge(struct Node *a, struct Node *b) {
    return a;
}

int main(void) {
    struct Node *a = read_list(), *b = read_list();
    struct Node *m = merge(a, b);
    for (struct Node *p = m; p; p = p->next) printf(p == m ? "%d" : " -> %d", p->val);
    printf("\n");
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>

struct Node { int val; struct Node *next; };

static struct Node *read_list(void) {
    int n;
    struct Node *head = NULL, *tail = NULL;
    if (scanf("%d", &n) != 1) exit(1);
    for (int i = 0; i < n; i++) {
        struct Node *node = malloc(sizeof *node);
        if (!node || scanf("%d", &node->val) != 1) exit(1);
        node->next = NULL;
        if (tail) tail->next = node; else head = node;
        tail = node;
    }
    return head;
}

struct Node *merge(struct Node *a, struct Node *b) {
    struct Node dummy = {0, NULL}, *tail = &dummy;
    while (a && b) {
        if (a->val <= b->val) { tail->next = a; a = a->next; }
        else { tail->next = b; b = b->next; }
        tail = tail->next;
    }
    tail->next = a ? a : b;
    return dummy.next;
}

int main(void) {
    struct Node *a = read_list(), *b = read_list();
    struct Node *m = merge(a, b);
    for (struct Node *p = m; p; p = p->next) printf(p == m ? "%d" : " -> %d", p->val);
    printf("\n");
    while (m) { struct Node *next = m->next; free(m); m = next; }
    return 0;
}
```

```test sample
3
1 4 7
4
2 4 6 8
---
1 -> 2 -> 4 -> 4 -> 6 -> 7 -> 8
```

```test hidden
1
5
1
5
---
5 -> 5
```

```test hidden
2
10 20
3
1 2 3
---
1 -> 2 -> 3 -> 10 -> 20
```
