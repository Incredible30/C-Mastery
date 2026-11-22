---
title: Spiral Order
difficulty: hard
topic: 2D Arrays
xp: 45
plan: pro
---
Print the elements of an `r × c` matrix in clockwise spiral order, starting at the top-left: across the top row, down the right column, back along the bottom row, up the left column, then the same for the inner part.

**Input:** `r` and `c`, then the matrix.

**Output:** the elements in spiral order on one line.

**Constraints:** 1 ≤ r, c ≤ 100

## Hints

1. Keep four boundaries: `top`, `bottom`, `left`, `right`. After walking one side, move that boundary inward.
2. Before walking the bottom row and the left column, check that `top <= bottom` and `left <= right`, or single rows and columns get printed twice.

```c starter
#include <stdio.h>

int a[100][100];

int main(void) {
    int r, c;
    scanf("%d %d", &r, &c);
    for (int i = 0; i < r; i++) for (int j = 0; j < c; j++) scanf("%d", &a[i][j]);
    /* print in spiral order */
    return 0;
}
```

```c solution
#include <stdio.h>

int a[100][100];
static int first = 1;

static void out(int v) { printf(first ? "%d" : " %d", v); first = 0; }

int main(void) {
    int r, c;
    if (scanf("%d %d", &r, &c) != 2) return 1;
    for (int i = 0; i < r; i++) for (int j = 0; j < c; j++) if (scanf("%d", &a[i][j]) != 1) return 1;
    int top = 0, bottom = r - 1, left = 0, right = c - 1;
    while (top <= bottom && left <= right) {
        for (int j = left; j <= right; j++) out(a[top][j]);
        top++;
        for (int i = top; i <= bottom; i++) out(a[i][right]);
        right--;
        if (top <= bottom) { for (int j = right; j >= left; j--) out(a[bottom][j]); bottom--; }
        if (left <= right) { for (int i = bottom; i >= top; i--) out(a[i][left]); left++; }
    }
    printf("\n");
    return 0;
}
```

```test sample
3 4
1 2 3 4
5 6 7 8
9 10 11 12
---
1 2 3 4 8 12 11 10 9 5 6 7
```

```test hidden
1 1
5
---
5
```

```test hidden
4 1
1
2
3
4
---
1 2 3 4
```

```test hidden
4 4
1 2 3 4
5 6 7 8
9 10 11 12
13 14 15 16
---
1 2 3 4 8 12 16 15 14 13 9 5 6 7 11 10
```
