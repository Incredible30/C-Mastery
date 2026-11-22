---
title: Rotate a Square Matrix 90°
difficulty: hard
topic: 2D Arrays
xp: 45
plan: pro
---
Rotate an `n × n` matrix 90 degrees clockwise **in place**, without a second matrix, then print it. This is how image editors rotate pictures.

**Input:** `n`, then `n` rows of `n` integers.

**Output:** the rotated matrix.

**Constraints:** 1 ≤ n ≤ 200

## Hints

1. A clockwise rotation equals a transpose (swap `a[i][j]` with `a[j][i]` for `j > i`) followed by reversing each row.
2. Both steps only swap pairs of elements, so no extra matrix is needed.

```c starter
#include <stdio.h>

int a[200][200];

int main(void) {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) for (int j = 0; j < n; j++) scanf("%d", &a[i][j]);
    /* rotate in place and print */
    return 0;
}
```

```c solution
#include <stdio.h>

int a[200][200];

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) for (int j = 0; j < n; j++) if (scanf("%d", &a[i][j]) != 1) return 1;
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++) { int t = a[i][j]; a[i][j] = a[j][i]; a[j][i] = t; }
    for (int i = 0; i < n; i++)
        for (int l = 0, r = n - 1; l < r; l++, r--) { int t = a[i][l]; a[i][l] = a[i][r]; a[i][r] = t; }
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) printf(j ? " %d" : "%d", a[i][j]);
        printf("\n");
    }
    return 0;
}
```

```test sample
3
1 2 3
4 5 6
7 8 9
---
7 4 1
8 5 2
9 6 3
```

```test hidden
1
42
---
42
```

```test hidden
4
1 2 3 4
5 6 7 8
9 10 11 12
13 14 15 16
---
13 9 5 1
14 10 6 2
15 11 7 3
16 12 8 4
```
