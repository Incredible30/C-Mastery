---
title: Shout It: Uppercase a Line
difficulty: easy
topic: Strings
xp: 15
plan: free
---
Convert every lowercase letter in a line to uppercase. Leave every other character unchanged.

**Input:** one line of text.

**Output:** the same line in uppercase.

**Constraints:** the line has at most 1000 characters.

## Hints

1. Loop over the characters until `'\0'`.
2. Use `toupper` from `<ctype.h>`, or subtract 32 from characters between `'a'` and `'z'`.

```c starter
#include <stdio.h>

int main(void) {
    char line[1002];
    fgets(line, sizeof line, stdin);
    /* convert to uppercase and print */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    char line[1002];
    if (fgets(line, sizeof line, stdin) == NULL) return 0;
    for (int i = 0; line[i] != '\0'; i++) {
        if (line[i] >= 'a' && line[i] <= 'z') line[i] = (char)(line[i] - 32);
    }
    printf("%s", line);
    return 0;
}
```

```test sample
Learn C in 30 days!
---
LEARN C IN 30 DAYS!
```

```test hidden
ALREADY LOUD
---
ALREADY LOUD
```

```test hidden
mixed Case 123 abc_xyz
---
MIXED CASE 123 ABC_XYZ
```
