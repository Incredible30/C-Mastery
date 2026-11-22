---
title: Keep a List Sorted
difficulty: medium
topic: Linked Lists
xp: 25
plan: free
---
Insert values one at a time into a linked list, always placing each new node so the list stays in ascending order. Equal values go **after** existing equal ones. Print the final list.

**Input:** `n`, then `n` integers.

**Output:** the sorted list joined by ` -> `.

**Constraints:** 1 ≤ n ≤ 5000

## Hints

1. With a pointer-to-pointer, `struct Node **pp = &head;` walk forward while `*pp && (*pp)->val <= x`.
2. Then link the new node in: `node->next = *pp; *pp = node;`. This works for the head, middle and end alike.

```c starter
#include <stdio.h>
#include <stdlib.h>

struct Node { int val; struct Node *next; };

int main(void) {
    int n;
    struct Node *head = NULL;
    scanf("%d", &n);
    /* insert each value in sorted position */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>

struct Node { int val; struct Node *next; };

int main(void) {
    int n;
    struct Node *head = NULL;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) {
        struct Node *node = malloc(sizeof *node);
        if (!node || scanf("%d", &node->val) != 1) return 1;
        struct Node **pp = &head;
        while (*pp && (*pp)->val <= node->val) pp = &(*pp)->next;
        node->next = *pp;
        *pp = node;
    }
    for (struct Node *p = head; p; p = p->next) printf(p == head ? "%d" : " -> %d", p->val);
    printf("\n");
    while (head) { struct Node *next = head->next; free(head); head = next; }
    return 0;
}
```

```test sample
6
5 2 8 2 1 9
---
1 -> 2 -> 2 -> 5 -> 8 -> 9
```

```test hidden
1
0
---
0
```

```test hidden
4
4 3 2 1
---
1 -> 2 -> 3 -> 4
```
