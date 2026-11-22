---
title: Dispatch Table Pipeline
difficulty: hard
topic: Function Pointers
xp: 45
plan: pro
---
Build a **dispatch table**: an array of `{name, function pointer}` pairs. Look up each operation name in the table and apply the operations, in order, to every number.

Operations: `double` (×2), `square` (x²), `negate` (−x), `inc` (+1), `dec` (−1), `half` (÷2, truncating toward zero).

**Input:** `n`, then `n` integers; `k`, then `k` operation names.

**Output:** the transformed numbers on one line. If any name is not in the table, print `UNKNOWN name` (the first unknown name) and nothing else.

**Constraints:** 1 ≤ n ≤ 1000, 1 ≤ k ≤ 20, all results fit in `long long`.

## Hints

1. `struct op { const char *name; long long (*fn)(long long); };` and a table such as `{ {"double", dbl}, {"square", sq}, ... }`.
2. Resolve every name to its function pointer **before** transforming anything, so an unknown name is reported without partial output.

```c starter
#include <stdio.h>
#include <string.h>

struct op { const char *name; long long (*fn)(long long); };

int main(void) {
    int n, k;
    long long a[1000];
    char name[21];
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%lld", &a[i]);
    scanf("%d", &k);
    /* look up each name, then apply */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <string.h>

struct op { const char *name; long long (*fn)(long long); };

static long long dbl(long long x) { return x * 2; }
static long long sq(long long x) { return x * x; }
static long long neg(long long x) { return -x; }
static long long inc(long long x) { return x + 1; }
static long long dec(long long x) { return x - 1; }
static long long half(long long x) { return x / 2; }

static const struct op table[] = {
    {"double", dbl}, {"square", sq}, {"negate", neg},
    {"inc", inc}, {"dec", dec}, {"half", half},
};

int main(void) {
    int n, k;
    long long a[1000];
    long long (*chain[20])(long long);
    char name[21];
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) if (scanf("%lld", &a[i]) != 1) return 1;
    if (scanf("%d", &k) != 1) return 1;
    for (int j = 0; j < k; j++) {
        if (scanf("%20s", name) != 1) return 1;
        chain[j] = NULL;
        for (size_t t = 0; t < sizeof table / sizeof table[0]; t++)
            if (strcmp(table[t].name, name) == 0) chain[j] = table[t].fn;
        if (!chain[j]) { printf("UNKNOWN %s\n", name); return 0; }
    }
    for (int i = 0; i < n; i++) {
        long long x = a[i];
        for (int j = 0; j < k; j++) x = chain[j](x);
        printf(i ? " %lld" : "%lld", x);
    }
    printf("\n");
    return 0;
}
```

```test sample
4
1 2 3 -5
3
double inc square
---
9 25 49 81
```

```test hidden
3
7 -7 0
2
half negate
---
-3 3 0
```

```test hidden
2
1 2
3
inc triple dec
---
UNKNOWN triple
```
