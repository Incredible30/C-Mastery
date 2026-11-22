---
title: Bank Account
difficulty: easy
topic: Pointers to Structures
xp: 20
plan: free
---
Model a bank account as `struct Account { char owner[31]; long long balance; };`. Process deposits (`D amount`) and withdrawals (`W amount`) through functions that take a `struct Account *`. A withdrawal larger than the balance is **rejected** and changes nothing.

**Input:** owner name and starting balance; `q`; then `q` operations.

**Output:** `owner balance`, then `Rejected: k`.

**Constraints:** 0 ≤ amounts, balance ≤ 10^12, 1 ≤ q ≤ 1000

## Hints

1. `int withdraw(struct Account *a, long long x)` returns 0 if `x > a->balance`, otherwise subtracts and returns 1.
2. Count the operations where `withdraw` returned 0.

```c starter
#include <stdio.h>

struct Account { char owner[31]; long long balance; };

int main(void) {
    struct Account acc;
    int q;
    scanf("%30s %lld %d", acc.owner, &acc.balance, &q);
    /* process operations */
    return 0;
}
```

```c solution
#include <stdio.h>

struct Account { char owner[31]; long long balance; };

static void deposit(struct Account *a, long long x) { a->balance += x; }

static int withdraw(struct Account *a, long long x) {
    if (x > a->balance) return 0;
    a->balance -= x;
    return 1;
}

int main(void) {
    struct Account acc;
    int q, rejected = 0;
    if (scanf("%30s %lld %d", acc.owner, &acc.balance, &q) != 3) return 1;
    while (q--) {
        char op;
        long long x;
        if (scanf(" %c %lld", &op, &x) != 2) return 1;
        if (op == 'D') deposit(&acc, x);
        else if (!withdraw(&acc, x)) rejected++;
    }
    printf("%s %lld\nRejected: %d\n", acc.owner, acc.balance, rejected);
    return 0;
}
```

```test sample
Ravi 100 4
D 50
W 120
W 100
D 10
---
Ravi 40
Rejected: 1
```

```test hidden
Zero 0 1
W 1
---
Zero 0
Rejected: 1
```

```test hidden
Rich 1000000000000 2
W 1000000000000
D 5
---
Rich 5
Rejected: 0
```
