---
title: Pack Dates Into Bits
difficulty: medium
topic: Bit-fields
xp: 30
plan: free
---
A day needs 5 bits (1–31), a month 4 bits (1–12) and a year 12 bits (0–4095). Pack a date into one integer as `day | month << 5 | year << 9`, and unpack integers back into dates. C's **bit-fields** (`struct { unsigned d : 5; unsigned m : 4; unsigned y : 12; }`) describe the same idea, but their exact layout is up to the compiler, so here you do it with shifts and masks.

**Input:** `q`, then `q` commands: `P d m y` (pack) or `U n` (unpack).

**Output:** for `P`, the packed number; for `U`, the date as `d m y`.

**Constraints:** 1 ≤ q ≤ 1000, valid dates with 0 ≤ y ≤ 4095, packed values come from valid dates.

## Hints

1. Pack: `(unsigned)d | (unsigned)m << 5 | (unsigned)y << 9`.
2. Unpack with masks: `d = n & 31`, `m = (n >> 5) & 15`, `y = n >> 9`.

```c starter
#include <stdio.h>

struct Date { unsigned d, m, y; };

int main(void) {
    int q;
    char op;
    scanf("%d", &q);
    while (q--) {
        scanf(" %c", &op);
        /* pack or unpack */
    }
    return 0;
}
```

```c solution
#include <stdio.h>

struct Date { unsigned d, m, y; };

static unsigned pack(struct Date dt) { return dt.d | dt.m << 5 | dt.y << 9; }

static struct Date unpack(unsigned n) {
    struct Date dt = {n & 31u, (n >> 5) & 15u, n >> 9};
    return dt;
}

int main(void) {
    int q;
    char op;
    if (scanf("%d", &q) != 1) return 1;
    while (q--) {
        if (scanf(" %c", &op) != 1) return 1;
        if (op == 'P') {
            struct Date dt;
            if (scanf("%u %u %u", &dt.d, &dt.m, &dt.y) != 3) return 1;
            printf("%u\n", pack(dt));
        } else {
            unsigned n;
            if (scanf("%u", &n) != 1) return 1;
            struct Date dt = unpack(n);
            printf("%u %u %u\n", dt.d, dt.m, dt.y);
        }
    }
    return 0;
}
```

```test sample
3
P 15 8 1947
P 1 1 0
U 997103
---
997135
33
15 7 1947
```

```test hidden
2
P 31 12 4095
U 2097023
---
2097055
31 11 4095
```

```test hidden
1
U 33
---
1 1 0
```
