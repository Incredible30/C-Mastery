---
title: Happy Number
difficulty: hard
topic: Loops
xp: 40
plan: free
---
Replace a number by the sum of the squares of its digits, and repeat. If this eventually reaches 1, the number is **happy**. Otherwise it loops forever in a cycle that never includes 1.

19 is happy: 1² + 9² = 82, 8² + 2² = 68, 6² + 8² = 100, 1² + 0² + 0² = 1.

Print `HAPPY` or `UNHAPPY`.

**Input:** one integer `n`.

**Output:** `HAPPY` or `UNHAPPY`.

**Constraints:** 1 ≤ n ≤ 10^18

## Hints

1. Detect the cycle with two variables: `slow` moves one step at a time and `fast` two steps. If there's a cycle they will meet.
2. Stop when `fast` reaches 1 (happy) or when `slow == fast` without reaching 1 (unhappy). Unhappy numbers always fall into the cycle containing 4.

```c starter
#include <stdio.h>

int main(void) {
    long long n;
    scanf("%lld", &n);
    /* print HAPPY or UNHAPPY */
    return 0;
}
```

```c solution
#include <stdio.h>

static long long next(long long n) {
    long long s = 0;
    for (; n > 0; n /= 10) s += (n % 10) * (n % 10);
    return s;
}

int main(void) {
    long long n;
    if (scanf("%lld", &n) != 1) return 1;
    long long slow = n, fast = n;
    do {
        slow = next(slow);
        fast = next(next(fast));
    } while (slow != fast && fast != 1);
    printf("%s\n", fast == 1 ? "HAPPY" : "UNHAPPY");
    return 0;
}
```

```test sample
19
---
HAPPY
```

```test sample
4
---
UNHAPPY
```

```test hidden
1
---
HAPPY
```

```test hidden
7
---
HAPPY
```

```test hidden
999999999999999999
---
UNHAPPY
```

```test hidden
1000000000000000000
---
HAPPY
```
