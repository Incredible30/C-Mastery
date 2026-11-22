---
title: Character Classes
difficulty: easy
topic: Streams
xp: 15
plan: free
---
Classify every character of the input (except line breaks and `'\r'`) as a letter, a digit, a space (space or tab) or other, using the `<ctype.h>` functions.

**Input:** any text.

**Output:** four lines: `letters: L`, `digits: D`, `spaces: S`, `other: O`.

**Constraints:** at most 10^6 characters.

## Hints

1. `isalpha`, `isdigit` from `<ctype.h>`; check for `' '` or `'\t'` yourself.
2. Pass characters as `unsigned char` values (what `getchar` already returns), never a negative `char`.

```c starter
#include <ctype.h>
#include <stdio.h>

int main(void) {
    int c;
    long letters = 0, digits = 0, spaces = 0, other = 0;
    while ((c = getchar()) != EOF) {
        /* classify */
    }
    printf("letters: %ld\ndigits: %ld\nspaces: %ld\nother: %ld\n", letters, digits, spaces, other);
    return 0;
}
```

```c solution
#include <ctype.h>
#include <stdio.h>

int main(void) {
    int c;
    long letters = 0, digits = 0, spaces = 0, other = 0;
    while ((c = getchar()) != EOF) {
        if (c == '\n' || c == '\r') continue;
        if (isalpha(c)) letters++;
        else if (isdigit(c)) digits++;
        else if (c == ' ' || c == '\t') spaces++;
        else other++;
    }
    printf("letters: %ld\ndigits: %ld\nspaces: %ld\nother: %ld\n", letters, digits, spaces, other);
    return 0;
}
```

```test sample
int x = 42;
---
letters: 4
digits: 2
spaces: 3
other: 2
```

```test hidden
abc
---
letters: 3
digits: 0
spaces: 0
other: 0
```

```test hidden
2 + 2 = 4!
#define PI 3.14
---
letters: 8
digits: 6
spaces: 6
other: 5
```
