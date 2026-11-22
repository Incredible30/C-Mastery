---
title: Type-Generic Macros
difficulty: medium
topic: Preprocessor
xp: 40
plan: free
---
C11's `_Generic` picks an expression based on the **type** of its argument. Write two macros:

- `TYPE_NAME(x)` gives `"int"`, `"long long"`, `"double"` or `"string"` (for `char *`).
- `ABS(x)` calls the absolute-value function that matches the type of `x`.

Each input line is a type letter and a value: `i` (int), `l` (long long), `d` (double) or `s` (a word). Print `TYPE_NAME(value)` and then `ABS(value)`. For strings, print the length instead. Print doubles with 2 decimals.

**Input:** lines like `i -5`, `l -9000000000`, `d -2.5`, `s hello`.

**Output:** `type result` per line.

**Constraints:** at most 1000 lines, words up to 100 characters

## Hints

1. `#define TYPE_NAME(x) _Generic((x), int: "int", long long: "long long", double: "double", char *: "string", default: "other")`
2. `#define ABS(x) _Generic((x), int: iabs, long long: llabs_, double: dabs)(x)`: the selection gives back a function, which is then called with `(x)`.

```c starter
#include <stdio.h>
#include <string.h>

/* define TYPE_NAME and ABS with _Generic */

int main(void) {
    char t;
    while (scanf(" %c", &t) == 1) {
        /* read the value according to t and print */
    }
    return 0;
}
```

```c solution
#include <stdio.h>
#include <string.h>

static int iabs(int v) { return v < 0 ? -v : v; }
static long long llabs_(long long v) { return v < 0 ? -v : v; }
static double dabs(double v) { return v < 0 ? -v : v; }

#define TYPE_NAME(x) _Generic((x), int: "int", long long: "long long", \
                              double: "double", char *: "string", default: "other")
#define ABS(x) _Generic((x), int: iabs, long long: llabs_, double: dabs)(x)

int main(void) {
    char t;
    while (scanf(" %c", &t) == 1) {
        if (t == 'i') {
            int v;
            if (scanf("%d", &v) != 1) return 1;
            printf("%s %d\n", TYPE_NAME(v), ABS(v));
        } else if (t == 'l') {
            long long v;
            if (scanf("%lld", &v) != 1) return 1;
            printf("%s %lld\n", TYPE_NAME(v), ABS(v));
        } else if (t == 'd') {
            double v;
            if (scanf("%lf", &v) != 1) return 1;
            printf("%s %.2f\n", TYPE_NAME(v), ABS(v));
        } else {
            char buf[101];
            if (scanf("%100s", buf) != 1) return 1;
            char *s = buf;
            printf("%s %d\n", TYPE_NAME(s), (int)strlen(s));
        }
    }
    return 0;
}
```

```test sample
i -5
l -9000000000
d -2.5
s hello
---
int 5
long long 9000000000
double 2.50
string 5
```

```test hidden
i 42
d 3.14159
d -0.004
---
int 42
double 3.14
double 0.00
```

```test hidden
s a
l 123456789012
i -2147483647
---
string 1
long long 123456789012
int 2147483647
```
