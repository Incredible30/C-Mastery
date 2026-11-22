---
title: Your Own Generic Sort
difficulty: hard
topic: Function Pointers
xp: 50
plan: pro
---
Write a sort that works on any type, just like `qsort`:

`void my_sort(void *base, size_t n, size_t size, int (*cmp)(const void *, const void *))`

Use it twice: sort integers in **descending** order, then sort words alphabetically.

**Input:** `n`, then `n` integers; `m`, then `m` words.

**Output:** line 1: the integers, largest first; then the words, one per line.

**Constraints:** 1 ≤ n, m ≤ 1000, words have 1 to 20 characters.

## Hints

1. Element `i` starts at `(char *)base + i * size`. Write a byte-swapping helper for two elements.
2. Insertion sort works well: for each `i`, while `j > 0` and `cmp(elem(j-1), elem(j)) > 0`, swap them and decrease `j`.

```c starter
#include <stdio.h>
#include <string.h>
#include <stddef.h>

int nums[1000];
char words[1000][21];

void my_sort(void *base, size_t n, size_t size, int (*cmp)(const void *, const void *)) {
}

int main(void) {
    int n, m;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%d", &nums[i]);
    scanf("%d", &m);
    for (int i = 0; i < m; i++) scanf("%20s", words[i]);
    /* write two comparators and call my_sort twice */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <string.h>
#include <stddef.h>

int nums[1000];
char words[1000][21];

static void swap_bytes(unsigned char *a, unsigned char *b, size_t size) {
    while (size--) { unsigned char t = *a; *a++ = *b; *b++ = t; }
}

void my_sort(void *base, size_t n, size_t size, int (*cmp)(const void *, const void *)) {
    unsigned char *b = base;
    for (size_t i = 1; i < n; i++)
        for (size_t j = i; j > 0 && cmp(b + (j - 1) * size, b + j * size) > 0; j--)
            swap_bytes(b + (j - 1) * size, b + j * size, size);
}

static int int_desc(const void *a, const void *b) {
    int x = *(const int *)a, y = *(const int *)b;
    return (y > x) - (y < x);
}

static int word_asc(const void *a, const void *b) {
    return strcmp((const char *)a, (const char *)b);
}

int main(void) {
    int n, m;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) if (scanf("%d", &nums[i]) != 1) return 1;
    if (scanf("%d", &m) != 1) return 1;
    for (int i = 0; i < m; i++) if (scanf("%20s", words[i]) != 1) return 1;
    my_sort(nums, (size_t)n, sizeof nums[0], int_desc);
    my_sort(words, (size_t)m, sizeof words[0], word_asc);
    for (int i = 0; i < n; i++) printf(i ? " %d" : "%d", nums[i]);
    printf("\n");
    for (int i = 0; i < m; i++) printf("%s\n", words[i]);
    return 0;
}
```

```test sample
5
3 1 4 1 5
3
pear apple fig
---
5 4 3 1 1
apple
fig
pear
```

```test hidden
1
-7
1
only
---
-7
only
```

```test hidden
4
2147483647 -2147483648 0 -1
4
zz za az aa
---
2147483647 0 -1 -2147483648
aa
az
za
zz
```
