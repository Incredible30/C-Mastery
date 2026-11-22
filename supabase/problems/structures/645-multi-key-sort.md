---
title: Multi-Key Sort
difficulty: hard
topic: Arrays of Structures
xp: 40
plan: pro
---
Sort employee records by four keys, each in its own direction:

1. department, A → Z
2. salary, highest first
3. age, youngest first
4. name, A → Z

**Input:** `n`, then `n` lines of `name dept salary age`.

**Output:** the sorted records in the same format.

**Constraints:** 1 ≤ n ≤ 100000, 0 ≤ salary ≤ 10^9, 18 ≤ age ≤ 100

## Hints

1. The comparator checks each key in priority order and returns as soon as one differs.
2. For the descending key, swap the operands: `(y->salary > x->salary) - (y->salary < x->salary)`.

```c starter
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Emp { char name[21]; char dept[21]; int salary; int age; };

struct Emp e[100000];

int main(void) {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%20s %20s %d %d", e[i].name, e[i].dept, &e[i].salary, &e[i].age);
    /* qsort with a four-key comparator */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Emp { char name[21]; char dept[21]; int salary; int age; };

struct Emp e[100000];

static int cmp(const void *a, const void *b) {
    const struct Emp *x = a, *y = b;
    int c = strcmp(x->dept, y->dept);
    if (c) return c;
    if (x->salary != y->salary) return (y->salary > x->salary) - (y->salary < x->salary);
    if (x->age != y->age) return x->age - y->age;
    return strcmp(x->name, y->name);
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++)
        if (scanf("%20s %20s %d %d", e[i].name, e[i].dept, &e[i].salary, &e[i].age) != 4) return 1;
    qsort(e, (size_t)n, sizeof e[0], cmp);
    for (int i = 0; i < n; i++) printf("%s %s %d %d\n", e[i].name, e[i].dept, e[i].salary, e[i].age);
    return 0;
}
```

```test sample
6
Ravi Sales 50000 30
Anu IT 90000 28
Joe Sales 50000 25
Kim IT 90000 28
Lee HR 40000 45
Max Sales 70000 40
---
Lee HR 40000 45
Anu IT 90000 28
Kim IT 90000 28
Max Sales 70000 40
Joe Sales 50000 25
Ravi Sales 50000 30
```

```test hidden
1
Only Ops 0 18
---
Only Ops 0 18
```

```test hidden
3
c X 1 20
b X 1 20
a X 1 20
---
a X 1 20
b X 1 20
c X 1 20
```
