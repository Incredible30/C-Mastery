---
title: Task Priority Queue
difficulty: hard
topic: Arrays of Structures
xp: 50
plan: pro
time_limit_ms: 1000
---
Build a priority queue of tasks as a **binary heap** stored in an array of structures. Each task has a name and a priority. `next` removes and prints the task with the highest priority; among equal priorities, the one added first goes first.

**Input:** `q`, then `q` commands: `add name priority` or `next`.

**Output:** for each `next`, the task's name, or `EMPTY`.

**Constraints:** 1 ≤ q ≤ 200000, |priority| ≤ 10^9. Must finish within 1 second.

## Hints

1. Give each task a sequence number when it's added. Task A goes before B if A's priority is higher, or equal with a smaller sequence number.
2. Heap in an array: the children of node `i` are `2i + 1` and `2i + 2`. Insert by sifting up; remove the root by moving the last element to the top and sifting down.

```c starter
#include <stdio.h>
#include <string.h>

struct Task { char name[21]; int prio; int seq; };

struct Task heap[200000];
int size;

int main(void) {
    int q;
    char cmd[8];
    scanf("%d", &q);
    while (q--) {
        scanf("%7s", cmd);
        /* add or next */
    }
    return 0;
}
```

```c solution
#include <stdio.h>
#include <string.h>

struct Task { char name[21]; int prio; int seq; };

struct Task heap[200000];
int size;

static int before(const struct Task *a, const struct Task *b) {
    return a->prio > b->prio || (a->prio == b->prio && a->seq < b->seq);
}

static void swap(struct Task *a, struct Task *b) { struct Task t = *a; *a = *b; *b = t; }

static void push(struct Task t) {
    int i = size++;
    heap[i] = t;
    while (i > 0 && before(&heap[i], &heap[(i - 1) / 2])) { swap(&heap[i], &heap[(i - 1) / 2]); i = (i - 1) / 2; }
}

static struct Task pop(void) {
    struct Task top = heap[0];
    heap[0] = heap[--size];
    int i = 0;
    for (;;) {
        int l = 2 * i + 1, r = l + 1, best = i;
        if (l < size && before(&heap[l], &heap[best])) best = l;
        if (r < size && before(&heap[r], &heap[best])) best = r;
        if (best == i) break;
        swap(&heap[i], &heap[best]);
        i = best;
    }
    return top;
}

int main(void) {
    int q, seq = 0;
    char cmd[8];
    if (scanf("%d", &q) != 1) return 1;
    while (q--) {
        if (scanf("%7s", cmd) != 1) return 1;
        if (strcmp(cmd, "add") == 0) {
            struct Task t;
            if (scanf("%20s %d", t.name, &t.prio) != 2) return 1;
            t.seq = seq++;
            push(t);
        } else if (size == 0) printf("EMPTY\n");
        else printf("%s\n", pop().name);
    }
    return 0;
}
```

```test sample
8
add email 2
add bugfix 5
add lunch 2
next
add deploy 5
next
next
next
---
bugfix
deploy
email
lunch
```

```test hidden
3
next
add a -1
next
---
EMPTY
a
```

```test hidden
6
add x 0
add y 0
add z 0
next
next
next
---
x
y
z
```
