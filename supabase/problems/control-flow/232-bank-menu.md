---
title: Bank Account Menu
difficulty: medium
topic: Switch
xp: 25
plan: free
---
Simulate a bank account that starts with ₹0. Read commands until the command `0`:

| Command | Meaning |
| --- | --- |
| `1 x` | deposit `x` rupees |
| `2 x` | withdraw `x` rupees; if the balance is too low, print `INSUFFICIENT` and change nothing |
| `3` | print the current balance |
| `0` | stop |

**Input:** commands, one per line, ending with `0`.

**Output:** one line for each `3` command and each refused withdrawal.

**Constraints:** at most 100000 commands, 1 ≤ x ≤ 10^9

## Hints

1. Use a `while (1)` loop that reads a command and `break`s on 0.
2. A `switch` on the command handles each case. Keep the balance in a `long long`.

```c starter
#include <stdio.h>

int main(void) {
    long long balance = 0;
    int cmd;
    while (scanf("%d", &cmd) == 1 && cmd != 0) {
        /* handle the command */
    }
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    long long balance = 0, x;
    int cmd;
    while (scanf("%d", &cmd) == 1 && cmd != 0) {
        switch (cmd) {
            case 1:
                if (scanf("%lld", &x) != 1) return 1;
                balance += x;
                break;
            case 2:
                if (scanf("%lld", &x) != 1) return 1;
                if (x > balance) printf("INSUFFICIENT\n");
                else balance -= x;
                break;
            case 3:
                printf("%lld\n", balance);
                break;
        }
    }
    return 0;
}
```

```test sample
1 500
2 200
3
2 1000
3
0
---
300
INSUFFICIENT
300
```

```test hidden
3
0
---
0
```

```test hidden
1 1000000000
1 1000000000
2 1999999999
3
2 2
3
0
---
1
INSUFFICIENT
1
```
