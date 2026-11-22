---
title: Diff with LCS
difficulty: hard
topic: Algorithms
xp: 50
plan: pro
time_limit_ms: 1000
---
Show the changes between two versions of a text, like `diff`. The versions are separated by a line `====`. Use the **longest common subsequence** of lines, and print every line with a prefix:

- `  ` (two spaces) for a line in both versions
- `- ` for a line only in the old version
- `+ ` for a line only in the new version

To make the answer unique, compute `dp[i][j]` = LCS length of old lines `i..` and new lines `j..`, then walk from the start. If the lines are equal, print a common line. Otherwise, if `dp[i+1][j] >= dp[i][j+1]`, print a deletion. Otherwise, print an addition.

**Input:** old text, `====`, new text.

**Output:** the diff.

**Constraints:** each version has at most 200 lines of at most 100 characters

## Hints

1. Fill `dp` from the bottom-right corner. `dp[na][*]` and `dp[*][nb]` are 0.
2. When one side runs out, print the rest of the other side as deletions or additions.

```c starter
#include <stdio.h>
#include <string.h>

#define MAXL 200

static char a[MAXL][102], b[MAXL][102];
static int dp[MAXL + 1][MAXL + 1];

int main(void) {
    int na = 0, nb = 0;
    /* read, fill dp, walk */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <string.h>

#define MAXL 200

static char a[MAXL][102], b[MAXL][102];
static int dp[MAXL + 1][MAXL + 1];

int main(void) {
    char buf[128];
    int na = 0, nb = 0, second = 0;
    while (fgets(buf, sizeof buf, stdin)) {
        buf[strcspn(buf, "\r\n")] = '\0';
        if (!second && strcmp(buf, "====") == 0) { second = 1; continue; }
        if (!second) { if (na < MAXL) strcpy(a[na++], buf); }
        else if (nb < MAXL) strcpy(b[nb++], buf);
    }
    for (int i = na - 1; i >= 0; i--)
        for (int j = nb - 1; j >= 0; j--)
            dp[i][j] = strcmp(a[i], b[j]) == 0 ? dp[i + 1][j + 1] + 1
                     : dp[i + 1][j] > dp[i][j + 1] ? dp[i + 1][j] : dp[i][j + 1];
    int i = 0, j = 0;
    while (i < na && j < nb) {
        if (strcmp(a[i], b[j]) == 0) { printf("  %s\n", a[i]); i++; j++; }
        else if (dp[i + 1][j] >= dp[i][j + 1]) printf("- %s\n", a[i++]);
        else printf("+ %s\n", b[j++]);
    }
    while (i < na) printf("- %s\n", a[i++]);
    while (j < nb) printf("+ %s\n", b[j++]);
    return 0;
}
```

```test sample
apple
banana
cherry
date
====
apple
cherry
dates
elderberry
---
  apple
- banana
  cherry
- date
+ dates
+ elderberry
```

```test hidden
a
b
c
====
c
b
a
---
- a
- b
  c
+ b
+ a
```

```test hidden
same
====
same
---
  same
```

```test hidden
====
new one
new two
---
+ new one
+ new two
```
