---
title: Friend Groups (Union–Find)
difficulty: hard
topic: Disjoint Sets
xp: 50
plan: pro
time_limit_ms: 1000
---
`n` people start as strangers. Process `U a b` (a and b become friends, merging their groups) and `Q a b` (are they in the same group?). At the end, print the number of groups and the size of the largest one. Use a **disjoint-set (union–find)** structure in `malloc`'d arrays.

**Input:** `n` and `q`, then `q` commands.

**Output:** `YES`/`NO` for each `Q`, then the group count and the largest group size on one line.

**Constraints:** 1 ≤ n ≤ 10^5, 1 ≤ q ≤ 2 × 10^5

## Hints

1. `parent[i]` starts as `i`. `find(x)` follows parents to the root; set each visited node's parent to the root (path compression) so later finds are fast.
2. To union, attach the smaller group's root under the larger one's (union by size), add the sizes, and decrease the group count.

```c starter
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n, q;
    scanf("%d %d", &n, &q);
    /* parent and size arrays */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>

static int *parent, *sz;

static int find(int x) {
    int root = x;
    while (parent[root] != root) root = parent[root];
    while (parent[x] != root) { int next = parent[x]; parent[x] = root; x = next; }
    return root;
}

int main(void) {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return 1;
    parent = malloc(((size_t)n + 1) * sizeof *parent);
    sz = malloc(((size_t)n + 1) * sizeof *sz);
    if (!parent || !sz) return 1;
    for (int i = 1; i <= n; i++) { parent[i] = i; sz[i] = 1; }
    int groups = n;
    while (q--) {
        char op;
        int a, b;
        if (scanf(" %c %d %d", &op, &a, &b) != 3) return 1;
        int ra = find(a), rb = find(b);
        if (op == 'Q') printf("%s\n", ra == rb ? "YES" : "NO");
        else if (ra != rb) {
            if (sz[ra] < sz[rb]) { int t = ra; ra = rb; rb = t; }
            parent[rb] = ra;
            sz[ra] += sz[rb];
            groups--;
        }
    }
    int largest = 0;
    for (int i = 1; i <= n; i++) if (parent[i] == i && sz[i] > largest) largest = sz[i];
    printf("%d %d\n", groups, largest);
    free(parent);
    free(sz);
    return 0;
}
```

```test sample
6 7
U 1 2
U 3 4
Q 1 3
U 2 3
Q 1 4
U 5 5
Q 6 6
---
NO
YES
YES
3 4
```

```test hidden
1 1
Q 1 1
---
YES
1 1
```

```test hidden
5 4
U 1 2
U 2 3
U 3 1
Q 1 5
---
NO
3 3
```
