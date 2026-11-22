---
title: Who Passed?
difficulty: easy
topic: Arrays of Structures
xp: 15
plan: free
---
Read `n` students with their marks. A student passes with 40 or more. Print the names of everyone who passed, in input order, followed by the pass count.

**Input:** `n`, then `n` lines of `name marks`.

**Output:** each passing name on its own line, then `Passed: k`.

**Constraints:** 1 ≤ n ≤ 1000, 0 ≤ marks ≤ 100

## Hints

1. Read all students into an array of structures first.
2. Loop again and print `s[i].name` when `s[i].marks >= 40`, counting as you go.

```c starter
#include <stdio.h>

struct Student { char name[31]; int marks; };

struct Student s[1000];

int main(void) {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%30s %d", s[i].name, &s[i].marks);
    /* print passers and count */
    return 0;
}
```

```c solution
#include <stdio.h>

struct Student { char name[31]; int marks; };

struct Student s[1000];

int main(void) {
    int n, k = 0;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) if (scanf("%30s %d", s[i].name, &s[i].marks) != 2) return 1;
    for (int i = 0; i < n; i++) if (s[i].marks >= 40) { printf("%s\n", s[i].name); k++; }
    printf("Passed: %d\n", k);
    return 0;
}
```

```test sample
4
Amit 35
Bela 40
Chen 88
Dev 12
---
Bela
Chen
Passed: 2
```

```test hidden
2
X 0
Y 39
---
Passed: 0
```

```test hidden
1
Top 100
---
Top
Passed: 1
```
