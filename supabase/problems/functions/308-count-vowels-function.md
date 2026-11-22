---
title: Vowel Checker Function
difficulty: easy
topic: Functions
xp: 15
plan: free
---
Write `int is_vowel(char c)` that returns 1 for a vowel (a, e, i, o, u in either case) and 0 otherwise. Use it to count the vowels in each of `t` words.

**Input:** `t`, then `t` words, one per line.

**Output:** the number of vowels in each word.

**Constraints:** 1 ≤ t ≤ 100, each word has 1 to 100 letters.

## Hints

1. Convert to lowercase first with `c | 32` or `tolower`, then compare with the five vowels.
2. Loop over the word until `'\0'`, adding `is_vowel(word[i])` each time.

```c starter
#include <stdio.h>

int is_vowel(char c) {
    /* return 1 for a vowel */
    return 0;
}

int main(void) {
    int t;
    scanf("%d", &t);
    while (t--) {
        char w[101];
        scanf("%100s", w);
        /* count and print */
    }
    return 0;
}
```

```c solution
#include <stdio.h>
#include <ctype.h>

int is_vowel(char c) {
    c = (char)tolower((unsigned char)c);
    return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';
}

int main(void) {
    int t;
    if (scanf("%d", &t) != 1) return 1;
    while (t--) {
        char w[101];
        if (scanf("%100s", w) != 1) return 1;
        int count = 0;
        for (int i = 0; w[i] != '\0'; i++) count += is_vowel(w[i]);
        printf("%d\n", count);
    }
    return 0;
}
```

```test sample
3
Programming
AEIOU
rhythm
---
3
5
0
```

```test hidden
2
a
Supercalifragilisticexpialidocious
---
1
16
```

```test hidden
2
rhythm
AEIOU
---
0
5
```
