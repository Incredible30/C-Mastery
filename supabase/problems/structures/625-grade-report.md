---
title: Grade Report
difficulty: medium
topic: Arrays of Structures
xp: 25
plan: free
---
Each student has a name and marks in three subjects. Compute every student's total, average and grade, store them in the structure, and print a report in input order.

Grades by average: A ≥ 90, B ≥ 75, C ≥ 60, D ≥ 40, otherwise F.

**Input:** `n`, then `n` lines of `name m1 m2 m3`.

**Output:** `name total average grade` per line, average with 2 decimals.

**Constraints:** 1 ≤ n ≤ 1000, 0 ≤ marks ≤ 100

## Hints

1. `struct Student { char name[31]; int marks[3]; int total; double avg; char grade; };` A structure can hold an array.
2. Fill `total`, `avg` and `grade` in a function that takes `struct Student *`.

```c starter
#include <stdio.h>

struct Student { char name[31]; int marks[3]; int total; double avg; char grade; };

struct Student s[1000];

int main(void) {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++)
        scanf("%30s %d %d %d", s[i].name, &s[i].marks[0], &s[i].marks[1], &s[i].marks[2]);
    /* compute and print */
    return 0;
}
```

```c solution
#include <stdio.h>

struct Student { char name[31]; int marks[3]; int total; double avg; char grade; };

struct Student s[1000];

static void evaluate(struct Student *p) {
    p->total = p->marks[0] + p->marks[1] + p->marks[2];
    p->avg = p->total / 3.0;
    p->grade = p->avg >= 90 ? 'A' : p->avg >= 75 ? 'B' : p->avg >= 60 ? 'C' : p->avg >= 40 ? 'D' : 'F';
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++)
        if (scanf("%30s %d %d %d", s[i].name, &s[i].marks[0], &s[i].marks[1], &s[i].marks[2]) != 4) return 1;
    for (int i = 0; i < n; i++) {
        evaluate(&s[i]);
        printf("%s %d %.2f %c\n", s[i].name, s[i].total, s[i].avg, s[i].grade);
    }
    return 0;
}
```

```test sample
3
Isha 95 88 92
Omar 60 70 65
Raj 30 45 20
---
Isha 275 91.67 A
Omar 195 65.00 C
Raj 95 31.67 F
```

```test hidden
1
Edge 90 90 90
---
Edge 270 90.00 A
```

```test hidden
2
Low 0 0 0
Mid 75 75 74
---
Low 0 0.00 F
Mid 224 74.67 C
```
