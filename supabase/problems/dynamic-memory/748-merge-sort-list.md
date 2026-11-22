---
title: Merge Sort a Linked List
difficulty: hard
topic: Linked Lists
xp: 50
plan: pro
time_limit_ms: 1000
---
Sort a linked list of up to 100,000 values in O(n log n) with **merge sort**, relinking nodes instead of copying values into an array. Linked lists can't jump to the middle, but merge sort doesn't need to.

**Input:** `n`, then `n` integers.

**Output:** the sorted values on one line.

**Constraints:** 1 ≤ n ≤ 10^5, values fit in `int`.

## Hints

1. Split: find the middle with slow/fast pointers, and cut the list there (`slow->next = NULL`). Sort both halves recursively.
2. Merge the two sorted halves with a dummy head, taking from the left half on ties so the sort is stable.

```c starter
#include <stdio.h>
#include <stdlib.h>

struct Node { int val; struct Node *next; };

struct Node *sort(struct Node *head) {
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
    head = sort(head);
    for (struct Node *p = head; p; p = p->next) printf(p == head ? "%d" : " %d", p->val);
    printf("\n");
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>

struct Node { int val; struct Node *next; };

static struct Node *merge(struct Node *a, struct Node *b) {
    struct Node dummy = {0, NULL}, *t = &dummy;
    while (a && b) {
        if (a->val <= b->val) { t->next = a; a = a->next; }
        else { t->next = b; b = b->next; }
        t = t->next;
    }
    t->next = a ? a : b;
    return dummy.next;
}

struct Node *sort(struct Node *head) {
    if (!head || !head->next) return head;
    struct Node *slow = head, *fast = head->next;
    while (fast && fast->next) { slow = slow->next; fast = fast->next->next; }
    struct Node *right = slow->next;
    slow->next = NULL;
    return merge(sort(head), sort(right));
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
    head = sort(head);
    for (struct Node *p = head; p; p = p->next) printf(p == head ? "%d" : " %d", p->val);
    printf("\n");
    while (head) { struct Node *next = head->next; free(head); head = next; }
    return 0;
}
```

```test sample
8
38 27 43 3 9 82 10 3
---
3 3 9 10 27 38 43 82
```

```test hidden
1
5
---
5
```

```test hidden
5
2147483647 -2147483648 0 -1 1
---
-2147483648 -1 0 1 2147483647
```
