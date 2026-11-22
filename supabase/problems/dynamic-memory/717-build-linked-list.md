---
title: Build a Linked List
difficulty: easy
topic: Linked Lists
xp: 20
plan: free
---
A **linked list** is a chain of heap-allocated nodes, each holding a value and a pointer to the next node. Build a list by appending `n` values at the end, then walk it to print the values and their sum. Free every node at the end.

**Input:** `n`, then `n` integers.

**Output:** the values joined by ` -> `, then the sum on the next line.

**Constraints:** 1 ≤ n ≤ 10^5

## Hints

1. `struct Node { int val; struct Node *next; };`. Keep both `head` and `tail` pointers so appending is O(1).
2. Walk with `for (struct Node *p = head; p; p = p->next)`. To free, save `p->next` **before** calling `free(p)`.

```c starter
#include <stdio.h>
#include <stdlib.h>

struct Node { int val; struct Node *next; };

int main(void) {
    int n;
    struct Node *head = NULL, *tail = NULL;
    scanf("%d", &n);
    /* append n nodes, print, free */
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
    long long sum = 0;
    for (struct Node *p = head; p; p = p->next) {
        printf(p == head ? "%d" : " -> %d", p->val);
        sum += p->val;
    }
    printf("\n%lld\n", sum);
    while (head) { struct Node *next = head->next; free(head); head = next; }
    return 0;
}
```

```test sample
4
5 10 15 20
---
5 -> 10 -> 15 -> 20
50
```

```test hidden
1
-3
---
-3
-3
```

```test hidden
3
1000000000 1000000000 1000000000
---
1000000000 -> 1000000000 -> 1000000000
3000000000
```
