---
title: Shop Inventory
difficulty: medium
topic: Arrays of Structures
xp: 30
plan: free
---
Keep a shop's stock as an array of `struct Item { char name[31]; int qty; long long price; };`. Process commands:

- `ADD name qty price`: add stock. A new item is appended; an existing one gets more quantity and the new price.
- `SELL name qty`: remove stock. Print `UNKNOWN name` if the item doesn't exist, or `INSUFFICIENT name` if there isn't enough (nothing changes).

At the end print every item in the order it was first added, with its stock value (qty × price).

**Input:** `q`, then `q` commands.

**Output:** the error lines as they happen, then `name qty value` for each item.

**Constraints:** 1 ≤ q ≤ 1000, 1 ≤ qty ≤ 10^6, 1 ≤ price ≤ 10^6

## Hints

1. Write `struct Item *find(const char *name)` that returns `NULL` when missing.
2. Use `long long` for the value: 10^6 × 10^6 overflows `int`.

```c starter
#include <stdio.h>
#include <string.h>

struct Item { char name[31]; int qty; long long price; };

struct Item items[1000];
int count;

int main(void) {
    int q;
    char cmd[8], name[31];
    scanf("%d", &q);
    while (q--) {
        scanf("%7s %30s", cmd, name);
        /* ADD or SELL */
    }
    return 0;
}
```

```c solution
#include <stdio.h>
#include <string.h>

struct Item { char name[31]; int qty; long long price; };

struct Item items[1000];
int count;

static struct Item *find(const char *name) {
    for (int i = 0; i < count; i++) if (strcmp(items[i].name, name) == 0) return &items[i];
    return NULL;
}

int main(void) {
    int q;
    char cmd[8], name[31];
    if (scanf("%d", &q) != 1) return 1;
    while (q--) {
        int qty;
        if (scanf("%7s %30s %d", cmd, name, &qty) != 3) return 1;
        struct Item *it = find(name);
        if (strcmp(cmd, "ADD") == 0) {
            long long price;
            if (scanf("%lld", &price) != 1) return 1;
            if (!it) { it = &items[count++]; strcpy(it->name, name); it->qty = 0; }
            it->qty += qty;
            it->price = price;
        } else if (!it) printf("UNKNOWN %s\n", name);
        else if (it->qty < qty) printf("INSUFFICIENT %s\n", name);
        else it->qty -= qty;
    }
    for (int i = 0; i < count; i++)
        printf("%s %d %lld\n", items[i].name, items[i].qty, items[i].qty * items[i].price);
    return 0;
}
```

```test sample
6
ADD pen 100 5
ADD book 20 120
SELL pen 30
SELL ink 1
SELL book 25
ADD pen 10 6
---
UNKNOWN ink
INSUFFICIENT book
pen 80 480
book 20 2400
```

```test hidden
2
ADD big 1000000 1000000
SELL big 1000000
---
big 0 0
```

```test hidden
1
SELL ghost 1
---
UNKNOWN ghost
```
