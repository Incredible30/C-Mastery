---
title: Sudoku Validator
difficulty: hard
topic: 2D Arrays
xp: 45
plan: pro
---
Check whether a completed 9 × 9 Sudoku grid is valid: every row, every column and every 3 × 3 box must contain each digit 1–9 exactly once. Print `VALID` or `INVALID`.

**Input:** 9 lines of 9 digits separated by spaces.

**Output:** `VALID` or `INVALID`.

**Constraints:** every value is between 1 and 9.

## Hints

1. Use three tables of flags: `row[9][10]`, `col[9][10]` and `box[9][10]`. The box index for cell `(i, j)` is `(i / 3) * 3 + j / 3`.
2. If a digit is already marked in its row, column or box, the grid is invalid.

```c starter
#include <stdio.h>

int main(void) {
    int g[9][9];
    for (int i = 0; i < 9; i++) for (int j = 0; j < 9; j++) scanf("%d", &g[i][j]);
    /* check rows, columns and boxes */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int g[9][9], row[9][10] = {{0}}, col[9][10] = {{0}}, box[9][10] = {{0}}, ok = 1;
    for (int i = 0; i < 9; i++) for (int j = 0; j < 9; j++) if (scanf("%d", &g[i][j]) != 1) return 1;
    for (int i = 0; i < 9; i++)
        for (int j = 0; j < 9; j++) {
            int d = g[i][j], b = (i / 3) * 3 + j / 3;
            if (row[i][d] || col[j][d] || box[b][d]) ok = 0;
            row[i][d] = col[j][d] = box[b][d] = 1;
        }
    printf("%s\n", ok ? "VALID" : "INVALID");
    return 0;
}
```

```test sample
5 3 4 6 7 8 9 1 2
6 7 2 1 9 5 3 4 8
1 9 8 3 4 2 5 6 7
8 5 9 7 6 1 4 2 3
4 2 6 8 5 3 7 9 1
7 1 3 9 2 4 8 5 6
9 6 1 5 3 7 2 8 4
2 8 7 4 1 9 6 3 5
3 4 5 2 8 6 1 7 9
---
VALID
```

```test hidden
5 3 4 6 7 8 9 1 2
6 7 2 1 9 5 3 4 8
1 9 8 3 4 2 5 6 7
8 5 9 7 6 1 4 2 3
4 2 6 8 5 3 7 9 1
7 1 3 9 2 4 8 5 6
9 6 1 5 3 7 2 8 4
2 8 7 4 1 9 6 3 5
3 4 5 2 8 6 1 9 7
---
INVALID
```

```test hidden
1 2 3 4 5 6 7 8 9
2 3 4 5 6 7 8 9 1
3 4 5 6 7 8 9 1 2
4 5 6 7 8 9 1 2 3
5 6 7 8 9 1 2 3 4
6 7 8 9 1 2 3 4 5
7 8 9 1 2 3 4 5 6
8 9 1 2 3 4 5 6 7
9 1 2 3 4 5 6 7 8
---
INVALID
```
