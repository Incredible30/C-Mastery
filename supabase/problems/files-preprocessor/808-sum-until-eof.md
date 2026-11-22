---
title: Sum Every Number in the Stream
difficulty: easy
topic: Streams
xp: 15
plan: free
---
Read integers with `fscanf(stdin, ...)` until it stops returning 1, and print how many were read and their sum. `fscanf` returns the number of items it converted, or `EOF` at the end of input, which is how loops over files know when to stop.

**Input:** whitespace-separated integers, spread over any number of lines.

**Output:** the count and the sum.

**Constraints:** 1 ≤ count ≤ 10^6, |values| ≤ 10^9

## Hints

1. `while (fscanf(stdin, "%lld", &x) == 1) { ... }`
2. Use `long long` for the sum.

```c starter
#include <stdio.h>

int main(void) {
    long long x, sum = 0;
    long count = 0;
    /* read until fscanf stops returning 1 */
    printf("%ld %lld\n", count, sum);
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    long long x, sum = 0;
    long count = 0;
    while (fscanf(stdin, "%lld", &x) == 1) { count++; sum += x; }
    printf("%ld %lld\n", count, sum);
    return 0;
}
```

```test sample
1 2 3
4
5 6
---
6 21
```

```test hidden
-7
---
1 -7
```

```test hidden
1000000000 1000000000
1000000000 1000000000
---
4 4000000000
```
