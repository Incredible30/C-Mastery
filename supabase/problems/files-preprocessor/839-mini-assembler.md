---
title: Mini Assembly Interpreter
difficulty: hard
topic: Interpreters
xp: 50
plan: pro
time_limit_ms: 1000
---
Write an interpreter for a tiny assembly language. There are eight registers `a` to `h`, each a 64-bit integer that starts at 0. An operand `v` is either a register name or an integer literal.

| Instruction | Effect |
| --- | --- |
| `set r v` | r = v |
| `add r v` | r += v |
| `sub r v` | r -= v |
| `mul r v` | r *= v |
| `mod r v` | r %= v (v is never 0) |
| `jnz v k` | if v ≠ 0, jump `k` instructions (relative, may be negative) |
| `out v` | print v on its own line |

Execution starts at the first instruction, and every instruction except a taken jump moves on to the next one. The program stops when the instruction pointer leaves the program. If more than 1,000,000 instructions run, stop and print `step limit`.

**Input:** one instruction per line.

**Output:** what the program prints.

**Constraints:** at most 1000 instructions

## Hints

1. Parse everything first into an array of structs (opcode, operand 1, operand 2), where each operand records whether it's a register or a literal.
2. Then run a `while (pc >= 0 && pc < n)` loop with a step counter.

```c starter
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct operand { int is_reg; long long val; };
struct ins { char op[4]; struct operand x, y; };

static struct ins prog[1000];

int main(void) {
    char buf[128];
    int n = 0;
    while (n < 1000 && fgets(buf, sizeof buf, stdin)) {
        /* parse one instruction */
    }
    /* run */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct operand { int is_reg; long long val; };
struct ins { char op[4]; struct operand x, y; };

static struct ins prog[1000];
static long long reg[8];

static struct operand parse_operand(const char *s) {
    struct operand o;
    if (s[0] >= 'a' && s[0] <= 'h' && s[1] == '\0') { o.is_reg = 1; o.val = s[0] - 'a'; }
    else { o.is_reg = 0; o.val = strtoll(s, NULL, 10); }
    return o;
}

static long long value(struct operand o) { return o.is_reg ? reg[o.val] : o.val; }

int main(void) {
    char buf[128], a[32], b[32];
    int n = 0;
    while (n < 1000 && fgets(buf, sizeof buf, stdin)) {
        char op[4];
        int got = sscanf(buf, "%3s %31s %31s", op, a, b);
        if (got < 2) continue;
        strcpy(prog[n].op, op);
        prog[n].x = parse_operand(a);
        prog[n].y = parse_operand(got == 3 ? b : "0");
        n++;
    }
    long steps = 0;
    int pc = 0;
    while (pc >= 0 && pc < n) {
        if (++steps > 1000000) { puts("step limit"); return 0; }
        struct ins *in = &prog[pc];
        long long y = value(in->y);
        long long dummy = 0;
        long long *r = in->x.is_reg ? &reg[in->x.val] : &dummy;
        if (strcmp(in->op, "set") == 0) *r = y;
        else if (strcmp(in->op, "add") == 0) *r += y;
        else if (strcmp(in->op, "sub") == 0) *r -= y;
        else if (strcmp(in->op, "mul") == 0) *r *= y;
        else if (strcmp(in->op, "mod") == 0) *r %= y;
        else if (strcmp(in->op, "out") == 0) printf("%lld\n", value(in->x));
        else if (strcmp(in->op, "jnz") == 0 && value(in->x) != 0) { pc += (int)y; continue; }
        pc++;
    }
    return 0;
}
```

```test sample
set a 5
set b 1
mul b a
sub a 1
jnz a -2
out b
---
120
```

```test hidden
set a 0
set b 1
set c 10
out a
set d a
add d b
set a b
set b d
sub c 1
jnz c -6
---
0
1
1
2
3
5
8
13
21
34
```

```test hidden
set a 1
jnz a 0
---
step limit
```

```test hidden
set a 100
mod a 7
out a
jnz 1 2
out 999
out -5
---
2
-5
```
