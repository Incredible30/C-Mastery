---
title: Group Students by City
difficulty: medium
topic: Arrays of Structures
xp: 30
plan: free
---
Students come from different cities. For each city, report how many students it has and their average marks. List cities alphabetically.

**Input:** `n`, then `n` lines of `name city marks`.

**Output:** `city count average` per line, average with 2 decimals.

**Constraints:** 1 ≤ n ≤ 1000, 0 ≤ marks ≤ 100, names and cities are single words.

## Hints

1. Build a second array of `struct City { char name[31]; int count; long long total; };`, finding or adding the city for each student.
2. Sort the cities with `qsort` and `strcmp`, then print `total / (double)count`.

```c starter
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct City { char name[31]; int count; long long total; };

struct City cities[1000];
int nc;

int main(void) {
    int n;
    scanf("%d", &n);
    /* read students, group by city */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct City { char name[31]; int count; long long total; };

struct City cities[1000];
int nc;

static int cmp(const void *a, const void *b) {
    return strcmp(((const struct City *)a)->name, ((const struct City *)b)->name);
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) {
        char name[31], city[31];
        int marks, k;
        if (scanf("%30s %30s %d", name, city, &marks) != 3) return 1;
        for (k = 0; k < nc && strcmp(cities[k].name, city) != 0; k++) ;
        if (k == nc) { strcpy(cities[nc].name, city); cities[nc].count = 0; cities[nc].total = 0; nc++; }
        cities[k].count++;
        cities[k].total += marks;
    }
    qsort(cities, (size_t)nc, sizeof cities[0], cmp);
    for (int k = 0; k < nc; k++)
        printf("%s %d %.2f\n", cities[k].name, cities[k].count, cities[k].total / (double)cities[k].count);
    return 0;
}
```

```test sample
5
Asha Pune 80
Bilal Delhi 70
Chitra Pune 91
Dan Agra 55
Esha Delhi 75
---
Agra 1 55.00
Delhi 2 72.50
Pune 2 85.50
```

```test hidden
1
Solo Goa 0
---
Goa 1 0.00
```

```test hidden
3
a X 1
b X 2
c X 2
---
X 3 1.67
```
