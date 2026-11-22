---
title: Letter Frequency
difficulty: easy
topic: Streams
xp: 15
plan: free
---
Count how often each letter appears in the whole input, ignoring case, and print the counts for the letters that appear at least once, in alphabetical order.

**Input:** any text.

**Output:** `letter count` per line, letters in lowercase.

**Constraints:** at most 10^6 characters.

## Hints

1. `int cnt[26] = {0};` and for each letter `cnt[tolower(c) - 'a']++`.
2. Print `'a' + i` and `cnt[i]` for every non-zero entry.

```c starter
#include <ctype.h>
#include <stdio.h>

int main(void) {
    int c, cnt[26] = {0};
    while ((c = getchar()) != EOF) {
        /* count letters */
    }
    /* print non-zero counts */
    return 0;
}
```

```c solution
#include <ctype.h>
#include <stdio.h>

int main(void) {
    int c;
    long cnt[26] = {0};
    while ((c = getchar()) != EOF) if (isalpha(c)) cnt[tolower(c) - 'a']++;
    for (int i = 0; i < 26; i++) if (cnt[i]) printf("%c %ld\n", 'a' + i, cnt[i]);
    return 0;
}
```

```test sample
Hello World
---
d 1
e 1
h 1
l 3
o 2
r 1
w 1
```

```test hidden
AAA aaa
---
a 6
```

```test hidden
123 !?
xyz
---
x 1
y 1
z 1
```
