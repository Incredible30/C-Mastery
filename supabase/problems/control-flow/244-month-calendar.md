---
title: Print a Month Calendar
difficulty: hard
topic: Patterns
xp: 45
plan: free
---
Print a calendar for one month. You're given the number of days in the month and the weekday of the 1st (0 = Sunday, 1 = Monday, … 6 = Saturday).

The first line is `Su Mo Tu We Th Fr Sa`. Each date is printed right-aligned in a 2-character field, with one space between columns. Leave blank fields (two spaces) before the 1st. Start a new line after each Saturday. Don't print spaces at the end of a line or an empty line at the end.

For 30 days starting on Wednesday (3):

```
Su Mo Tu We Th Fr Sa
          1  2  3  4
 5  6  7  8  9 10 11
12 13 14 15 16 17 18
19 20 21 22 23 24 25
26 27 28 29 30
```

**Input:** two integers: the number of days and the starting weekday.

**Output:** the calendar.

**Constraints:** 28 ≤ days ≤ 31, 0 ≤ start ≤ 6

## Hints

1. Track the current column from 0 to 6. Before the 1st, print `start` blank fields of two spaces.
2. Print each date with `%2d`, putting a space before it unless it's in column 0. After column 6, print a newline and reset the column.

```c starter
#include <stdio.h>

int main(void) {
    int days, start;
    scanf("%d %d", &days, &start);
    printf("Su Mo Tu We Th Fr Sa\n");
    /* print the dates */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int days, start;
    if (scanf("%d %d", &days, &start) != 2) return 1;
    printf("Su Mo Tu We Th Fr Sa\n");
    int col = 0;
    for (; col < start; col++) printf(col ? "   " : "  ");
    for (int d = 1; d <= days; d++) {
        printf(col ? " %2d" : "%2d", d);
        if (++col == 7 && d < days) { printf("\n"); col = 0; }
    }
    printf("\n");
    return 0;
}
```

```test sample
30 3
---
Su Mo Tu We Th Fr Sa
          1  2  3  4
 5  6  7  8  9 10 11
12 13 14 15 16 17 18
19 20 21 22 23 24 25
26 27 28 29 30
```

```test hidden
28 0
---
Su Mo Tu We Th Fr Sa
 1  2  3  4  5  6  7
 8  9 10 11 12 13 14
15 16 17 18 19 20 21
22 23 24 25 26 27 28
```

```test hidden
31 6
---
Su Mo Tu We Th Fr Sa
                   1
 2  3  4  5  6  7  8
 9 10 11 12 13 14 15
16 17 18 19 20 21 22
23 24 25 26 27 28 29
30 31
```

```test hidden
29 1
---
Su Mo Tu We Th Fr Sa
    1  2  3  4  5  6
 7  8  9 10 11 12 13
14 15 16 17 18 19 20
21 22 23 24 25 26 27
28 29
```
