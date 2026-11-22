---
title: Fixed-Block Memory Pool
difficulty: hard
topic: Allocators
xp: 50
plan: pro
---
Real allocators often hand out fixed-size blocks from a pre-allocated pool, tracking free blocks in a **free list**. Simulate a pool of `n` blocks numbered 0 to n − 1:

- `alloc`: if any block has been freed, hand out the **most recently freed** one; otherwise the lowest never-used block; if neither exists print `FULL`. Print the block number.
- `free i`: return block `i` and print `OK`. If `i` is out of range or not currently allocated, print `INVALID` (this catches double frees).

**Input:** `n` and `q`, then `q` commands.

**Output:** one line per command.

**Constraints:** 1 ≤ n ≤ 10^5, 1 ≤ q ≤ 2 × 10^5, |i| ≤ 10^9

## Hints

1. Keep `next_free[i]` as an intrusive linked list: the head of the free list is a block number, and each free block stores the number of the next free block (−1 ends the list). Freeing pushes onto the head, so allocation is LIFO.
2. A separate `in_use[i]` flag detects invalid and double frees. A counter `fresh` tracks the lowest never-used block.

```c starter
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {
    int n, q;
    char cmd[8];
    scanf("%d %d", &n, &q);
    /* free list + in_use flags */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {
    int n, q;
    char cmd[8];
    if (scanf("%d %d", &n, &q) != 2) return 1;
    int *next_free = malloc((size_t)n * sizeof *next_free);
    char *in_use = calloc((size_t)n, 1);
    if (!next_free || !in_use) return 1;
    int free_head = -1, fresh = 0;
    while (q--) {
        if (scanf("%7s", cmd) != 1) return 1;
        if (strcmp(cmd, "alloc") == 0) {
            int b;
            if (free_head != -1) { b = free_head; free_head = next_free[b]; }
            else if (fresh < n) b = fresh++;
            else { printf("FULL\n"); continue; }
            in_use[b] = 1;
            printf("%d\n", b);
        } else {
            long long i;
            if (scanf("%lld", &i) != 1) return 1;
            if (i < 0 || i >= n || !in_use[i]) { printf("INVALID\n"); continue; }
            in_use[i] = 0;
            next_free[i] = free_head;
            free_head = (int)i;
            printf("OK\n");
        }
    }
    free(next_free);
    free(in_use);
    return 0;
}
```

```test sample
3 9
alloc
alloc
free 0
alloc
alloc
alloc
free 1
free 1
alloc
---
0
1
OK
0
2
FULL
OK
INVALID
1
```

```test hidden
1 4
free 0
alloc
alloc
free 5
---
INVALID
0
FULL
INVALID
```

```test hidden
4 8
alloc
alloc
alloc
free 2
free 0
alloc
alloc
alloc
---
0
1
2
OK
OK
0
2
3
```
