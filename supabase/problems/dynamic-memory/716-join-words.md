---
title: Join Words With Commas
difficulty: easy
topic: malloc & free
xp: 20
plan: free
---
Read `n` words, each into its own `malloc`'d buffer of exactly the right size (keep the pointers in a `malloc`'d `char **` array). Then build one new string joining them with `", "` and print it. Free everything at the end: every buffer, then the array.

**Input:** `n`, then `n` words.

**Output:** the words joined by `", "`.

**Constraints:** 1 ≤ n ≤ 1000, each word has 1 to 100 characters.

## Hints

1. Read into a temporary `char buf[101]`, then store a copy: `words[i] = malloc(strlen(buf) + 1); strcpy(words[i], buf);`
2. The joined length is the sum of word lengths + `2 * (n - 1)` + 1.

```c starter
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {
    int n;
    char buf[101];
    scanf("%d", &n);
    char **words = malloc(n * sizeof *words);
    /* read words, join, print, free everything */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {
    int n;
    char buf[101];
    if (scanf("%d", &n) != 1) return 1;
    char **words = malloc((size_t)n * sizeof *words);
    if (!words) return 1;
    size_t total = 1;
    for (int i = 0; i < n; i++) {
        if (scanf("%100s", buf) != 1) return 1;
        words[i] = malloc(strlen(buf) + 1);
        if (!words[i]) return 1;
        strcpy(words[i], buf);
        total += strlen(buf) + (i ? 2 : 0);
    }
    char *joined = malloc(total), *p = joined;
    if (!joined) return 1;
    for (int i = 0; i < n; i++) {
        if (i) { memcpy(p, ", ", 2); p += 2; }
        size_t len = strlen(words[i]);
        memcpy(p, words[i], len);
        p += len;
    }
    *p = '\0';
    printf("%s\n", joined);
    free(joined);
    for (int i = 0; i < n; i++) free(words[i]);
    free(words);
    return 0;
}
```

```test sample
3
red green blue
---
red, green, blue
```

```test hidden
1
alone
---
alone
```

```test hidden
4
a b c d
---
a, b, c, d
```
