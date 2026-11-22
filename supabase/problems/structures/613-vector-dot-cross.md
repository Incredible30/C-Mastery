---
title: Dot and Cross Product
difficulty: easy
topic: Structures
xp: 20
plan: free
---
Use `typedef` to name a structure: `typedef struct { long long x, y, z; } Vec3;`. Then you can write `Vec3 a;` instead of `struct ... a;`. Compute the dot product and the cross product of two 3D vectors.

**Input:** `x1 y1 z1 x2 y2 z2`.

**Output:** line 1: the dot product; line 2: the cross product's three components.

**Constraints:** |values| ≤ 10^6

## Hints

1. Dot: `a.x*b.x + a.y*b.y + a.z*b.z`.
2. Cross: `(a.y*b.z - a.z*b.y, a.z*b.x - a.x*b.z, a.x*b.y - a.y*b.x)`.

```c starter
#include <stdio.h>

typedef struct { long long x, y, z; } Vec3;

int main(void) {
    Vec3 a, b;
    scanf("%lld %lld %lld %lld %lld %lld", &a.x, &a.y, &a.z, &b.x, &b.y, &b.z);
    /* dot and cross */
    return 0;
}
```

```c solution
#include <stdio.h>

typedef struct { long long x, y, z; } Vec3;

static long long dot(Vec3 a, Vec3 b) { return a.x * b.x + a.y * b.y + a.z * b.z; }

static Vec3 cross(Vec3 a, Vec3 b) {
    Vec3 r = {a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x};
    return r;
}

int main(void) {
    Vec3 a, b;
    if (scanf("%lld %lld %lld %lld %lld %lld", &a.x, &a.y, &a.z, &b.x, &b.y, &b.z) != 6) return 1;
    Vec3 c = cross(a, b);
    printf("%lld\n%lld %lld %lld\n", dot(a, b), c.x, c.y, c.z);
    return 0;
}
```

```test sample
1 2 3 4 5 6
---
32
-3 6 -3
```

```test hidden
1 0 0 0 1 0
---
0
0 0 1
```

```test hidden
2 2 2 2 2 2
---
12
0 0 0
```
