---
title: Reverse in Groups of K
difficulty: hard
topic: Linked Lists
xp: 50
plan: pro
---
Reverse a linked list in consecutive groups of `k` nodes. If the last group has fewer than `k` nodes, leave it as it is. `1 2 3 4 5` with `k = 2` becomes `2 1 4 3 5`. Relink the nodes; don't copy values.

**Input:** `n` and `k`, then `n` integers.

**Output:** the rearranged list joined by ` -> `.

**Constraints:** 1 ≤ n ≤ 10^5, 1 ≤ k ≤ 10^5

## Hints

1. Keep `prev_tail`, the last node of the already-processed part (start with a dummy node). Check that `k` more nodes exist before reversing a group.
2. Reverse the group with the usual three-pointer loop, then connect: `prev_tail->next` = the group's new first node, and the group's old first node (now last) points to the rest.

```c starter
#include <stdio.h>
#include <stdlib.h>

struct Node { int val; struct Node *next; };

int main(void) {
    int n, k;
    struct Node *head = NULL, *tail = NULL;
    scanf("%d %d", &n, &k);
    for (int i = 0; i < n; i++) {
        struct Node *node = malloc(sizeof *node);
        scanf("%d", &node->val);
        node->next = NULL;
        if (tail) tail->next = node; else head = node;
        tail = node;
    }
    /* reverse in groups of k */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>

struct Node { int val; struct Node *next; };

int main(void) {
    int n, k;
    struct Node *head = NULL, *tail = NULL;
    if (scanf("%d %d", &n, &k) != 2) return 1;
    for (int i = 0; i < n; i++) {
        struct Node *node = malloc(sizeof *node);
        if (!node || scanf("%d", &node->val) != 1) return 1;
        node->next = NULL;
        if (tail) tail->next = node; else head = node;
        tail = node;
    }
    struct Node dummy = {0, head}, *prev_tail = &dummy;
    for (;;) {
        struct Node *check = prev_tail->next;
        int count = 0;
        while (check && count < k) { check = check->next; count++; }
        if (count < k) break;
        struct Node *first = prev_tail->next, *prev = check, *cur = first;
        for (int i = 0; i < k; i++) { struct Node *next = cur->next; cur->next = prev; prev = cur; cur = next; }
        prev_tail->next = prev;
        prev_tail = first;
    }
    head = dummy.next;
    for (struct Node *p = head; p; p = p->next) printf(p == head ? "%d" : " -> %d", p->val);
    printf("\n");
    while (head) { struct Node *next = head->next; free(head); head = next; }
    return 0;
}
```

```test sample
5 2
1 2 3 4 5
---
2 -> 1 -> 4 -> 3 -> 5
```

```test hidden
6 3
1 2 3 4 5 6
---
3 -> 2 -> 1 -> 6 -> 5 -> 4
```

```test hidden
3 5
1 2 3
---
1 -> 2 -> 3
```

```test hidden
4 1
4 3 2 1
---
4 -> 3 -> 2 -> 1
```
