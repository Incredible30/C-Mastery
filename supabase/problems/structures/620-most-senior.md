---
title: Most Senior Employee
difficulty: medium
topic: Nested Structures
xp: 25
plan: free
---
Structures can contain other structures. Define `struct Date { int d, m, y; };` and `struct Employee { char name[31]; struct Date joined; };`, then find the employee who joined earliest (the first one listed if tied).

**Input:** `n`, then `n` lines of `name d m y`.

**Output:** the name and joining date as `name dd/mm/yyyy`.

**Constraints:** 1 ≤ n ≤ 1000, valid dates.

## Hints

1. Reach nested members with two dots: `e[i].joined.y`.
2. Print with zero padding: `printf("%s %02d/%02d/%04d\n", ...)`.

```c starter
#include <stdio.h>

struct Date { int d, m, y; };
struct Employee { char name[31]; struct Date joined; };

struct Employee e[1000];

int main(void) {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++)
        scanf("%30s %d %d %d", e[i].name, &e[i].joined.d, &e[i].joined.m, &e[i].joined.y);
    /* find the earliest */
    return 0;
}
```

```c solution
#include <stdio.h>

struct Date { int d, m, y; };
struct Employee { char name[31]; struct Date joined; };

struct Employee e[1000];

static int before(struct Date a, struct Date b) {
    if (a.y != b.y) return a.y < b.y;
    if (a.m != b.m) return a.m < b.m;
    return a.d < b.d;
}

int main(void) {
    int n, best = 0;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++)
        if (scanf("%30s %d %d %d", e[i].name, &e[i].joined.d, &e[i].joined.m, &e[i].joined.y) != 4) return 1;
    for (int i = 1; i < n; i++) if (before(e[i].joined, e[best].joined)) best = i;
    struct Date d = e[best].joined;
    printf("%s %02d/%02d/%04d\n", e[best].name, d.d, d.m, d.y);
    return 0;
}
```

```test sample
3
Priya 12 5 2015
Karan 3 11 2012
Neha 7 1 2019
---
Karan 03/11/2012
```

```test hidden
2
First 1 1 2000
Second 1 1 2000
---
First 01/01/2000
```

```test hidden
3
A 31 12 1999
B 1 1 2000
C 30 12 1999
---
C 30/12/1999
```
