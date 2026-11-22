---
title: Count Vowels and Consonants
difficulty: easy
topic: Strings
module: arrays-strings
xp: 20
plan: free
---
Read a line of text and print how many vowels and how many consonants it contains.

Vowels are `a e i o u`, in upper or lower case. Consonants are all other letters. Ignore digits, spaces and punctuation.

**Input:** one line of text (it may contain spaces).

**Output:** two integers separated by a space: the number of vowels, then the number of consonants.

**Constraints:** the line has at most 1000 characters.

## Hints

1. Read the whole line with `fgets`, because `scanf("%s")` stops at the first space.
2. Use `isalpha` and `tolower` from `<ctype.h>`. Cast each character to `unsigned char` before passing it.

```c starter
#include <stdio.h>
#include <ctype.h>

int main(void) {
    char line[1002];
    if (fgets(line, sizeof line, stdin) == NULL) return 0;
    int vowels = 0, consonants = 0;
    /* count them */
    printf("%d %d\n", vowels, consonants);
    return 0;
}
```

```c solution
#include <stdio.h>
#include <ctype.h>

int main(void) {
    char line[1002];
    if (fgets(line, sizeof line, stdin) == NULL) return 0;
    int vowels = 0, consonants = 0;
    for (int i = 0; line[i] != '\0'; i++) {
        unsigned char c = (unsigned char)line[i];
        if (!isalpha(c)) continue;
        c = (unsigned char)tolower(c);
        if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') vowels++;
        else consonants++;
    }
    printf("%d %d\n", vowels, consonants);
    return 0;
}
```

```test sample
Hello World
---
3 7
```

```test sample
C Programming 101!
---
3 9
```

```test hidden
AEIOU aeiou
---
10 0
```

```test hidden
rhythm
---
0 6
```

```test hidden
12345 !!! ...
---
0 0
```
