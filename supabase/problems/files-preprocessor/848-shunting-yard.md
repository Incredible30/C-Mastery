---
title: Shunting-Yard Calculator
difficulty: hard
topic: Algorithms
xp: 50
plan: pro
time_limit_ms: 1000
---
Each line is an infix expression with non-negative integers, `+ - * / ^` and parentheses. Spaces are optional. Use Dijkstra's **shunting-yard** algorithm to convert it to postfix (reverse Polish notation), then evaluate the postfix with a stack.

- Precedence: `^` (highest, **right**-associative), then `*` and `/`, then `+` and `-` (left-associative).
- `/` is integer division that truncates toward zero, and `^` is integer power (exponents are never negative).

Print two lines per expression: `postfix: <tokens separated by spaces>` and `value: <result>`. If the expression divides by zero, print `value: error`.

**Input:** expressions, one per line (no unary minus).

**Output:** two lines per expression.

**Constraints:** expressions up to 200 characters, all intermediate values fit in 64 bits

## Hints

1. On an operator `o`, pop operators from the stack while the top isn't `(` and either has higher precedence, or equal precedence with `o` left-associative. Then push `o`.
2. On `)`, pop until `(`. At the end, pop everything that remains.

```c starter
#include <ctype.h>
#include <stdio.h>
#include <string.h>

int main(void) {
    char line[256];
    while (fgets(line, sizeof line, stdin)) {
        /* tokenize, shunting-yard to postfix, evaluate */
    }
    return 0;
}
```

```c solution
#include <ctype.h>
#include <stdio.h>
#include <string.h>

struct token { int is_num; long long num; char op; };

static int prec(char op) {
    if (op == '^') return 3;
    if (op == '*' || op == '/') return 2;
    return 1;
}

int main(void) {
    char line[256];
    while (fgets(line, sizeof line, stdin)) {
        struct token out[256];
        char ops[256];
        int nout = 0, nops = 0;
        const char *p = line;
        while (*p) {
            if (isspace((unsigned char)*p)) { p++; continue; }
            if (isdigit((unsigned char)*p)) {
                long long v = 0;
                while (isdigit((unsigned char)*p)) v = v * 10 + (*p++ - '0');
                out[nout].is_num = 1;
                out[nout++].num = v;
            } else if (*p == '(') {
                ops[nops++] = *p++;
            } else if (*p == ')') {
                while (nops > 0 && ops[nops - 1] != '(') { out[nout].is_num = 0; out[nout++].op = ops[--nops]; }
                if (nops > 0) nops--;
                p++;
            } else {
                char o = *p++;
                while (nops > 0 && ops[nops - 1] != '(' &&
                       (prec(ops[nops - 1]) > prec(o) || (prec(ops[nops - 1]) == prec(o) && o != '^'))) {
                    out[nout].is_num = 0;
                    out[nout++].op = ops[--nops];
                }
                ops[nops++] = o;
            }
        }
        while (nops > 0) { out[nout].is_num = 0; out[nout++].op = ops[--nops]; }
        if (nout == 0) continue;

        printf("postfix:");
        for (int i = 0; i < nout; i++) {
            if (out[i].is_num) printf(" %lld", out[i].num);
            else printf(" %c", out[i].op);
        }
        printf("\n");

        long long st[256];
        int top = 0, error = 0;
        for (int i = 0; i < nout && !error; i++) {
            if (out[i].is_num) { st[top++] = out[i].num; continue; }
            if (top < 2) { error = 1; break; }
            long long b = st[--top], a = st[--top], r = 0;
            switch (out[i].op) {
                case '+': r = a + b; break;
                case '-': r = a - b; break;
                case '*': r = a * b; break;
                case '/': if (b == 0) error = 1; else r = a / b; break;
                case '^': r = 1; for (long long k = 0; k < b; k++) r *= a; break;
                default: error = 1;
            }
            st[top++] = r;
        }
        if (error || top != 1) puts("value: error");
        else printf("value: %lld\n", st[0]);
    }
    return 0;
}
```

```test sample
3 + 4 * 2 / ( 1 - 5 ) ^ 2 ^ 3
2*(3+4)
---
postfix: 3 4 2 * 1 5 - 2 3 ^ ^ / +
value: 3
postfix: 2 3 4 + *
value: 14
```

```test hidden
10 - 4 - 3
2 ^ 3 ^ 2
100 / 7 / 2
---
postfix: 10 4 - 3 -
value: 3
postfix: 2 3 2 ^ ^
value: 512
postfix: 100 7 / 2 /
value: 7
```

```test hidden
8 / (3 - 3)
(((42)))
7 - 10 * 2
---
postfix: 8 3 3 - /
value: error
postfix: 42
value: 42
postfix: 7 10 2 * -
value: -13
```
