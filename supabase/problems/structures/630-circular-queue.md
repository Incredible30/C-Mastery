---
title: Circular Queue
difficulty: medium
topic: Structures
xp: 30
plan: free
---
Implement a fixed-capacity queue as a **circular buffer** in a structure: `struct Queue { int data[1000]; int head, count, cap; };`. When the end of the array is reached, wrap around to the start with `%`.

**Input:** capacity `k` and `q`, then `q` commands: `enq x`, `deq`, `front` or `size`.

**Output:** `enq` on a full queue prints `FULL`; `deq` prints the removed value; `front` prints the first value; `deq`/`front` on an empty queue print `EMPTY`; `size` prints the count.

**Constraints:** 1 ≤ k ≤ 1000, 1 ≤ q ≤ 10000

## Hints

1. The element after the last one goes at `(head + count) % cap`.
2. Dequeue reads `data[head]`, then `head = (head + 1) % cap; count--;`

```c starter
#include <stdio.h>
#include <string.h>

struct Queue { int data[1000]; int head, count, cap; };

int main(void) {
    struct Queue qu = {0};
    int q;
    char cmd[8];
    scanf("%d %d", &qu.cap, &q);
    while (q--) {
        scanf("%7s", cmd);
        /* handle command */
    }
    return 0;
}
```

```c solution
#include <stdio.h>
#include <string.h>

struct Queue { int data[1000]; int head, count, cap; };

static int enqueue(struct Queue *q, int x) {
    if (q->count == q->cap) return 0;
    q->data[(q->head + q->count) % q->cap] = x;
    q->count++;
    return 1;
}

static int dequeue(struct Queue *q) {
    int x = q->data[q->head];
    q->head = (q->head + 1) % q->cap;
    q->count--;
    return x;
}

int main(void) {
    static struct Queue qu;
    int q;
    char cmd[8];
    if (scanf("%d %d", &qu.cap, &q) != 2) return 1;
    while (q--) {
        if (scanf("%7s", cmd) != 1) return 1;
        if (strcmp(cmd, "enq") == 0) {
            int x;
            if (scanf("%d", &x) != 1) return 1;
            if (!enqueue(&qu, x)) printf("FULL\n");
        } else if (strcmp(cmd, "size") == 0) printf("%d\n", qu.count);
        else if (qu.count == 0) printf("EMPTY\n");
        else if (strcmp(cmd, "deq") == 0) printf("%d\n", dequeue(&qu));
        else printf("%d\n", qu.data[qu.head]);
    }
    return 0;
}
```

```test sample
2 8
enq 1
enq 2
enq 3
deq
enq 4
front
deq
deq
---
FULL
1
2
2
4
```

```test hidden
1 3
deq
front
size
---
EMPTY
EMPTY
0
```

```test hidden
3 9
enq 1
enq 2
enq 3
deq
deq
enq 4
enq 5
deq
size
---
1
2
3
2
```
