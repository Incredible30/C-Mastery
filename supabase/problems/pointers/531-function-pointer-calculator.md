---
title: Calculator With Function Pointers
difficulty: medium
topic: Function Pointers
xp: 30
plan: free
---
Build a calculator where each operator maps to a function through a **function pointer**, instead of a big `switch` doing the maths. Supported operators: `+ - * / %`. Division or remainder by zero prints `ERROR`.

**Input:** `q`, then `q` lines of the form `a op b`.

**Output:** one result per line.

**Constraints:** 1 ≤ q ≤ 1000, |a|, |b| ≤ 10^9

## Hints

1. Write functions like `long long add(long long a, long long b)` and declare `long long (*f)(long long, long long);`.
2. Pick the function from the operator (`f = add;`), then call `f(a, b)`. Check for a zero divisor before calling `/` or `%`.

```c starter
#include <stdio.h>

long long add(long long a, long long b) { return a + b; }

int main(void) {
    int q;
    scanf("%d", &q);
    while (q--) {
        long long a, b;
        char op;
        scanf("%lld %c %lld", &a, &op, &b);
        /* choose a function pointer and call it */
    }
    return 0;
}
```

```c solution
#include <stdio.h>

static long long add(long long a, long long b) { return a + b; }
static long long sub(long long a, long long b) { return a - b; }
static long long mul(long long a, long long b) { return a * b; }
static long long dvd(long long a, long long b) { return a / b; }
static long long mdl(long long a, long long b) { return a % b; }

int main(void) {
    int q;
    if (scanf("%d", &q) != 1) return 1;
    while (q--) {
        long long a, b;
        char op;
        if (scanf("%lld %c %lld", &a, &op, &b) != 3) return 1;
        long long (*f)(long long, long long) = NULL;
        switch (op) {
            case '+': f = add; break;
            case '-': f = sub; break;
            case '*': f = mul; break;
            case '/': f = dvd; break;
            case '%': f = mdl; break;
        }
        if (!f || ((op == '/' || op == '%') && b == 0)) printf("ERROR\n");
        else printf("%lld\n", f(a, b));
    }
    return 0;
}
```

```test sample
4
3 + 4
10 / 3
7 * -6
9 % 4
---
7
3
-42
1
```

```test hidden
2
5 / 0
5 % 0
---
ERROR
ERROR
```

```test hidden
2
1000000000 * 1000000000
-7 / 2
---
1000000000000000000
-3
```
