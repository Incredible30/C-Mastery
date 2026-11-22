---
title: RGB to Hex Colour
difficulty: hard
topic: Input & Output
xp: 40
plan: free
---
Web colours are written as `#RRGGBB`, where each pair is a hexadecimal number from `00` to `FF`. Given red, green and blue values, print the hex code, the colour packed into a single integer (R × 65536 + G × 256 + B), and its grey level (R × 299 + G × 587 + B × 114) / 1000, rounded down.

**Input:** three integers `r g b`.

**Output:** the hex code, the packed integer and the grey level, separated by spaces.

**Constraints:** 0 ≤ r, g, b ≤ 255

## Hints

1. `%02X` prints a number as two uppercase hex digits, padded with a zero.
2. Packing is `r * 65536 + g * 256 + b`, or `(r << 16) | (g << 8) | b` with shifts.

```c starter
#include <stdio.h>

int main(void) {
    int r, g, b;
    scanf("%d %d %d", &r, &g, &b);
    /* print hex code, packed value and grey level */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int r, g, b;
    if (scanf("%d %d %d", &r, &g, &b) != 3) return 1;
    printf("#%02X%02X%02X %d %d\n", r, g, b, (r << 16) | (g << 8) | b, (r * 299 + g * 587 + b * 114) / 1000);
    return 0;
}
```

```test sample
255 165 0
---
#FFA500 16753920 173
```

```test hidden
0 0 0
---
#000000 0 0
```

```test hidden
255 255 255
---
#FFFFFF 16777215 255
```

```test hidden
10 117 112
---
#0A7570 685424 84
```
