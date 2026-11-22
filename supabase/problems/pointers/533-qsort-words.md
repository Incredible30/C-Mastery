---
title: Sort Words by Length
difficulty: medium
topic: Function Pointers
xp: 30
plan: free
---
Sort words by length (shortest first); words of equal length go in alphabetical order. Use `qsort` on a 2D `char` array with your own comparator.

**Input:** `n`, then `n` words.

**Output:** the sorted words, one per line.

**Constraints:** 1 ≤ n ≤ 1000, each word has 1 to 30 characters.

## Hints

1. Call `qsort(words, n, sizeof words[0], cmp)`. Each element is a `char[31]`, so the comparator receives pointers to the start of each row: `const char *x = a;`
2. Compare `strlen` first; if equal, return `strcmp(x, y)`.

```c starter
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char words[1000][31];

int cmp(const void *a, const void *b) {
    return 0;
}

int main(void) {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%30s", words[i]);
    qsort(words, n, sizeof words[0], cmp);
    for (int i = 0; i < n; i++) printf("%s\n", words[i]);
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char words[1000][31];

int cmp(const void *a, const void *b) {
    const char *x = a, *y = b;
    size_t lx = strlen(x), ly = strlen(y);
    if (lx != ly) return lx < ly ? -1 : 1;
    return strcmp(x, y);
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) if (scanf("%30s", words[i]) != 1) return 1;
    qsort(words, (size_t)n, sizeof words[0], cmp);
    for (int i = 0; i < n; i++) printf("%s\n", words[i]);
    return 0;
}
```

```test sample
6
banana fig apple kiwi date cherry
---
fig
date
kiwi
apple
banana
cherry
```

```test hidden
1
one
---
one
```

```test hidden
4
ccc bb a bb
---
a
bb
bb
ccc
```
