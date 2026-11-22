---
title: Top Student
difficulty: easy
topic: Arrays of Structures
xp: 20
plan: free
---
Read `n` students (name and marks) into an **array of structures** and print the one with the highest marks. If several share the top mark, print the first.

**Input:** `n`, then `n` lines of `name marks`.

**Output:** the top student's name and marks.

**Constraints:** 1 ≤ n ≤ 1000, 0 ≤ marks ≤ 100 (integers)

## Hints

1. `struct Student s[1000];` and read with `scanf("%30s %d", s[i].name, &s[i].marks);`
2. Remember the index of the best student; replace it only for strictly higher marks.

```c starter
#include <stdio.h>

struct Student { char name[31]; int marks; };

struct Student s[1000];

int main(void) {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%30s %d", s[i].name, &s[i].marks);
    /* find the top student */
    return 0;
}
```

```c solution
#include <stdio.h>

struct Student { char name[31]; int marks; };

struct Student s[1000];

int main(void) {
    int n, best = 0;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) if (scanf("%30s %d", s[i].name, &s[i].marks) != 2) return 1;
    for (int i = 1; i < n; i++) if (s[i].marks > s[best].marks) best = i;
    printf("%s %d\n", s[best].name, s[best].marks);
    return 0;
}
```

```test sample
4
Ravi 78
Meena 92
Tom 85
Lia 92
---
Meena 92
```

```test hidden
1
Solo 0
---
Solo 0
```

```test hidden
3
A 10
B 20
C 30
---
C 30
```
