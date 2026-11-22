---
title: Spreadsheet Evaluator
difficulty: hard
topic: Interpreters
xp: 50
plan: pro
time_limit_ms: 1000
---
Evaluate a small spreadsheet. Each input line defines one cell, like `B2 = A1 * (C1 + 3) - 4`. A cell name is a capital letter followed by a row number from 1 to 99. Formulas use integers, cell names, `+ - * /`, unary minus and parentheses, with the usual precedence. `/` is integer division that truncates toward zero. A cell that was never defined counts as 0.

Errors:

- A cell whose formula depends on itself, directly or through other cells, is `#CYCLE`.
- Dividing by zero gives `#DIV0`.
- A cell that uses a cell with an error gets the **first** error it runs into, reading its formula left to right.

Print every cell in input order as `NAME = value`.

**Input:** cell definitions, one per line (no cell is defined twice).

**Output:** the evaluated cells.

**Constraints:** at most 200 cells, formulas up to 200 characters, all values fit in 64 bits

## Hints

1. Use recursive descent: `expr = term {(+|-) term}`, `term = factor {(*|/) factor}`, `factor = -factor | (expr) | number | cell`.
2. Memoise each cell with a state: 0 = not evaluated, 1 = being evaluated, 2 = done. Reaching a cell in state 1 means you found a cycle.

```c starter
#include <ctype.h>
#include <stdio.h>
#include <string.h>

enum { OK, ERR_CYCLE, ERR_DIV0 };

struct cell { int defined, state, err; long long val; char expr[256]; };

static struct cell grid[26][100];

int main(void) {
    char buf[300];
    /* read definitions, evaluate each cell, print */
    return 0;
}
```

```c solution
#include <ctype.h>
#include <stdio.h>
#include <string.h>

enum { OK, ERR_CYCLE, ERR_DIV0 };

struct cell { int defined, state, err; long long val; char expr[256]; };

static struct cell grid[26][100];

struct parser { const char *p; int err; };

static long long expr(struct parser *ps);
static void eval_cell(int col, int row);

static void skip(struct parser *ps) {
    while (isspace((unsigned char)*ps->p)) ps->p++;
}

static void fail(struct parser *ps, int err) {
    if (ps->err == OK) ps->err = err;
}

static long long factor(struct parser *ps) {
    skip(ps);
    char c = *ps->p;
    if (c == '-') { ps->p++; return -factor(ps); }
    if (c == '(') {
        ps->p++;
        long long v = expr(ps);
        skip(ps);
        if (*ps->p == ')') ps->p++;
        return v;
    }
    if (isdigit((unsigned char)c)) {
        long long v = 0;
        while (isdigit((unsigned char)*ps->p)) v = v * 10 + (*ps->p++ - '0');
        return v;
    }
    if (c >= 'A' && c <= 'Z') {
        int col = c - 'A', row = 0;
        ps->p++;
        while (isdigit((unsigned char)*ps->p)) row = row * 10 + (*ps->p++ - '0');
        if (row < 1 || row > 99) return 0;
        struct cell *cl = &grid[col][row];
        if (!cl->defined) return 0;
        if (cl->state == 1) { fail(ps, ERR_CYCLE); return 0; }
        eval_cell(col, row);
        if (cl->err != OK) fail(ps, cl->err);
        return cl->val;
    }
    return 0;
}

static long long term(struct parser *ps) {
    long long v = factor(ps);
    for (;;) {
        skip(ps);
        char op = *ps->p;
        if (op != '*' && op != '/') return v;
        ps->p++;
        long long r = factor(ps);
        if (op == '*') v *= r;
        else if (r == 0) { fail(ps, ERR_DIV0); v = 0; }
        else v /= r;
    }
}

static long long expr(struct parser *ps) {
    long long v = term(ps);
    for (;;) {
        skip(ps);
        char op = *ps->p;
        if (op != '+' && op != '-') return v;
        ps->p++;
        long long r = term(ps);
        v = op == '+' ? v + r : v - r;
    }
}

static void eval_cell(int col, int row) {
    struct cell *cl = &grid[col][row];
    if (cl->state == 2) return;
    cl->state = 1;
    struct parser ps = { cl->expr, OK };
    long long v = expr(&ps);
    cl->val = ps.err == OK ? v : 0;
    cl->err = ps.err;
    cl->state = 2;
}

int main(void) {
    char buf[300];
    int order[200][2], n = 0;
    while (n < 200 && fgets(buf, sizeof buf, stdin)) {
        char col;
        int row, used = -1;
        if (sscanf(buf, " %c%d = %n", &col, &row, &used) != 2 || used < 0) continue;
        if (col < 'A' || col > 'Z' || row < 1 || row > 99) continue;
        struct cell *cl = &grid[col - 'A'][row];
        buf[strcspn(buf, "\r\n")] = '\0';
        snprintf(cl->expr, sizeof cl->expr, "%s", buf + used);
        cl->defined = 1;
        order[n][0] = col - 'A';
        order[n][1] = row;
        n++;
    }
    for (int i = 0; i < n; i++) {
        int col = order[i][0], row = order[i][1];
        eval_cell(col, row);
        struct cell *cl = &grid[col][row];
        printf("%c%d = ", 'A' + col, row);
        if (cl->err == ERR_CYCLE) puts("#CYCLE");
        else if (cl->err == ERR_DIV0) puts("#DIV0");
        else printf("%lld\n", cl->val);
    }
    return 0;
}
```

```test sample
A1 = 5
A2 = A1 * 2 + 1
B1 = (A1 + A2) / 3
B2 = -B1 - Z9
---
A1 = 5
A2 = 11
B1 = 5
B2 = -5
```

```test hidden
A1 = B1 + 1
B1 = A1 + 1
C1 = 7
D1 = C1 * A1
---
A1 = #CYCLE
B1 = #CYCLE
C1 = 7
D1 = #CYCLE
```

```test hidden
A1 = 10 / (5 - 5)
A2 = A1 + 1
A3 = -7 / 2
A4 = 2 * (3 + 4) * -(1 + 1)
A5 = A5
---
A1 = #DIV0
A2 = #DIV0
A3 = -3
A4 = -28
A5 = #CYCLE
```
