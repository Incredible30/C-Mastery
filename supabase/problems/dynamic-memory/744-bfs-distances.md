---
title: Shortest Distances in a Graph
difficulty: hard
topic: Graphs
xp: 50
plan: pro
time_limit_ms: 1000
---
An undirected graph has `n` nodes and `m` edges. Store it as **adjacency lists** built with dynamic memory, then run a breadth-first search from node `s` to find the fewest edges needed to reach every node.

**Input:** `n m s`, then `m` lines of `u v` (an edge between u and v).

**Output:** the distance from `s` to nodes 1..n on one line, using `-1` for unreachable nodes.

**Constraints:** 1 ≤ n ≤ 10^5, 0 ≤ m ≤ 2 × 10^5, 1 ≤ s, u, v ≤ n

## Hints

1. A compact layout: count each node's degree, allocate one array of size `2m` for all neighbours, and give each node a start offset (prefix sums of degrees). Alternatively, give every node its own growable array.
2. BFS: a queue array of size `n`, `dist[]` initialised to -1, `dist[s] = 0`. Pop a node, and for every neighbour with `dist == -1` set its distance and push it.

```c starter
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n, m, s;
    scanf("%d %d %d", &n, &m, &s);
    /* build adjacency lists, BFS from s */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n, m, s;
    if (scanf("%d %d %d", &n, &m, &s) != 3) return 1;
    int *eu = malloc(((size_t)m + 1) * sizeof *eu), *ev = malloc(((size_t)m + 1) * sizeof *ev);
    int *start = calloc((size_t)n + 2, sizeof *start), *adj = malloc(2 * ((size_t)m + 1) * sizeof *adj);
    int *dist = malloc(((size_t)n + 1) * sizeof *dist), *queue = malloc(((size_t)n + 1) * sizeof *queue);
    int *fill = malloc(((size_t)n + 2) * sizeof *fill);
    if (!eu || !ev || !start || !adj || !dist || !queue || !fill) return 1;
    for (int i = 0; i < m; i++) {
        if (scanf("%d %d", &eu[i], &ev[i]) != 2) return 1;
        start[eu[i] + 1]++;
        start[ev[i] + 1]++;
    }
    for (int v = 1; v <= n + 1; v++) start[v] += start[v - 1];
    for (int v = 0; v <= n + 1; v++) fill[v] = start[v];
    for (int i = 0; i < m; i++) { adj[fill[eu[i]]++] = ev[i]; adj[fill[ev[i]]++] = eu[i]; }
    for (int v = 1; v <= n; v++) dist[v] = -1;
    int head = 0, tail = 0;
    dist[s] = 0;
    queue[tail++] = s;
    while (head < tail) {
        int u = queue[head++];
        for (int i = start[u]; i < start[u + 1]; i++)
            if (dist[adj[i]] == -1) { dist[adj[i]] = dist[u] + 1; queue[tail++] = adj[i]; }
    }
    for (int v = 1; v <= n; v++) printf(v > 1 ? " %d" : "%d", dist[v]);
    printf("\n");
    free(eu); free(ev); free(start); free(adj); free(dist); free(queue); free(fill);
    return 0;
}
```

```test sample
6 6 1
1 2
1 3
2 4
3 4
4 5
6 6
---
0 1 1 2 3 -1
```

```test hidden
1 0 1
---
0
```

```test hidden
4 2 3
1 2
3 4
---
-1 -1 0 1
```
