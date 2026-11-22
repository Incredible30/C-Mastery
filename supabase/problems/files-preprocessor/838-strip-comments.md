---
title: Strip C Comments
difficulty: hard
topic: Text Processing
xp: 50
plan: pro
time_limit_ms: 1000
---
Remove every comment from a C source file, the way the preprocessor does:

- A `// line comment` disappears up to (but not including) the newline.
- A `/* block comment */` becomes a single space, followed by any newlines it contained, so the line count stays the same.
- Comment markers inside string literals `"..."` and character literals `'...'` are **not** comments. Literals may contain escapes such as `\"` and `\\`.

Everything else is copied exactly.

**Input:** C source code.

**Output:** the same code without comments.

**Constraints:** at most 10^5 characters, block comments are always closed

## Hints

1. Work as a state machine over `getchar()`: normal code, inside a string, inside a char literal, inside a line comment, inside a block comment.
2. After a `/` in normal code, peek at the next character. If it is neither `/` nor `*`, print the `/` and push the character back with `ungetc`.

```c starter
#include <stdio.h>

int main(void) {
    int c;
    while ((c = getchar()) != EOF) {
        /* handle literals and comments */
        putchar(c);
    }
    return 0;
}
```

```c solution
#include <stdio.h>

static void copy_literal(int q) {
    int c;
    putchar(q);
    while ((c = getchar()) != EOF) {
        putchar(c);
        if (c == '\\') {
            int d = getchar();
            if (d == EOF) return;
            putchar(d);
            continue;
        }
        if (c == q || c == '\n') return;
    }
}

int main(void) {
    int c;
    while ((c = getchar()) != EOF) {
        if (c == '"' || c == '\'') {
            copy_literal(c);
        } else if (c == '/') {
            int d = getchar();
            if (d == '/') {
                while ((c = getchar()) != EOF && c != '\n') {}
                if (c == '\n') putchar('\n');
            } else if (d == '*') {
                int p = 0;
                putchar(' ');
                while ((c = getchar()) != EOF) {
                    if (p == '*' && c == '/') break;
                    if (c == '\n') putchar('\n');
                    p = c;
                }
            } else {
                putchar('/');
                if (d != EOF) ungetc(d, stdin);
            }
        } else {
            putchar(c);
        }
    }
    return 0;
}
```

```test sample
int main(void) { // entry point
    int a = 10 / 2; /* half */
    printf("// not a comment /* either */\n");
    return a;/* multi
    line */}
---
int main(void) { 
    int a = 10 / 2;  
    printf("// not a comment /* either */\n");
    return a; 
}
```

```test hidden
char q = '"'; /* quote */ char s = '/';
const char *p = "\"/*\"";//tail
x = a/**/b;
---
char q = '"';   char s = '/';
const char *p = "\"/*\"";
x = a b;
```

```test hidden
no comments at all
y = 8 / 4 / 2;
---
no comments at all
y = 8 / 4 / 2;
```

```test hidden
/***/a/* ** / */b
"\\"// after escaped backslash
---
 a b
"\\"
```
