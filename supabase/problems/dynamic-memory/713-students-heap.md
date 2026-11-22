---
title: Class List on the Heap
difficulty: easy
topic: malloc & free
xp: 20
plan: free
---
Allocate an array of `n` `struct Student` records with `malloc`, read them, and print the class average followed by the names of students who scored at or above it.

**Input:** `n`, then `n` lines of `name marks`.

**Output:** the average with 2 decimals, then the qualifying names one per line.

**Constraints:** 1 ≤ n ≤ 10^5, 0 ≤ marks ≤ 100

## Hints

1. `struct Student *s = malloc(n * sizeof *s);` then use `s[i].name` as usual.
2. Compare as doubles: `s[i].marks >= avg`.

```c starter
#include <stdio.h>
#include <stdlib.h>

struct Student { char name[31]; int marks; };

int main(void) {
    int n;
    scanf("%d", &n);
    /* allocate n students */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>

struct Student { char name[31]; int marks; };

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    struct Student *s = malloc((size_t)n * sizeof *s);
    if (!s) return 1;
    long long total = 0;
    for (int i = 0; i < n; i++) { if (scanf("%30s %d", s[i].name, &s[i].marks) != 2) return 1; total += s[i].marks; }
    double avg = (double)total / n;
    printf("%.2f\n", avg);
    for (int i = 0; i < n; i++) if (s[i].marks >= avg) printf("%s\n", s[i].name);
    free(s);
    return 0;
}
```

```test sample
4
Ana 70
Raj 85
Sam 60
Tia 90
---
76.25
Raj
Tia
```

```test hidden
1
Solo 0
---
0.00
Solo
```

```test hidden
3
A 50
B 50
C 51
---
50.33
C
```
