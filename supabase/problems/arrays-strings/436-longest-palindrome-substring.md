---
title: Longest Palindromic Substring
difficulty: hard
topic: Strings
xp: 50
plan: pro
time_limit_ms: 1000
---
Find the longest contiguous part of a word that reads the same backwards. If there are several of the same length, print the one that starts first.

In `forgeeksskeegfor` the answer is `geeksskeeg`.

**Input:** one word of lowercase letters.

**Output:** the longest palindromic substring.

**Constraints:** 1 ≤ length ≤ 5000. Must finish within 1 second.

## Hints

1. Every palindrome has a centre: a single character (odd length) or the gap between two characters (even length).
2. For each of the 2n − 1 centres, expand outward while the characters on both sides match. Keep the longest; use `>` so the earliest one wins ties.

```c starter
#include <stdio.h>
#include <string.h>

static char s[5001];

int main(void) {
    scanf("%5000s", s);
    /* expand around each centre */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <string.h>

static char s[5001];

int main(void) {
    if (scanf("%5000s", s) != 1) return 1;
    int n = (int)strlen(s), best_start = 0, best_len = 1;
    for (int c = 0; c < 2 * n - 1; c++) {
        int l = c / 2, r = l + c % 2;
        while (l >= 0 && r < n && s[l] == s[r]) { l--; r++; }
        int len = r - l - 1;
        if (len > best_len || (len == best_len && l + 1 < best_start)) { best_len = len; best_start = l + 1; }
    }
    printf("%.*s\n", best_len, s + best_start);
    return 0;
}
```

```test sample
forgeeksskeegfor
---
geeksskeeg
```

```test hidden
a
---
a
```

```test hidden
abcd
---
a
```

```test hidden
cbbd
---
bb
```

```test hidden
abacdfgdcaba
---
aba
```
