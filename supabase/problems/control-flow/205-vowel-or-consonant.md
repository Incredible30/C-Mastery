---
title: Vowel or Consonant
difficulty: easy
topic: Switch
xp: 10
plan: free
---
Read one letter and print `VOWEL` or `CONSONANT`. Upper- and lowercase both count. Use a `switch` statement.

**Input:** one letter.

**Output:** `VOWEL` or `CONSONANT`.

**Constraints:** the input is always an English letter.

## Hints

1. Several `case` labels can share one block: `case 'a': case 'A': case 'e': ...`.
2. Put `printf("VOWEL\n"); break;` after the vowel cases, and handle everything else in `default`.

```c starter
#include <stdio.h>

int main(void) {
    char c;
    scanf(" %c", &c);
    /* use switch to print VOWEL or CONSONANT */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    char c;
    if (scanf(" %c", &c) != 1) return 1;
    switch (c) {
        case 'a': case 'e': case 'i': case 'o': case 'u':
        case 'A': case 'E': case 'I': case 'O': case 'U':
            printf("VOWEL\n");
            break;
        default:
            printf("CONSONANT\n");
    }
    return 0;
}
```

```test sample
e
---
VOWEL
```

```test hidden
U
---
VOWEL
```

```test hidden
z
---
CONSONANT
```

```test hidden
Y
---
CONSONANT
```
