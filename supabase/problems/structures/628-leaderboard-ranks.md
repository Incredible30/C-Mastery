---
title: Leaderboard Ranks
difficulty: medium
topic: Arrays of Structures
xp: 30
plan: free
---
Sort players by score (highest first, ties alphabetical) and give them **competition ranks**: equal scores share a rank, and the next rank skips accordingly (1, 2, 2, 4).

**Input:** `n`, then `n` lines of `name score`.

**Output:** `rank name score` per line.

**Constraints:** 1 ≤ n ≤ 10000, 0 ≤ score ≤ 10^9

## Hints

1. After sorting, player `i` (0-based) gets rank `i + 1`, unless their score equals the previous player's, in which case they copy the previous rank.
2. Store the rank in the structure or keep it in a variable while printing.

```c starter
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Player { char name[31]; int score; };

struct Player p[10000];

int main(void) {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%30s %d", p[i].name, &p[i].score);
    /* sort and rank */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Player { char name[31]; int score; };

struct Player p[10000];

static int cmp(const void *a, const void *b) {
    const struct Player *x = a, *y = b;
    if (x->score != y->score) return (y->score > x->score) - (y->score < x->score);
    return strcmp(x->name, y->name);
}

int main(void) {
    int n, rank = 0;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) if (scanf("%30s %d", p[i].name, &p[i].score) != 2) return 1;
    qsort(p, (size_t)n, sizeof p[0], cmp);
    for (int i = 0; i < n; i++) {
        if (i == 0 || p[i].score != p[i - 1].score) rank = i + 1;
        printf("%d %s %d\n", rank, p[i].name, p[i].score);
    }
    return 0;
}
```

```test sample
5
ana 90
bob 85
cy 90
dee 70
eve 85
---
1 ana 90
1 cy 90
3 bob 85
3 eve 85
5 dee 70
```

```test hidden
1
solo 0
---
1 solo 0
```

```test hidden
3
z 5
y 5
x 5
---
1 x 5
1 y 5
1 z 5
```
