---
title: K-th Node From the End
difficulty: medium
topic: Linked Lists
xp: 25
plan: free
---
Find the `k`-th node from the end of a linked list (k = 1 is the last node) in one pass, using two pointers `k` nodes apart.

**Input:** `n` and `k`, then `n` integers.

**Output:** the value, or `INVALID` if `k` is larger than the list.

**Constraints:** 1 ≤ n ≤ 10^5, 1 ≤ k ≤ 10^9

## Hints

1. Move a `lead` pointer `k` steps forward first. If it falls off the list early, `k` is invalid.
2. Then move `lead` and `trail` together until `lead` is `NULL`; `trail` is the answer.

```c starter
#include <stdio.h>
#include <stdlib.h>

struct Node { int val; struct Node *next; };

int main(void) {
    int n;
    long long k;
    struct Node *head = NULL, *tail = NULL;
    scanf("%d %lld", &n, &k);
    for (int i = 0; i < n; i++) {
        struct Node *node = malloc(sizeof *node);
        scanf("%d", &node->val);
        node->next = NULL;
        if (tail) tail->next = node; else head = node;
        tail = node;
    }
    /* lead and trail */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>

struct Node { int val; struct Node *next; };

int main(void) {
    int n;
    long long k;
    struct Node *head = NULL, *tail = NULL;
    if (scanf("%d %lld", &n, &k) != 2) return 1;
    for (int i = 0; i < n; i++) {
        struct Node *node = malloc(sizeof *node);
        if (!node || scanf("%d", &node->val) != 1) return 1;
        node->next = NULL;
        if (tail) tail->next = node; else head = node;
        tail = node;
    }
    struct Node *lead = head, *trail = head;
    long long steps = 0;
    while (steps < k && lead) { lead = lead->next; steps++; }
    if (steps < k) printf("INVALID\n");
    else {
        while (lead) { lead = lead->next; trail = trail->next; }
        printf("%d\n", trail->val);
    }
    while (head) { struct Node *next = head->next; free(head); head = next; }
    return 0;
}
```

```test sample
5 2
10 20 30 40 50
---
40
```

```test hidden
3 3
7 8 9
---
7
```

```test hidden
2 1000000000
1 2
---
INVALID
```
