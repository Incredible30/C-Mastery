---
title: Your Own strcmp
difficulty: easy
topic: Strings & Pointers
xp: 20
plan: free
---
Write `int my_strcmp(const char *a, const char *b)` that compares two strings character by character and returns a negative number, zero or a positive number, like `strcmp`. `main` prints `-1`, `0` or `1`.

**Input:** two words.

**Output:** `-1` if the first comes before the second in ASCII order, `0` if equal, `1` otherwise.

**Constraints:** 1 ≤ length ≤ 100

## Hints

1. Advance both pointers while `*a && *a == *b`.
2. Then return `(unsigned char)*a - (unsigned char)*b`. A word that is a prefix of the other compares smaller because `'\0'` is 0.

```c starter
#include <stdio.h>

int my_strcmp(const char *a, const char *b) {
    return 0;
}

int main(void) {
    char x[101], y[101];
    scanf("%100s %100s", x, y);
    int r = my_strcmp(x, y);
    printf("%d\n", (r > 0) - (r < 0));
    return 0;
}
```

```c solution
#include <stdio.h>

int my_strcmp(const char *a, const char *b) {
    while (*a && *a == *b) { a++; b++; }
    return (unsigned char)*a - (unsigned char)*b;
}

int main(void) {
    char x[101], y[101];
    if (scanf("%100s %100s", x, y) != 2) return 1;
    int r = my_strcmp(x, y);
    printf("%d\n", (r > 0) - (r < 0));
    return 0;
}
```

```test sample
apple banana
---
-1
```

```test hidden
same same
---
0
```

```test hidden
abcd abc
---
1
```

```test hidden
Zebra apple
---
-1
```
