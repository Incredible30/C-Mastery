---
title: Caesar Cipher
difficulty: medium
topic: Strings
xp: 25
plan: free
---
Encrypt a line with a Caesar cipher: shift every letter `k` places forward in the alphabet, wrapping around from Z to A. Keep upper- and lowercase as they are, and leave all other characters unchanged.

**Input:** the shift `k` on the first line, then a line of text.

**Output:** the encrypted line.

**Constraints:** 0 ≤ k ≤ 10^9, the text has at most 1000 characters.

## Hints

1. For a lowercase letter: `'a' + (c - 'a' + k) % 26`. Uppercase works the same with `'A'`.
2. Reduce `k` with `k % 26` first so the arithmetic stays small.

```c starter
#include <stdio.h>

int main(void) {
    long long k;
    char line[1002];
    scanf("%lld", &k);
    getchar();
    fgets(line, sizeof line, stdin);
    /* encrypt and print */
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    long long k;
    char line[1002];
    if (scanf("%lld", &k) != 1) return 1;
    int ch;
    while ((ch = getchar()) != '\n' && ch != EOF) { }
    if (fgets(line, sizeof line, stdin) == NULL) return 0;
    int s = (int)(k % 26);
    for (int i = 0; line[i]; i++) {
        char c = line[i];
        if (c >= 'a' && c <= 'z') line[i] = (char)('a' + (c - 'a' + s) % 26);
        else if (c >= 'A' && c <= 'Z') line[i] = (char)('A' + (c - 'A' + s) % 26);
    }
    printf("%s", line);
    return 0;
}
```

```test sample
3
Hello, World!
---
Khoor, Zruog!
```

```test hidden
0
No change.
---
No change.
```

```test hidden
1000000000
Zebra xyz ABC
---
Lqndm jkl MNO
```
