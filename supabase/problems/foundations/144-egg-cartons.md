---
title: Egg Cartons
difficulty: hard
topic: Arithmetic
xp: 40
plan: free
---
A farm packs `n` eggs into cartons that hold 12 eggs and boxes that hold 6. Every egg must be packed, and the last container may be partly empty. Use as many 12-egg cartons as possible, then the fewest 6-egg boxes for what's left.

Print the number of cartons, the number of boxes, and the empty spaces in the last container.

**Input:** one integer `n`.

**Output:** three integers separated by spaces: cartons, boxes, empty spaces.

**Constraints:** 0 ≤ n ≤ 10^9

## Hints

1. Cartons = n / 12. The rest, r = n % 12, is between 0 and 11.
2. Boxes needed for r eggs is r rounded up to a multiple of 6, divided by 6: `(r + 5) / 6`. Empty spaces = `boxes × 6 − r`.

```c starter
#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    /* print cartons, boxes and empty spaces */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    int cartons = n / 12, r = n % 12;
    int boxes = (r + 5) / 6;
    printf("%d %d %d\n", cartons, boxes, boxes * 6 - r);
    return 0;
}
```

```test sample
40
---
3 1 2
```

```test hidden
0
---
0 0 0
```

```test hidden
12
---
1 0 0
```

```test hidden
7
---
0 2 5
```

```test hidden
999999999
---
83333333 1 3
```
