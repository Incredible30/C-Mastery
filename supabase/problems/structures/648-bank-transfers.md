---
title: Bank Transfers
difficulty: hard
topic: Arrays of Structures
xp: 45
plan: pro
---
A bank keeps `struct Account { int id; char owner[31]; long long balance; }` records. Process commands:

- `D id amount`: deposit.
- `T from to amount`: transfer. It is **rejected** if either account doesn't exist, `from == to`, or `from` has too little money.

Unknown ids in a deposit are also rejected. At the end print the accounts sorted by balance (highest first, ties by smaller id), then the number of rejected commands.

**Input:** `n`, then `n` lines of `id owner balance`; `q`, then `q` commands.

**Output:** `id owner balance` per account in sorted order, then `Rejected: k`.

**Constraints:** 1 ≤ n ≤ 1000, 1 ≤ q ≤ 10000, amounts and balances are between 0 and 10^12, ids are distinct.

## Hints

1. A `find(id)` that returns `struct Account *` (or `NULL`) keeps each command short; check every rejection rule **before** changing any balance.
2. Sort with `qsort` only at the end, because sorting moves the records around.

```c starter
#include <stdio.h>
#include <stdlib.h>

struct Account { int id; char owner[31]; long long balance; };

struct Account acc[1000];
int n;

int main(void) {
    int q;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%d %30s %lld", &acc[i].id, acc[i].owner, &acc[i].balance);
    scanf("%d", &q);
    /* process commands */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>

struct Account { int id; char owner[31]; long long balance; };

struct Account acc[1000];
int n;

static struct Account *find(int id) {
    for (int i = 0; i < n; i++) if (acc[i].id == id) return &acc[i];
    return NULL;
}

static int cmp(const void *a, const void *b) {
    const struct Account *x = a, *y = b;
    if (x->balance != y->balance) return (y->balance > x->balance) - (y->balance < x->balance);
    return (x->id > y->id) - (x->id < y->id);
}

int main(void) {
    int q, rejected = 0;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) if (scanf("%d %30s %lld", &acc[i].id, acc[i].owner, &acc[i].balance) != 3) return 1;
    if (scanf("%d", &q) != 1) return 1;
    while (q--) {
        char op;
        if (scanf(" %c", &op) != 1) return 1;
        if (op == 'D') {
            int id;
            long long amt;
            if (scanf("%d %lld", &id, &amt) != 2) return 1;
            struct Account *a = find(id);
            if (a) a->balance += amt; else rejected++;
        } else {
            int from, to;
            long long amt;
            if (scanf("%d %d %lld", &from, &to, &amt) != 3) return 1;
            struct Account *a = find(from), *b = find(to);
            if (!a || !b || a == b || a->balance < amt) { rejected++; continue; }
            a->balance -= amt;
            b->balance += amt;
        }
    }
    qsort(acc, (size_t)n, sizeof acc[0], cmp);
    for (int i = 0; i < n; i++) printf("%d %s %lld\n", acc[i].id, acc[i].owner, acc[i].balance);
    printf("Rejected: %d\n", rejected);
    return 0;
}
```

```test sample
3
1 Asha 500
2 Ben 300
3 Cara 300
5
T 1 2 200
T 2 9 10
T 3 3 5
D 3 250
T 2 1 600
---
3 Cara 550
2 Ben 500
1 Asha 300
Rejected: 3
```

```test hidden
2
5 X 0
6 Y 0
2
T 5 6 1
D 7 10
---
5 X 0
6 Y 0
Rejected: 2
```

```test hidden
1
1 Solo 1000000000000
1
D 1 1000000000000
---
1 Solo 2000000000000
Rejected: 0
```
