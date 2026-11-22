---
title: Number to Words
difficulty: hard
topic: Conditions
xp: 45
plan: free
---
Write a number from 0 to 999999 in English words, as on a cheque, all lowercase with words separated by single spaces.

Examples: 0 → `zero`, 15 → `fifteen`, 105 → `one hundred five`, 2024 → `two thousand twenty four`, 999999 → `nine hundred ninety nine thousand nine hundred ninety nine`.

**Input:** one integer `n`.

**Output:** `n` in words.

**Constraints:** 0 ≤ n ≤ 999999

## Hints

1. Write a helper that turns 1–999 into words, handling the hundreds, then 10–19 as special words, then tens and ones.
2. For n ≥ 1000, print the words for `n / 1000`, then `thousand`, then the words for `n % 1000` if it isn't 0.

```c starter
#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    /* print n in words */
    return 0;
}
```

```c solution
#include <stdio.h>

static const char *ones[] = {"", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
    "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"};
static const char *tens[] = {"", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"};
static int first = 1;

static void word(const char *w) {
    printf(first ? "%s" : " %s", w);
    first = 0;
}

static void below_thousand(int n) {
    if (n >= 100) { word(ones[n / 100]); word("hundred"); n %= 100; }
    if (n >= 20) { word(tens[n / 10]); n %= 10; }
    if (n > 0) word(ones[n]);
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    if (n == 0) word("zero");
    if (n >= 1000) { below_thousand(n / 1000); word("thousand"); }
    below_thousand(n % 1000);
    printf("\n");
    return 0;
}
```

```test sample
2024
---
two thousand twenty four
```

```test sample
105
---
one hundred five
```

```test hidden
0
---
zero
```

```test hidden
15
---
fifteen
```

```test hidden
999999
---
nine hundred ninety nine thousand nine hundred ninety nine
```

```test hidden
100000
---
one hundred thousand
```

```test hidden
70011
---
seventy thousand eleven
```
