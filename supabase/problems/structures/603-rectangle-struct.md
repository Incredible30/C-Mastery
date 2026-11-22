---
title: Rectangle Struct
difficulty: easy
topic: Structures
xp: 15
plan: free
---
Define `struct Rect { int w, h; };` and two functions that take a rectangle **by value**: `long long area(struct Rect r)` and `long long perimeter(struct Rect r)`.

**Input:** width and height.

**Output:** the area and the perimeter.

**Constraints:** 1 ≤ w, h ≤ 10^6

## Hints

1. Access members with the dot: `r.w * r.h`.
2. The area can reach 10^12, so convert to `long long` before multiplying: `(long long)r.w * r.h`.

```c starter
#include <stdio.h>

struct Rect { int w, h; };

long long area(struct Rect r) { return 0; }
long long perimeter(struct Rect r) { return 0; }

int main(void) {
    struct Rect r;
    scanf("%d %d", &r.w, &r.h);
    printf("%lld %lld\n", area(r), perimeter(r));
    return 0;
}
```

```c solution
#include <stdio.h>

struct Rect { int w, h; };

long long area(struct Rect r) { return (long long)r.w * r.h; }
long long perimeter(struct Rect r) { return 2LL * (r.w + r.h); }

int main(void) {
    struct Rect r;
    if (scanf("%d %d", &r.w, &r.h) != 2) return 1;
    printf("%lld %lld\n", area(r), perimeter(r));
    return 0;
}
```

```test sample
3 5
---
15 16
```

```test hidden
1 1
---
1 4
```

```test hidden
1000000 1000000
---
1000000000000 4000000
```
