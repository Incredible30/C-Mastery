---
title: Salary Raise
difficulty: easy
topic: Pointers to Structures
xp: 20
plan: free
---
Write `void raise_salary(struct Employee *e, double percent)` that increases an employee's salary by a percentage. Apply the same raise to `n` employees and print the new salaries.

**Input:** `n` and `percent`, then `n` lines of `name salary`.

**Output:** `name new_salary` per line, salary with 2 decimals.

**Constraints:** 1 ≤ n ≤ 1000, 0 ≤ percent ≤ 100, 0 ≤ salary ≤ 10^7

## Hints

1. `e->salary *= 1 + percent / 100;`
2. Call it with the address of each array element: `raise_salary(&emp[i], p);`

```c starter
#include <stdio.h>

struct Employee { char name[31]; double salary; };

struct Employee emp[1000];

void raise_salary(struct Employee *e, double percent) {
}

int main(void) {
    int n;
    double p;
    scanf("%d %lf", &n, &p);
    for (int i = 0; i < n; i++) scanf("%30s %lf", emp[i].name, &emp[i].salary);
    /* raise everyone and print */
    return 0;
}
```

```c solution
#include <stdio.h>

struct Employee { char name[31]; double salary; };

struct Employee emp[1000];

void raise_salary(struct Employee *e, double percent) {
    e->salary *= 1 + percent / 100;
}

int main(void) {
    int n;
    double p;
    if (scanf("%d %lf", &n, &p) != 2) return 1;
    for (int i = 0; i < n; i++) if (scanf("%30s %lf", emp[i].name, &emp[i].salary) != 2) return 1;
    for (int i = 0; i < n; i++) {
        raise_salary(&emp[i], p);
        printf("%s %.2f\n", emp[i].name, emp[i].salary);
    }
    return 0;
}
```

```test sample
2 10
Ana 50000
Ben 42000
---
Ana 55000.00
Ben 46200.00
```

```test hidden
1 0
Same 1234.5
---
Same 1234.50
```

```test hidden
2 12.5
X 800
Y 0
---
X 900.00
Y 0.00
```
