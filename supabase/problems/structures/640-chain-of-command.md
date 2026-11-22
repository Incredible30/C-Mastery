---
title: Chain of Command
difficulty: hard
topic: Arrays of Structures
xp: 45
plan: pro
---
Each employee has an id, a name and the id of their manager (0 for the top boss). For each query, print the chain from that employee up to the top, separated by ` > `.

**Input:** `n`, then `n` lines of `id name manager_id`; `q`, then `q` ids.

**Output:** one chain per query, or `NOT FOUND` for an unknown id.

**Constraints:** 1 ≤ n ≤ 1000, ids are distinct positive integers up to 10^9, every manager id is 0 or an existing employee, and there are no cycles.

## Hints

1. Ids are large, so you can't index an array by id. Sort the structures by id and look them up with `bsearch`, or search linearly (n is small).
2. Starting at the employee, print the name, then jump to the manager's record, until the manager id is 0.

```c starter
#include <stdio.h>
#include <stdlib.h>

struct Emp { long long id; char name[31]; long long boss; };

struct Emp e[1000];

int main(void) {
    int n, q;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%lld %30s %lld", &e[i].id, e[i].name, &e[i].boss);
    scanf("%d", &q);
    /* answer each query */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>

struct Emp { long long id; char name[31]; long long boss; };

struct Emp e[1000];
int n;

static int cmp(const void *a, const void *b) {
    long long x = ((const struct Emp *)a)->id, y = ((const struct Emp *)b)->id;
    return (x > y) - (x < y);
}

static struct Emp *find(long long id) {
    struct Emp key;
    key.id = id;
    return bsearch(&key, e, (size_t)n, sizeof e[0], cmp);
}

int main(void) {
    int q;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) if (scanf("%lld %30s %lld", &e[i].id, e[i].name, &e[i].boss) != 3) return 1;
    qsort(e, (size_t)n, sizeof e[0], cmp);
    if (scanf("%d", &q) != 1) return 1;
    while (q--) {
        long long id;
        if (scanf("%lld", &id) != 1) return 1;
        struct Emp *p = find(id);
        if (!p) { printf("NOT FOUND\n"); continue; }
        printf("%s", p->name);
        while (p->boss) { p = find(p->boss); printf(" > %s", p->name); }
        printf("\n");
    }
    return 0;
}
```

```test sample
5
10 Asha 0
20 Bharat 10
30 Chen 20
40 Divya 10
50 Eli 30
3
50
40
10
---
Eli > Chen > Bharat > Asha
Divya > Asha
Asha
```

```test hidden
2
1000000000 Top 0
7 Low 1000000000
2
7
8
---
Low > Top
NOT FOUND
```

```test hidden
1
5 Alone 0
1
5
---
Alone
```
