---
title: Your Own atoi With Clamping
difficulty: hard
topic: Strings & Pointers
xp: 45
plan: pro
---
Convert text to an `int` the way a careful `atoi` would:

- An optional `+` or `-` sign, then digits. Stop at the first character that isn't a digit.
- No digits at all means 0.
- If the value is above 2147483647 or below −2147483648, clamp it to that limit.

**Input:** `q`, then `q` tokens (no spaces inside a token).

**Output:** the converted value for each token.

**Constraints:** 1 ≤ q ≤ 100, tokens have 1 to 100 characters.

## Hints

1. Walk a pointer: read the sign, then `while (*p >= '0' && *p <= '9') value = value * 10 + (*p++ - '0');`
2. Use `long long` and stop early once the value passes 2147483648, or a long digit string will overflow even `long long`.

```c starter
#include <stdio.h>

int my_atoi(const char *s) {
    return 0;
}

int main(void) {
    int q;
    char t[101];
    scanf("%d", &q);
    while (q--) { scanf("%100s", t); printf("%d\n", my_atoi(t)); }
    return 0;
}
```

```c solution
#include <stdio.h>
#include <limits.h>

int my_atoi(const char *s) {
    const char *p = s;
    int neg = 0;
    if (*p == '+' || *p == '-') neg = (*p++ == '-');
    long long v = 0;
    while (*p >= '0' && *p <= '9') {
        v = v * 10 + (*p++ - '0');
        if (v > (long long)INT_MAX + 1) break;
    }
    if (neg) v = -v;
    if (v > INT_MAX) return INT_MAX;
    if (v < INT_MIN) return INT_MIN;
    return (int)v;
}

int main(void) {
    int q;
    char t[101];
    if (scanf("%d", &q) != 1) return 1;
    while (q--) { if (scanf("%100s", t) != 1) return 1; printf("%d\n", my_atoi(t)); }
    return 0;
}
```

```test sample
5
42
-17abc
+0012
words
-
---
42
-17
12
0
0
```

```test hidden
4
2147483647
2147483648
-2147483648
-99999999999999999999999
---
2147483647
2147483647
-2147483648
-2147483648
```

```test hidden
3
+-5
007
12.9
---
0
7
12
```
