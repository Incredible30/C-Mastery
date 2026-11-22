---
title: Task Order (Topological Sort)
difficulty: hard
topic: Graphs
xp: 50
plan: pro
time_limit_ms: 1000
---
`n` tasks have dependencies "`a` must be done before `b`". Print an order that respects every dependency. When several tasks are ready, always choose the **smallest numbered** one. If the dependencies form a cycle, print `CYCLE`.

**Input:** `n m`, then `m` lines of `a b`.

**Output:** the task order on one line, or `CYCLE`.

**Constraints:** 1 ≤ n ≤ 10^5, 0 ≤ m ≤ 2 × 10^5

## Hints

1. Kahn's algorithm: count incoming edges (`indeg`). Tasks with `indeg == 0` are ready. Take one, and decrease the indegree of every task that depends on it.
2. "Smallest ready task first" needs a min-heap of ready tasks. If fewer than `n` tasks come out, there was a cycle. Store the edges as dynamic adjacency lists.

```c starter
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n, m;
    scanf("%d %d", &n, &m);
    /* adjacency lists, indegrees, min-heap */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>

static int *heap, hsize;

static void hpush(int x) {
    int i = hsize++;
    heap[i] = x;
    while (i > 0 && heap[(i - 1) / 2] > heap[i]) { int p = (i - 1) / 2, t = heap[p]; heap[p] = heap[i]; heap[i] = t; i = p; }
}

static int hpop(void) {
    int top = heap[0], i = 0;
    heap[0] = heap[--hsize];
    for (;;) {
        int l = 2 * i + 1, r = l + 1, s = i;
        if (l < hsize && heap[l] < heap[s]) s = l;
        if (r < hsize && heap[r] < heap[s]) s = r;
        if (s == i) break;
        int t = heap[s]; heap[s] = heap[i]; heap[i] = t;
        i = s;
    }
    return top;
}

int main(void) {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 1;
    int *ea = malloc(((size_t)m + 1) * sizeof *ea), *eb = malloc(((size_t)m + 1) * sizeof *eb);
    int *start = calloc((size_t)n + 2, sizeof *start), *fill = malloc(((size_t)n + 2) * sizeof *fill);
    int *adj = malloc(((size_t)m + 1) * sizeof *adj), *indeg = calloc((size_t)n + 1, sizeof *indeg);
    int *order = malloc(((size_t)n + 1) * sizeof *order);
    heap = malloc(((size_t)n + 1) * sizeof *heap);
    if (!ea || !eb || !start || !fill || !adj || !indeg || !order || !heap) return 1;
    for (int i = 0; i < m; i++) {
        if (scanf("%d %d", &ea[i], &eb[i]) != 2) return 1;
        start[ea[i] + 1]++;
        indeg[eb[i]]++;
    }
    for (int v = 1; v <= n + 1; v++) start[v] += start[v - 1];
    for (int v = 0; v <= n + 1; v++) fill[v] = start[v];
    for (int i = 0; i < m; i++) adj[fill[ea[i]]++] = eb[i];
    for (int v = 1; v <= n; v++) if (!indeg[v]) hpush(v);
    int k = 0;
    while (hsize) {
        int u = hpop();
        order[k++] = u;
        for (int i = start[u]; i < start[u + 1]; i++) if (--indeg[adj[i]] == 0) hpush(adj[i]);
    }
    if (k < n) printf("CYCLE\n");
    else {
        for (int i = 0; i < n; i++) printf(i ? " %d" : "%d", order[i]);
        printf("\n");
    }
    free(ea); free(eb); free(start); free(fill); free(adj); free(indeg); free(order); free(heap);
    return 0;
}
```

```test sample
6 6
5 2
5 1
4 1
4 3
2 3
3 6
---
4 5 1 2 3 6
```

```test hidden
3 3
1 2
2 3
3 1
---
CYCLE
```

```test hidden
4 0
---
1 2 3 4
```
