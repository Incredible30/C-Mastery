---
title: Is It a Real Date?
difficulty: easy
topic: Structures
xp: 20
plan: free
---
Write `int is_valid(struct Date dt)` that checks whether a date exists. Remember leap years: divisible by 4, except centuries, unless divisible by 400. So 29 2 2000 is valid but 29 2 1900 isn't.

**Input:** `q`, then `q` dates as `d m y`.

**Output:** `VALID` or `INVALID` for each.

**Constraints:** 1 ≤ q ≤ 100, −100 ≤ d, m ≤ 100, 1 ≤ y ≤ 9999

## Hints

1. Keep the month lengths in an array: `{31,28,31,30,31,30,31,31,30,31,30,31}`.
2. Check the month range first, then use 29 for February in leap years.

```c starter
#include <stdio.h>

struct Date { int d, m, y; };

int is_valid(struct Date dt) {
    return 0;
}

int main(void) {
    int q;
    struct Date dt;
    scanf("%d", &q);
    while (q--) {
        scanf("%d %d %d", &dt.d, &dt.m, &dt.y);
        printf("%s\n", is_valid(dt) ? "VALID" : "INVALID");
    }
    return 0;
}
```

```c solution
#include <stdio.h>

struct Date { int d, m, y; };

int is_valid(struct Date dt) {
    static const int len[12] = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
    if (dt.m < 1 || dt.m > 12 || dt.d < 1) return 0;
    int leap = (dt.y % 4 == 0 && dt.y % 100 != 0) || dt.y % 400 == 0;
    int max = len[dt.m - 1] + (dt.m == 2 && leap);
    return dt.d <= max;
}

int main(void) {
    int q;
    struct Date dt;
    if (scanf("%d", &q) != 1) return 1;
    while (q--) {
        if (scanf("%d %d %d", &dt.d, &dt.m, &dt.y) != 3) return 1;
        printf("%s\n", is_valid(dt) ? "VALID" : "INVALID");
    }
    return 0;
}
```

```test sample
4
29 2 2000
29 2 1900
31 4 2023
15 8 1947
---
VALID
INVALID
INVALID
VALID
```

```test hidden
3
0 1 2020
1 13 2020
29 2 2024
---
INVALID
INVALID
VALID
```

```test hidden
2
31 12 9999
-5 3 2000
---
VALID
INVALID
```
