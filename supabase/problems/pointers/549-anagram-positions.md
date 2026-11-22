---
title: Find All Anagram Positions
difficulty: hard
topic: Strings & Pointers
xp: 50
plan: pro
time_limit_ms: 1000
---
Find every position in a text where some rearrangement (anagram) of the pattern starts. In `cbaebabacd` the anagrams of `abc` start at positions 1 (`cba`) and 7 (`bac`).

**Input:** the text and the pattern (lowercase letters).

**Output:** all 1-based starting positions on one line, or `-1`.

**Constraints:** 1 ≤ lengths ≤ 100000. Must finish within 1 second.

## Hints

1. Two windows have the same letters exactly when their letter counts (`int[26]`) are equal.
2. Slide a window of the pattern's length across the text: add the entering letter, remove the leaving one, then compare the 26 counts.

```c starter
#include <stdio.h>
#include <string.h>

static char t[100001], p[100001];

int main(void) {
    scanf("%100000s %100000s", t, p);
    /* sliding window of letter counts */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <string.h>

static char t[100001], p[100001];

int main(void) {
    int need[26] = {0}, have[26] = {0}, found = 0;
    if (scanf("%100000s %100000s", t, p) != 2) return 1;
    int n = (int)strlen(t), m = (int)strlen(p);
    for (int i = 0; i < m; i++) need[p[i] - 'a']++;
    for (int i = 0; i < n; i++) {
        have[t[i] - 'a']++;
        if (i >= m) have[t[i - m] - 'a']--;
        if (i >= m - 1 && memcmp(have, need, sizeof need) == 0) {
            printf(found ? " %d" : "%d", i - m + 2);
            found = 1;
        }
    }
    printf(found ? "\n" : "-1\n");
    return 0;
}
```

```test sample
cbaebabacd abc
---
1 7
```

```test hidden
abab ab
---
1 2 3
```

```test hidden
abc abcd
---
-1
```

```test hidden
aaaa a
---
1 2 3 4
```
