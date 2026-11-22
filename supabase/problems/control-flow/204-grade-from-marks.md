---
title: Grade From Marks
difficulty: easy
topic: Conditions
xp: 10
plan: free
---
Convert marks out of 100 into a grade:

| Marks | Grade |
| --- | --- |
| 90–100 | A |
| 75–89 | B |
| 60–74 | C |
| 40–59 | D |
| below 40 | F |

**Input:** one integer `marks`.

**Output:** the grade letter.

**Constraints:** 0 ≤ marks ≤ 100

## Hints

1. Use an `if` / `else if` chain, checking the highest band first.
2. If you check `marks >= 40` first, a 95 would get a D.

```c starter
#include <stdio.h>

int main(void) {
    int m;
    scanf("%d", &m);
    /* print the grade */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int m;
    if (scanf("%d", &m) != 1) return 1;
    char g;
    if (m >= 90) g = 'A';
    else if (m >= 75) g = 'B';
    else if (m >= 60) g = 'C';
    else if (m >= 40) g = 'D';
    else g = 'F';
    printf("%c\n", g);
    return 0;
}
```

```test sample
78
---
B
```

```test hidden
90
---
A
```

```test hidden
39
---
F
```

```test hidden
60
---
C
```

```test hidden
100
---
A
```
