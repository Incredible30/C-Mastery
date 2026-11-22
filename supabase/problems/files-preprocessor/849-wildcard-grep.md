---
title: Wildcard Grep
difficulty: hard
topic: Pattern Matching
xp: 50
plan: pro
time_limit_ms: 1000
---
The first line is a glob pattern. Print every following line that the pattern matches **as a whole**, as `n: line` (lines are numbered from 1 after the pattern line), and finish with `matches: k`. The pattern syntax is:

- `*` matches any sequence of characters, including an empty one
- `?` matches exactly one character
- `[abc]` matches one of the listed characters, `[a-z]` a range, and `[!abc]` any character **not** listed
- any other character matches itself

**Input:** the pattern, then the lines to test.

**Output:** the matching lines and the count.

**Constraints:** patterns and lines up to 200 characters, at most 10^4 lines

## Hints

1. A greedy matcher works well. Remember where the last `*` was and how far it had consumed. On a mismatch, go back and let that `*` swallow one more character.
2. Write a helper that tests one pattern element (`?`, a class or a literal) against one character and tells you where the next element starts.

```c starter
#include <stdio.h>
#include <string.h>

static int glob(const char *p, const char *s) {
    /* return 1 if pattern p matches all of s */
    return 0;
}

int main(void) {
    char pat[256], line[256];
    if (!fgets(pat, sizeof pat, stdin)) return 1;
    pat[strcspn(pat, "\r\n")] = '\0';
    /* test each line */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <string.h>

/* Does the element at p match c? *next is set to the element after it. */
static int element(const char *p, char c, const char **next) {
    if (*p == '?') { *next = p + 1; return 1; }
    if (*p == '[') {
        const char *q = p + 1;
        int neg = 0, matched = 0, first = 1;
        if (*q == '!') { neg = 1; q++; }
        while (*q && (*q != ']' || first)) {
            if (q[1] == '-' && q[2] && q[2] != ']') {
                if (c >= q[0] && c <= q[2]) matched = 1;
                q += 3;
            } else {
                if (c == *q) matched = 1;
                q++;
            }
            first = 0;
        }
        if (*q != ']') { *next = p + 1; return c == '['; }
        *next = q + 1;
        return matched != neg;
    }
    *next = p + 1;
    return *p == c;
}

static int glob(const char *p, const char *s) {
    const char *star_p = NULL, *star_s = NULL;
    while (*s) {
        if (*p == '*') {
            while (*p == '*') p++;
            star_p = p;
            star_s = s;
            continue;
        }
        const char *next;
        if (*p && element(p, *s, &next)) { p = next; s++; continue; }
        if (star_p) { p = star_p; s = ++star_s; continue; }
        return 0;
    }
    while (*p == '*') p++;
    return *p == '\0';
}

int main(void) {
    char pat[256], line[256];
    if (!fgets(pat, sizeof pat, stdin)) return 1;
    pat[strcspn(pat, "\r\n")] = '\0';
    int n = 0, matches = 0;
    while (fgets(line, sizeof line, stdin)) {
        line[strcspn(line, "\r\n")] = '\0';
        n++;
        if (glob(pat, line)) { printf("%d: %s\n", n, line); matches++; }
    }
    printf("matches: %d\n", matches);
    return 0;
}
```

```test sample
*.[ch]
main.c
util.h
notes.txt
lib.cpp
.c
---
1: main.c
2: util.h
5: .c
matches: 3
```

```test hidden
data_??.csv
data_01.csv
data_1.csv
data_AB.csv
data_123.csv
---
1: data_01.csv
3: data_AB.csv
matches: 2
```

```test hidden
[!a-m]*e*
apple
orange
zebra
xyz
nectarine
---
2: orange
3: zebra
5: nectarine
matches: 3
```

```test hidden
a*b*c
abc
aXbYc
acb
abcbc
aaaa
---
1: abc
2: aXbYc
4: abcbc
matches: 3
```
