---
title: Middle of a Linked List
difficulty: medium
topic: Linked Lists
xp: 25
plan: free
---
Find the middle node of a linked list in **one pass** without counting first. For an even number of nodes, report the second of the two middle nodes.

**Input:** `n`, then `n` integers.

**Output:** the middle node's value and its 1-based position.

**Constraints:** 1 ≤ n ≤ 10^5

## Hints

1. Move a `slow` pointer one step and a `fast` pointer two steps at a time.
2. Loop `while (fast && fast->next)`. When it ends, `slow` is at the middle.

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
    /* slow and fast pointers */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>

struct Node { int val; struct Node *next; };

int main(void) {
    int n, pos = 1;
    struct Node *head = NULL, *tail = NULL;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) {
        struct Node *node = malloc(sizeof *node);
        if (!node || scanf("%d", &node->val) != 1) return 1;
        node->next = NULL;
        if (tail) tail->next = node; else head = node;
        tail = node;
    }
    struct Node *slow = head, *fast = head;
    while (fast && fast->next) { slow = slow->next; fast = fast->next->next; pos++; }
    printf("%d %d\n", slow->val, pos);
    while (head) { struct Node *next = head->next; free(head); head = next; }
    return 0;
}
```

```test sample
5
10 20 30 40 50
---
30 3
```

```test hidden
4
1 2 3 4
---
3 3
```

```test hidden
1
9
---
9 1
```
