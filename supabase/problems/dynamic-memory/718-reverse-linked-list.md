---
title: Reverse a Linked List
difficulty: medium
topic: Linked Lists
xp: 25
plan: free
---
Build a linked list from the input, then reverse it **by relinking the nodes** (no new nodes, no array), and print it.

**Input:** `n`, then `n` integers.

**Output:** the reversed list joined by ` -> `.

**Constraints:** 1 ≤ n ≤ 10^5

## Hints

1. Walk the list with three pointers: `prev` (starts `NULL`), `cur` and `next`.
2. At each step: `next = cur->next; cur->next = prev; prev = cur; cur = next;`. At the end `prev` is the new head.

```c starter
#include <stdio.h>
#include <stdlib.h>

struct Node { int val; struct Node *next; };

struct Node *reverse(struct Node *head) {
    return head;
}

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
    head = reverse(head);
    for (struct Node *p = head; p; p = p->next) printf(p == head ? "%d" : " -> %d", p->val);
    printf("\n");
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>

struct Node { int val; struct Node *next; };

struct Node *reverse(struct Node *head) {
    struct Node *prev = NULL, *cur = head;
    while (cur) {
        struct Node *next = cur->next;
        cur->next = prev;
        prev = cur;
        cur = next;
    }
    return prev;
}

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
    head = reverse(head);
    for (struct Node *p = head; p; p = p->next) printf(p == head ? "%d" : " -> %d", p->val);
    printf("\n");
    while (head) { struct Node *next = head->next; free(head); head = next; }
    return 0;
}
```

```test sample
5
1 2 3 4 5
---
5 -> 4 -> 3 -> 2 -> 1
```

```test hidden
1
42
---
42
```

```test hidden
2
-1 1
---
1 -> -1
```
