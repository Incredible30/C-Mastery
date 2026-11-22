---
title: Count C Keywords
difficulty: medium
topic: Text Processing
xp: 45
plan: free
---
Read a C source file from standard input and count how often each of these keywords appears as a whole identifier:

`int char void if else for while do return struct`

Skip anything inside string literals (`"..."`), character literals (`'...'`), `// line comments` and `/* block comments */`. Watch for escapes like `\"` inside literals.

Print `keyword count` for every keyword that appears, in the order listed above. If none appear, print `no keywords`.

**Input:** C source code.

**Output:** the counts.

**Constraints:** at most 10^5 characters

## Hints

1. Read with `getchar()`. Use `ungetc` to push back one character after peeking (for example after `/` that doesn't start a comment).
2. Gather identifiers as `[A-Za-z_][A-Za-z0-9_]*`. Skip numbers as a whole so `0x1f` doesn't count as an identifier `x1f`.

```c starter
#include <ctype.h>
#include <stdio.h>
#include <string.h>

static const char *kw[] = {"int", "char", "void", "if", "else",
                           "for", "while", "do", "return", "struct"};
#define NKW (sizeof kw / sizeof kw[0])

int main(void) {
    int counts[NKW] = {0};
    int c;
    while ((c = getchar()) != EOF) {
        /* skip comments and literals, match identifiers */
    }
    return 0;
}
```

```c solution
#include <ctype.h>
#include <stdio.h>
#include <string.h>

static const char *kw[] = {"int", "char", "void", "if", "else",
                           "for", "while", "do", "return", "struct"};
#define NKW (sizeof kw / sizeof kw[0])

int main(void) {
    int counts[NKW] = {0};
    int c;
    while ((c = getchar()) != EOF) {
        if (c == '/') {
            int d = getchar();
            if (d == '/') {
                while ((c = getchar()) != EOF && c != '\n') {}
            } else if (d == '*') {
                int p = 0;
                while ((c = getchar()) != EOF) {
                    if (p == '*' && c == '/') break;
                    p = c;
                }
            } else if (d != EOF) {
                ungetc(d, stdin);
            }
        } else if (c == '"' || c == '\'') {
            int q = c;
            while ((c = getchar()) != EOF && c != q)
                if (c == '\\') (void)getchar();
        } else if (isalpha(c) || c == '_') {
            char w[64];
            size_t n = 0;
            while (c != EOF && (isalnum(c) || c == '_')) {
                if (n < sizeof w - 1) w[n++] = (char)c;
                c = getchar();
            }
            w[n] = '\0';
            if (c != EOF) ungetc(c, stdin);
            for (size_t i = 0; i < NKW; i++)
                if (strcmp(w, kw[i]) == 0) counts[i]++;
        } else if (isdigit(c)) {
            while ((c = getchar()) != EOF && (isalnum(c) || c == '_' || c == '.')) {}
            if (c != EOF) ungetc(c, stdin);
        }
    }
    int any = 0;
    for (size_t i = 0; i < NKW; i++)
        if (counts[i]) { printf("%s %d\n", kw[i], counts[i]); any = 1; }
    if (!any) puts("no keywords");
    return 0;
}
```

```test sample
#include <stdio.h>
/* int main is the entry point */
int main(void) {
    int i;
    for (i = 0; i < 3; i++) {
        if (i == 1) printf("if inside a string\n");
        else printf("%d\n", i);
    }
    return 0; // return int
}
---
int 2
void 1
if 1
else 1
for 1
return 1
```

```test hidden
struct point { int x, y; };
char c = '"'; char d = 'x';
const char *s = "say \"while\" twice";
int interval = 0x1f; void voidness;
---
int 2
char 3
void 1
struct 1
```

```test hidden
hello world
---
no keywords
```

```test hidden
do { x--; } while (x); /* while
 for */ do;
---
while 1
do 2
```
