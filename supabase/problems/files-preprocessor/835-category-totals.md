---
title: Category Totals
difficulty: medium
topic: Streams
xp: 40
plan: free
---
Write a function `void summarize(FILE *in, FILE *out)` that reads expense lines `category amount` from `in` and writes the total for each category to `out`. List the categories in the order they first appear, then add a final `TOTAL` line. Print amounts with 2 decimals. `main` just calls `summarize(stdin, stdout)`.

Taking `FILE *` parameters means the same function could work on real files, a pipe or the terminal without changes.

**Input:** lines `category amount`.

**Output:** `category total` lines, then `TOTAL sum`.

**Constraints:** at most 100 categories with names up to 30 characters, at most 10000 lines

## Hints

1. Use `fgets(buf, sizeof buf, in)` and `fprintf(out, ...)`, never `stdin` or `stdout` directly inside the function.
2. Keep parallel arrays of names and totals, and search the names for each line.

```c starter
#include <stdio.h>
#include <string.h>

static void summarize(FILE *in, FILE *out) {
    /* read from in, write to out */
}

int main(void) {
    summarize(stdin, stdout);
    return 0;
}
```

```c solution
#include <stdio.h>
#include <string.h>

#define MAXCAT 100

static void summarize(FILE *in, FILE *out) {
    char names[MAXCAT][32], buf[128], name[32];
    double totals[MAXCAT], amount, all = 0;
    int n = 0;
    while (fgets(buf, sizeof buf, in)) {
        if (sscanf(buf, "%31s %lf", name, &amount) != 2) continue;
        int i = 0;
        while (i < n && strcmp(names[i], name) != 0) i++;
        if (i == n) {
            if (n == MAXCAT) continue;
            strcpy(names[n], name);
            totals[n++] = 0;
        }
        totals[i] += amount;
        all += amount;
    }
    for (int i = 0; i < n; i++) fprintf(out, "%s %.2f\n", names[i], totals[i]);
    fprintf(out, "TOTAL %.2f\n", all);
}

int main(void) {
    summarize(stdin, stdout);
    return 0;
}
```

```test sample
food 120.50
travel 300
food 79.50
books 45.25
travel 12.75
---
food 200.00
travel 312.75
books 45.25
TOTAL 558.00
```

```test hidden
rent 15000
---
rent 15000.00
TOTAL 15000.00
```

```test hidden
a 0.10
b 0.20
a 0.30
c 1
b 2.25
---
a 0.40
b 2.45
c 1.00
TOTAL 3.85
```
