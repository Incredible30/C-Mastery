---
title: Expression Evaluator
difficulty: hard
topic: Pointers to Pointers
xp: 50
plan: pro
---
Evaluate arithmetic expressions with `+ - * /`, parentheses, unary minus and the usual precedence (`*` and `/` before `+` and `-`, left to right). Division is integer division that truncates toward zero. Spaces may appear anywhere.

**Input:** `q`, then `q` lines, each an expression.

**Output:** the value of each expression.

**Constraints:** 1 ≤ q ≤ 100, each expression has at most 1000 characters, no division by zero, every intermediate value fits in `long long`.

## Hints

1. Use recursive descent with three functions sharing a cursor passed as `const char **p`, so each one can advance it for the caller: `expr` handles `+`/`-` between terms, `term` handles `*`/`/` between factors, `factor` handles a number, `-factor`, or `( expr )`.
2. Skip spaces at the start of each function and before looking at an operator. Read numbers with `while (isdigit(**p)) v = v * 10 + (*(*p)++ - '0');`

```c starter
#include <ctype.h>
#include <stdio.h>
#include <string.h>

long long expr(const char **p);

int main(void) {
    int q;
    char line[1002];
    scanf("%d ", &q);
    while (q--) {
        fgets(line, sizeof line, stdin);
        line[strcspn(line, "\r\n")] = '\0';
        const char *p = line;
        /* printf("%lld\n", expr(&p)); */
    }
    return 0;
}

long long expr(const char **p) {
    return 0;
}
```

```c solution
#include <ctype.h>
#include <stdio.h>
#include <string.h>

long long expr(const char **p);

static void skip(const char **p) { while (**p == ' ') (*p)++; }

static long long factor(const char **p) {
    skip(p);
    if (**p == '-') { (*p)++; return -factor(p); }
    if (**p == '(') {
        (*p)++;
        long long v = expr(p);
        skip(p);
        if (**p == ')') (*p)++;
        return v;
    }
    long long v = 0;
    while (isdigit((unsigned char)**p)) v = v * 10 + (*(*p)++ - '0');
    return v;
}

static long long term(const char **p) {
    long long v = factor(p);
    for (;;) {
        skip(p);
        if (**p == '*') { (*p)++; v *= factor(p); }
        else if (**p == '/') { (*p)++; v /= factor(p); }
        else return v;
    }
}

long long expr(const char **p) {
    long long v = term(p);
    for (;;) {
        skip(p);
        if (**p == '+') { (*p)++; v += term(p); }
        else if (**p == '-') { (*p)++; v -= term(p); }
        else return v;
    }
}

int main(void) {
    int q;
    char line[1002];
    if (scanf("%d ", &q) != 1) return 1;
    while (q--) {
        if (!fgets(line, sizeof line, stdin)) return 1;
        line[strcspn(line, "\r\n")] = '\0';
        const char *p = line;
        printf("%lld\n", expr(&p));
    }
    return 0;
}
```

```test sample
4
1 + 2 * 3
(1 + 2) * 3
10 - 4 - 3
-7 / 2
---
7
9
3
-3
```

```test hidden
3
((((5))))
2 * (3 + 4) * -(1 - 6)
100 / 7 / 2
---
5
70
7
```

```test hidden
2
1000000 * 1000000 - 1
-(-(-3))
---
999999999999
-3
```
