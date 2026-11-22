---
title: Macro Expansion Simulator
difficulty: hard
topic: Preprocessor
xp: 50
plan: pro
time_limit_ms: 1000
---
Simulate how the preprocessor expands **object-like** macros. The input mixes directives and code lines:

- `#define NAME body` defines (or redefines) `NAME`. The body is the rest of the line without surrounding spaces, and may be empty.
- `#undef NAME` removes it.
- Every other line is code. Print it with all macros expanded.

Expansion rules: an identifier (`[A-Za-z_][A-Za-z0-9_]*`) that names a macro is replaced by its body, and the body is expanded again. While a macro is being expanded, its own name is **not** expanded again, which stops infinite recursion like `#define A B`, `#define B A`. Nothing is expanded inside string literals, and number tokens like `0x1F` or `2e10` are copied as they are.

**Input:** directives and code lines.

**Output:** the expanded code lines.

**Constraints:** at most 100 macros, names up to 60 characters, lines up to 500 characters

## Hints

1. Write a recursive `expand(const char *text)` that prints as it goes. Keep an `active[]` flag per macro: set it before expanding a body and clear it afterwards.
2. Parse a directive with `sscanf(line, " #define %63s%n", name, &used)` and trim the rest as the body.

```c starter
#include <ctype.h>
#include <stdio.h>
#include <string.h>

struct macro { char name[64]; char body[512]; int defined; int active; };

static struct macro macros[100];
static int nmacros;

static void expand(const char *s) {
    /* print s with macros expanded */
}

int main(void) {
    char line[512];
    while (fgets(line, sizeof line, stdin)) {
        line[strcspn(line, "\r\n")] = '\0';
        /* handle #define / #undef, or expand the line */
    }
    return 0;
}
```

```c solution
#include <ctype.h>
#include <stdio.h>
#include <string.h>

struct macro { char name[64]; char body[512]; int defined; int active; };

static struct macro macros[100];
static int nmacros;

static int find(const char *name) {
    for (int i = 0; i < nmacros; i++)
        if (macros[i].defined && strcmp(macros[i].name, name) == 0) return i;
    return -1;
}

static int is_ident(int c) { return isalnum(c) || c == '_'; }

static void expand(const char *s) {
    while (*s) {
        unsigned char c = (unsigned char)*s;
        if (isalpha(c) || c == '_') {
            char id[512];
            size_t n = 0;
            while (is_ident((unsigned char)*s)) id[n++] = *s++;
            id[n] = '\0';
            int m = find(id);
            if (m >= 0 && !macros[m].active) {
                macros[m].active = 1;
                expand(macros[m].body);
                macros[m].active = 0;
            } else {
                fputs(id, stdout);
            }
        } else if (isdigit(c)) {
            while (is_ident((unsigned char)*s) || *s == '.') putchar(*s++);
        } else if (c == '"') {
            putchar(*s++);
            while (*s && *s != '"') {
                if (*s == '\\' && s[1]) putchar(*s++);
                putchar(*s++);
            }
            if (*s) putchar(*s++);
        } else {
            putchar(*s++);
        }
    }
}

static char *trim(char *s) {
    while (isspace((unsigned char)*s)) s++;
    size_t n = strlen(s);
    while (n > 0 && isspace((unsigned char)s[n - 1])) s[--n] = '\0';
    return s;
}

int main(void) {
    char line[512], name[64];
    while (fgets(line, sizeof line, stdin)) {
        line[strcspn(line, "\r\n")] = '\0';
        int used = -1;
        if (sscanf(line, " #define %63s%n", name, &used) == 1 && used >= 0) {
            int m = find(name);
            if (m < 0) {
                for (m = 0; m < nmacros && macros[m].defined; m++) {}
                if (m == nmacros) {
                    if (nmacros == 100) continue;
                    nmacros++;
                }
                strcpy(macros[m].name, name);
                macros[m].defined = 1;
            }
            snprintf(macros[m].body, sizeof macros[m].body, "%s", trim(line + used));
        } else if (sscanf(line, " #undef %63s", name) == 1) {
            int m = find(name);
            if (m >= 0) macros[m].defined = 0;
        } else {
            expand(line);
            putchar('\n');
        }
    }
    return 0;
}
```

```test sample
#define N 10
#define SIZE (N * N)
int grid[SIZE];
printf("N = %d\n", N);
#undef N
int other[SIZE];
---
int grid[(10 * 10)];
printf("N = %d\n", 10);
int other[(N * N)];
```

```test hidden
#define LOOP LOOP + 1
#define A B
#define B A
x = LOOP;
A B
---
x = LOOP + 1;
A B
```

```test hidden
#define EMPTY
#define X1 0x1F
#define PI 3.14159
a EMPTY b
v = 0x1F + X1 + 2e10;
NX1 X1N X1
---
a  b
v = 0x1F + 0x1F + 2e10;
NX1 X1N 0x1F
```
