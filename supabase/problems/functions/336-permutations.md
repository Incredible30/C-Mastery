---
title: All Permutations
difficulty: hard
topic: Recursion
xp: 45
plan: free
---
Print every arrangement (permutation) of the letters of a word whose letters are all different, in alphabetical order, one per line.

**Input:** one word of distinct lowercase letters.

**Output:** all permutations in alphabetical order.

**Constraints:** 1 ≤ length ≤ 7

## Hints

1. Sort the letters first. Then build each arrangement position by position, trying the unused letters in order.
2. Keep a `used[]` array. Recursive step: for each unused letter, mark it, place it at the current position, recurse to the next position, then unmark it (backtracking).

```c starter
#include <stdio.h>
#include <string.h>

int main(void) {
    char s[8];
    scanf("%7s", s);
    /* print all permutations in alphabetical order */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <string.h>

static char s[8], cur[8];
static int used[8], n;

static void build(int pos) {
    if (pos == n) {
        cur[n] = '\0';
        printf("%s\n", cur);
        return;
    }
    for (int i = 0; i < n; i++) {
        if (used[i]) continue;
        used[i] = 1;
        cur[pos] = s[i];
        build(pos + 1);
        used[i] = 0;
    }
}

int main(void) {
    if (scanf("%7s", s) != 1) return 1;
    n = (int)strlen(s);
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++)
            if (s[j] < s[i]) { char t = s[i]; s[i] = s[j]; s[j] = t; }
    build(0);
    return 0;
}
```

```test sample
cab
---
abc
acb
bac
bca
cab
cba
```

```test hidden
z
---
z
```

```test hidden
dcba
---
abcd
abdc
acbd
acdb
adbc
adcb
bacd
badc
bcad
bcda
bdac
bdca
cabd
cadb
cbad
cbda
cdab
cdba
dabc
dacb
dbac
dbca
dcab
dcba
```
