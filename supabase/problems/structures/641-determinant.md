---
title: Exact Determinant
difficulty: hard
topic: Structures
xp: 50
plan: pro
---
Compute the determinant of an `n × n` integer matrix **exactly**. Ordinary Gaussian elimination needs fractions; the **Bareiss algorithm** stays in integers because every division it does is exact.

Store the matrix in `struct Matrix { int n; long long a[8][8]; };`.

**Input:** `n`, then the matrix.

**Output:** the determinant.

**Constraints:** 1 ≤ n ≤ 8, |values| ≤ 20

## Hints

1. Bareiss: with `prev = 1`, for each `k`, if `a[k][k]` is 0 swap in a lower row with a non-zero entry in column `k` (flipping the sign), or return 0 if there is none. Then for all `i, j > k`: `a[i][j] = (a[i][j] * a[k][k] - a[i][k] * a[k][j]) / prev`, and set `prev = a[k][k]`.
2. The answer is `sign * a[n-1][n-1]`.

```c starter
#include <stdio.h>

struct Matrix { int n; long long a[8][8]; };

long long det(struct Matrix m) {
    return 0;
}

int main(void) {
    struct Matrix m;
    scanf("%d", &m.n);
    for (int i = 0; i < m.n; i++) for (int j = 0; j < m.n; j++) scanf("%lld", &m.a[i][j]);
    printf("%lld\n", det(m));
    return 0;
}
```

```c solution
#include <stdio.h>

struct Matrix { int n; long long a[8][8]; };

long long det(struct Matrix m) {
    int n = m.n, sign = 1;
    long long prev = 1;
    for (int k = 0; k < n - 1; k++) {
        if (m.a[k][k] == 0) {
            int r = k + 1;
            while (r < n && m.a[r][k] == 0) r++;
            if (r == n) return 0;
            for (int j = 0; j < n; j++) { long long t = m.a[k][j]; m.a[k][j] = m.a[r][j]; m.a[r][j] = t; }
            sign = -sign;
        }
        for (int i = k + 1; i < n; i++)
            for (int j = k + 1; j < n; j++)
                m.a[i][j] = (m.a[i][j] * m.a[k][k] - m.a[i][k] * m.a[k][j]) / prev;
        prev = m.a[k][k];
    }
    return sign * m.a[n - 1][n - 1];
}

int main(void) {
    struct Matrix m;
    if (scanf("%d", &m.n) != 1) return 1;
    for (int i = 0; i < m.n; i++) for (int j = 0; j < m.n; j++) if (scanf("%lld", &m.a[i][j]) != 1) return 1;
    printf("%lld\n", det(m));
    return 0;
}
```

```test sample
3
2 -3 1
2 0 -1
1 4 5
---
49
```

```test hidden
1
-7
---
-7
```

```test hidden
3
0 1 2
1 0 3
4 -3 8
---
-2
```

```test hidden
3
1 2 3
4 5 6
7 8 9
---
0
```

```test hidden
4
20 20 20 20
-20 20 20 20
-20 -20 20 20
-20 -20 -20 20
---
1280000
```
