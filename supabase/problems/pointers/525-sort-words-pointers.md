---
title: Sort Words by Swapping Pointers
difficulty: medium
topic: Arrays of Pointers
xp: 30
plan: free
---
Read `n` words into a 2D `char` array. Instead of copying whole words around while sorting, keep an array of `char *` pointing at them and sort **the pointers**. Swapping two pointers is much cheaper than swapping two strings.

**Input:** `n`, then `n` words.

**Output:** the words in alphabetical (ASCII) order, one per line.

**Constraints:** 1 ≤ n ≤ 1000, each word has 1 to 50 characters.

## Hints

1. `char store[1000][51]; char *p[1000];` and set `p[i] = store[i]`.
2. Sort `p` with any algorithm, comparing with `strcmp(p[i], p[j])` and swapping `char *` values.

```c starter
#include <stdio.h>
#include <string.h>

char store[1000][51];
char *p[1000];

int main(void) {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) { scanf("%50s", store[i]); p[i] = store[i]; }
    /* sort the pointers */
    for (int i = 0; i < n; i++) printf("%s\n", p[i]);
    return 0;
}
```

```c solution
#include <stdio.h>
#include <string.h>

char store[1000][51];
char *p[1000];

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) { if (scanf("%50s", store[i]) != 1) return 1; p[i] = store[i]; }
    for (int i = 1; i < n; i++) {
        char *key = p[i];
        int j = i - 1;
        while (j >= 0 && strcmp(p[j], key) > 0) { p[j + 1] = p[j]; j--; }
        p[j + 1] = key;
    }
    for (int i = 0; i < n; i++) printf("%s\n", p[i]);
    return 0;
}
```

```test sample
5
pear apple orange banana kiwi
---
apple
banana
kiwi
orange
pear
```

```test hidden
1
solo
---
solo
```

```test hidden
4
b B a A
---
A
B
a
b
```
