---
title: FizzBuzz
difficulty: easy
topic: Loops
module: control-flow
xp: 15
plan: free
---
Print the numbers from 1 to `n`, one per line, with three changes:

- for multiples of 3, print `Fizz` instead of the number
- for multiples of 5, print `Buzz`
- for multiples of both 3 and 5, print `FizzBuzz`

**Input:** one integer `n`.

**Output:** `n` lines as described.

**Constraints:** 1 ≤ n ≤ 1000

## Hints

1. Use a `for` loop from 1 to `n` and the `%` operator to test divisibility.
2. Check "multiple of both" first. If you check 3 first, 15 prints `Fizz` instead of `FizzBuzz`.

```c starter
#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    for (int i = 1; i <= n; i++) {
        /* print Fizz, Buzz, FizzBuzz or the number */
    }
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 1; i <= n; i++) {
        if (i % 15 == 0) printf("FizzBuzz\n");
        else if (i % 3 == 0) printf("Fizz\n");
        else if (i % 5 == 0) printf("Buzz\n");
        else printf("%d\n", i);
    }
    return 0;
}
```

```test sample
5
---
1
2
Fizz
4
Buzz
```

```test hidden
1
---
1
```

```test hidden
15
---
1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
```
