---
title: Josephus Circle
difficulty: medium
topic: Linked Lists
xp: 30
plan: free
---
`n` people numbered 1 to `n` stand in a circle. Starting from person 1, count `k` people around the circle; the `k`-th is removed, and counting restarts from the next person. Print the order in which people are removed. Model the circle as a **circular linked list**, where the last node points back to the first.

**Input:** `n` and `k`.

**Output:** the removal order on one line.

**Constraints:** 1 ≤ n ≤ 5000, 1 ≤ k ≤ 10^9

## Hints

1. Keep a pointer to the node **before** the current one, so you can unlink with `prev->next = victim->next`.
2. With `m` people left, moving `(k - 1) % m` steps is the same as moving `k - 1` steps, which keeps huge `k` fast.

```c starter
#include <stdio.h>
#include <stdlib.h>

struct Node { int id; struct Node *next; };

int main(void) {
    int n;
    long long k;
    scanf("%d %lld", &n, &k);
    /* build the circle, then remove people */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>

struct Node { int id; struct Node *next; };

int main(void) {
    int n;
    long long k;
    if (scanf("%d %lld", &n, &k) != 2) return 1;
    struct Node *head = NULL, *tail = NULL;
    for (int i = 1; i <= n; i++) {
        struct Node *node = malloc(sizeof *node);
        if (!node) return 1;
        node->id = i;
        if (tail) tail->next = node; else head = node;
        tail = node;
    }
    tail->next = head;
    struct Node *prev = tail;
    for (int m = n; m > 0; m--) {
        for (long long s = (k - 1) % m; s > 0; s--) prev = prev->next;
        struct Node *victim = prev->next;
        printf(m == n ? "%d" : " %d", victim->id);
        prev->next = victim->next;
        free(victim);
    }
    printf("\n");
    return 0;
}
```

```test sample
7 3
---
3 6 2 7 5 1 4
```

```test hidden
1 5
---
1
```

```test hidden
5 1
---
1 2 3 4 5
```

```test hidden
6 1000000000
---
4 3 2 5 1 6
```
