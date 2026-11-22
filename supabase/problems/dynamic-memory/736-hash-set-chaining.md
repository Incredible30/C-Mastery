---
title: Hash Set With Chaining
difficulty: medium
topic: Hash Tables
xp: 30
plan: free
time_limit_ms: 1000
---
Build a set of integers as a **hash table with separate chaining**: an array of buckets, where each bucket is a linked list of heap-allocated nodes. Support `add x`, `del x` and `has x`.

**Input:** `q`, then `q` commands.

**Output:** `has` prints `YES` or `NO`. At the end print the set's size.

**Constraints:** 1 ≤ q ≤ 2 × 10^5, |x| ≤ 10^9. Must finish within 1 second.

## Hints

1. Bucket index: `((x % M) + M) % M` for a prime `M` like 100003, so negative numbers also land in range.
2. `add` checks the bucket first so values aren't stored twice; `del` unlinks and frees the node (a pointer-to-pointer makes this neat).

```c starter
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define M 100003

struct Node { int val; struct Node *next; };

struct Node *buckets[M];

int main(void) {
    int q;
    char cmd[4];
    scanf("%d", &q);
    while (q--) {
        int x;
        scanf("%3s %d", cmd, &x);
        /* add, del or has */
    }
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define M 100003

struct Node { int val; struct Node *next; };

struct Node *buckets[M];
int size;

static struct Node **slot(int x) {
    struct Node **pp = &buckets[((x % M) + M) % M];
    while (*pp && (*pp)->val != x) pp = &(*pp)->next;
    return pp;
}

int main(void) {
    int q;
    char cmd[4];
    if (scanf("%d", &q) != 1) return 1;
    while (q--) {
        int x;
        if (scanf("%3s %d", cmd, &x) != 2) return 1;
        struct Node **pp = slot(x);
        if (strcmp(cmd, "add") == 0) {
            if (!*pp) {
                struct Node *n = malloc(sizeof *n);
                if (!n) return 1;
                n->val = x;
                n->next = NULL;
                *pp = n;
                size++;
            }
        } else if (strcmp(cmd, "del") == 0) {
            if (*pp) { struct Node *dead = *pp; *pp = dead->next; free(dead); size--; }
        } else printf("%s\n", *pp ? "YES" : "NO");
    }
    printf("%d\n", size);
    for (int i = 0; i < M; i++)
        while (buckets[i]) { struct Node *next = buckets[i]->next; free(buckets[i]); buckets[i] = next; }
    return 0;
}
```

```test sample
8
add 5
add -100003
add 5
has 5
has 0
del 5
has 5
has -100003
---
YES
NO
NO
YES
1
```

```test hidden
2
del 1
has 1
---
NO
0
```

```test hidden
4
add 1000000000
add -1000000000
add 100003
has 0
---
NO
3
```
