---
title: Ways to Make Change
difficulty: hard
topic: Recursion
xp: 50
plan: free
---
Indian coins and notes used for small change come in ₹1, ₹2, ₹5, ₹10, ₹20 and ₹50. In how many different ways can you make exactly `n` rupees? Order doesn't matter: 2 + 1 and 1 + 2 are the same way.

**Input:** one integer `n`.

**Output:** the number of ways.

**Constraints:** 0 ≤ n ≤ 2000. There is exactly 1 way to make 0.

## Hints

1. Let `ways(n, i)` count the ways using only the first `i` denominations. Either use denomination `i` at least once (`ways(n − d[i], i)`) or never (`ways(n, i − 1)`).
2. Memoise `ways` in a 2-D array, or compute it bottom-up: for each coin, for each amount from the coin's value upward, add `table[amount − coin]` to `table[amount]`.

```c starter
#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    /* count the ways */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    const int coins[] = {1, 2, 5, 10, 20, 50};
    int n;
    if (scanf("%d", &n) != 1) return 1;
    static long long table[2001];
    table[0] = 1;
    for (int c = 0; c < 6; c++)
        for (int a = coins[c]; a <= n; a++)
            table[a] += table[a - coins[c]];
    printf("%lld\n", table[n]);
    return 0;
}
```

```test sample
5
---
4
```

```test hidden
0
---
1
```

```test hidden
100
---
4562
```

```test hidden
2000
---
2971443271
```
