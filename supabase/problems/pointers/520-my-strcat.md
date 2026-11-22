---
title: Your Own strcat
difficulty: medium
topic: Strings & Pointers
xp: 25
plan: free
---
Write `char *my_strcat(char *dst, const char *src)` that appends `src` to the end of `dst` and returns `dst`, like `strcat`. `main` joins `k` words into one buffer, then prints the result and its length.

**Input:** `k`, then `k` words.

**Output:** the joined string, then its length.

**Constraints:** 1 ≤ k ≤ 100, each word has 1 to 50 characters.

## Hints

1. First move a pointer to the `'\0'` at the end of `dst`.
2. Then copy `src` from there, including its `'\0'`. `main` must start with an empty buffer: `buf[0] = '\0';`

```c starter
#include <stdio.h>
#include <string.h>

char *my_strcat(char *dst, const char *src) {
    return dst;
}

int main(void) {
    int k;
    char buf[5101], w[51];
    buf[0] = '\0';
    scanf("%d", &k);
    for (int i = 0; i < k; i++) { scanf("%50s", w); my_strcat(buf, w); }
    printf("%s\n%d\n", buf, (int)strlen(buf));
    return 0;
}
```

```c solution
#include <stdio.h>
#include <string.h>

char *my_strcat(char *dst, const char *src) {
    char *d = dst;
    while (*d) d++;
    while ((*d++ = *src++)) ;
    return dst;
}

int main(void) {
    int k;
    char buf[5101], w[51];
    buf[0] = '\0';
    if (scanf("%d", &k) != 1) return 1;
    for (int i = 0; i < k; i++) { if (scanf("%50s", w) != 1) return 1; my_strcat(buf, w); }
    printf("%s\n%d\n", buf, (int)strlen(buf));
    return 0;
}
```

```test sample
3
pointer to char
---
pointertochar
13
```

```test hidden
1
alone
---
alone
5
```

```test hidden
5
a bb ccc dddd eeeee
---
abbcccddddeeeee
15
```
