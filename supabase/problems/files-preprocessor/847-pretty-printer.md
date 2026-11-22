---
title: Code Pretty Printer
difficulty: hard
topic: Text Formatting
xp: 50
plan: pro
time_limit_ms: 1000
---
Re-indent messy C code. Remove the leading and trailing spaces from every line, then indent it by 4 spaces for each level of `{` nesting:

- A line that starts with `}` is printed one level less deep (so `} else {` lines up with its `if`).
- After a line is printed, the depth changes by the number of `{` minus the number of `}` in it.
- Braces inside string literals, character literals and `//` comments don't count.
- Blank lines stay blank, and the depth never goes below 0.

**Input:** C code.

**Output:** the re-indented code.

**Constraints:** at most 1000 lines of at most 500 characters

## Hints

1. Work out the printing depth before you count the braces of the current line.
2. Scan each line with a small state machine so you can skip `"..."`, `'...'` and everything after `//`.

```c starter
#include <ctype.h>
#include <stdio.h>
#include <string.h>

int main(void) {
    char buf[512];
    int depth = 0;
    while (fgets(buf, sizeof buf, stdin)) {
        /* trim, print with indentation, update depth */
    }
    return 0;
}
```

```c solution
#include <ctype.h>
#include <stdio.h>
#include <string.h>

static int brace_delta(const char *s) {
    int d = 0;
    while (*s) {
        if (*s == '"' || *s == '\'') {
            char q = *s++;
            while (*s && *s != q) {
                if (*s == '\\' && s[1]) s++;
                s++;
            }
            if (*s) s++;
        } else if (s[0] == '/' && s[1] == '/') {
            break;
        } else {
            if (*s == '{') d++;
            else if (*s == '}') d--;
            s++;
        }
    }
    return d;
}

int main(void) {
    char buf[512];
    int depth = 0;
    while (fgets(buf, sizeof buf, stdin)) {
        char *line = buf;
        while (isspace((unsigned char)*line)) line++;
        size_t n = strlen(line);
        while (n > 0 && isspace((unsigned char)line[n - 1])) line[--n] = '\0';
        if (n == 0) { putchar('\n'); continue; }
        int level = depth - (line[0] == '}');
        if (level < 0) level = 0;
        printf("%*s%s\n", level * 4, "", line);
        depth += brace_delta(line);
        if (depth < 0) depth = 0;
    }
    return 0;
}
```

```test sample
int main(void) {
int x = 0;
      if (x) {
puts("{ not a brace");
  } else {
x = '}';
}

return x;
       }
---
int main(void) {
    int x = 0;
    if (x) {
        puts("{ not a brace");
    } else {
        x = '}';
    }

    return x;
}
```

```test hidden
struct p { int x; };
void f(void) { // {
for (;;) { break; }
}
---
struct p { int x; };
void f(void) { // {
    for (;;) { break; }
}
```

```test hidden
}
a
{
{
b
}}
c
---
}
a
{
    {
        b
    }}
c
```
