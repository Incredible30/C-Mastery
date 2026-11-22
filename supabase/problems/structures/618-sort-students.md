---
title: Sort Students by Marks
difficulty: medium
topic: Arrays of Structures
xp: 25
plan: free
---
Sort students by marks from highest to lowest; students with equal marks go in alphabetical order of name. Use `qsort` with a comparator that receives pointers to two structures.

**Input:** `n`, then `n` lines of `name marks`.

**Output:** the sorted list, one `name marks` per line.

**Constraints:** 1 ≤ n ≤ 10000, 0 ≤ marks ≤ 100

## Hints

1. In the comparator: `const struct Student *x = a, *y = b;`
2. If the marks differ, return `y->marks - x->marks` (descending); otherwise return `strcmp(x->name, y->name)`.

```c starter
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Student { char name[31]; int marks; };

struct Student s[10000];

int cmp(const void *a, const void *b) {
    return 0;
}

int main(void) {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%30s %d", s[i].name, &s[i].marks);
    qsort(s, n, sizeof s[0], cmp);
    for (int i = 0; i < n; i++) printf("%s %d\n", s[i].name, s[i].marks);
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Student { char name[31]; int marks; };

struct Student s[10000];

int cmp(const void *a, const void *b) {
    const struct Student *x = a, *y = b;
    if (x->marks != y->marks) return y->marks - x->marks;
    return strcmp(x->name, y->name);
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) if (scanf("%30s %d", s[i].name, &s[i].marks) != 2) return 1;
    qsort(s, (size_t)n, sizeof s[0], cmp);
    for (int i = 0; i < n; i++) printf("%s %d\n", s[i].name, s[i].marks);
    return 0;
}
```

```test sample
5
Zara 88
Adam 92
Mia 88
Leo 70
Ben 92
---
Adam 92
Ben 92
Mia 88
Zara 88
Leo 70
```

```test hidden
1
Solo 50
---
Solo 50
```

```test hidden
3
c 0
b 0
a 0
---
a 0
b 0
c 0
```
