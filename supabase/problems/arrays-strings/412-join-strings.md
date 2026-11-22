---
title: Join Two Strings
difficulty: easy
topic: Strings
xp: 15
plan: free
---
Join a first name and a last name into one string with a space between them, without using `strcat` or `sprintf`. Copy the characters yourself. Then print the full name and its length.

**Input:** two words.

**Output:** the full name, then its length, on one line separated by ` - `.

**Constraints:** each word has 1 to 50 characters.

## Hints

1. Copy the first word character by character into a new array, then add `' '`, then copy the second word.
2. Finish with `'\0'`. The length is the number of characters you wrote before it.

```c starter
#include <stdio.h>

int main(void) {
    char first[51], last[51], full[103];
    scanf("%50s %50s", first, last);
    /* build full by hand */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    char first[51], last[51], full[103];
    if (scanf("%50s %50s", first, last) != 2) return 1;
    int k = 0;
    for (int i = 0; first[i] != '\0'; i++) full[k++] = first[i];
    full[k++] = ' ';
    for (int i = 0; last[i] != '\0'; i++) full[k++] = last[i];
    full[k] = '\0';
    printf("%s - %d\n", full, k);
    return 0;
}
```

```test sample
Priya Sharma
---
Priya Sharma - 12
```

```test hidden
A B
---
A B - 3
```

```test hidden
Venkataraghavan Subramanian
---
Venkataraghavan Subramanian - 27
```
