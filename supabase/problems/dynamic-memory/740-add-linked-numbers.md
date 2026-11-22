---
title: Add Numbers Stored as Lists
difficulty: hard
topic: Linked Lists
xp: 45
plan: pro
---
Store each of two huge numbers as a linked list of digits, **least significant digit first** (so 472 is `2 -> 7 -> 4`). Add them by walking both lists at once and building a new result list, then print the sum normally.

**Input:** two non-negative integers, one per line.

**Output:** their sum, without leading zeros.

**Constraints:** each number has 1 to 10^5 digits and no leading zeros (except 0 itself).

## Hints

1. Building the list by pushing each digit at the **head** as you read left to right gives least-significant-first order for free.
2. Add node by node with a carry, appending to the result. To print, reverse the result list first (or push result digits at its head as you go).

```c starter
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Node { int d; struct Node *next; };

static char buf[100001];

int main(void) {
    /* read two numbers into digit lists, add, print */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Node { int d; struct Node *next; };

static char buf[100001];

static struct Node *push(struct Node *head, int d) {
    struct Node *n = malloc(sizeof *n);
    if (!n) exit(1);
    n->d = d;
    n->next = head;
    return n;
}

static struct Node *read_number(void) {
    struct Node *head = NULL;
    if (scanf("%100000s", buf) != 1) exit(1);
    for (const char *p = buf; *p; p++) head = push(head, *p - '0');
    return head;
}

static void destroy(struct Node *p) { while (p) { struct Node *n = p->next; free(p); p = n; } }

int main(void) {
    struct Node *a = read_number(), *b = read_number(), *sum = NULL;
    int carry = 0;
    for (struct Node *x = a, *y = b; x || y || carry;) {
        int s = carry + (x ? x->d : 0) + (y ? y->d : 0);
        sum = push(sum, s % 10);
        carry = s / 10;
        if (x) x = x->next;
        if (y) y = y->next;
    }
    while (sum->next && sum->d == 0) { struct Node *z = sum; sum = sum->next; free(z); }
    for (struct Node *p = sum; p; p = p->next) putchar('0' + p->d);
    putchar('\n');
    destroy(a);
    destroy(b);
    destroy(sum);
    return 0;
}
```

```test sample
472
9568
---
10040
```

```test hidden
0
0
---
0
```

```test hidden
99999999999999999999999999999999
1
---
100000000000000000000000000000000
```
