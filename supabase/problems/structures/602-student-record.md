---
title: Student Record
difficulty: easy
topic: Structures
xp: 15
plan: free
---
A structure groups related data under one name. Define `struct Student` with a `name` (up to 30 characters), an `age` and `marks` (a decimal number). Read one student and print a formatted record.

**Input:** name, age and marks.

**Output:** `name (age) - marks` with marks to 1 decimal.

**Constraints:** 1 ≤ age ≤ 120, 0 ≤ marks ≤ 100

## Hints

1. `struct Student { char name[31]; int age; double marks; };`
2. `s.name` is already an array, so `scanf("%30s", s.name)` needs no `&`.

```c starter
#include <stdio.h>

struct Student {
    /* name, age, marks */
};

int main(void) {
    /* read and print one student */
    return 0;
}
```

```c solution
#include <stdio.h>

struct Student {
    char name[31];
    int age;
    double marks;
};

int main(void) {
    struct Student s;
    if (scanf("%30s %d %lf", s.name, &s.age, &s.marks) != 3) return 1;
    printf("%s (%d) - %.1f\n", s.name, s.age, s.marks);
    return 0;
}
```

```test sample
Asha 19 87.5
---
Asha (19) - 87.5
```

```test hidden
Bo 7 100
---
Bo (7) - 100.0
```

```test hidden
Christopher 45 0
---
Christopher (45) - 0.0
```
