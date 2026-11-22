---
title: Longest Common Prefix
difficulty: hard
topic: Strings
xp: 40
plan: pro
---
Find the longest string that every one of `n` words starts with. If there is none, print `-`.

`flower`, `flow`, `flight` share the prefix `fl`.

**Input:** `n`, then `n` words.

**Output:** the longest common prefix, or `-`.

**Constraints:** 1 ≤ n ≤ 1000, each word has 1 to 200 characters.

## Hints

1. Start with the first word as the prefix. For each next word, shorten the prefix until the word starts with it.
2. Shortening means cutting at the first position where the characters differ, or where either string ends.

```c starter
#include <stdio.h>

int main(void) {
    int n;
    char prefix[201], w[201];
    scanf("%d %200s", &n, prefix);
    /* shorten prefix against each word */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    int n;
    char prefix[201], w[201];
    if (scanf("%d %200s", &n, prefix) != 2) return 1;
    for (int k = 1; k < n; k++) {
        if (scanf("%200s", w) != 1) return 1;
        int i = 0;
        while (prefix[i] && w[i] && prefix[i] == w[i]) i++;
        prefix[i] = '\0';
    }
    printf("%s\n", prefix[0] ? prefix : "-");
    return 0;
}
```

```test sample
3
flower
flow
flight
---
fl
```

```test hidden
2
dog
racecar
---
-
```

```test hidden
1
alone
---
alone
```

```test hidden
4
interview
internet
interval
internal
---
inter
```
