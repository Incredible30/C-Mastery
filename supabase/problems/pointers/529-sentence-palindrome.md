---
title: Sentence Palindrome
difficulty: medium
topic: Strings & Pointers
xp: 30
plan: free
---
Decide whether a sentence is a palindrome when you ignore everything except letters and digits, and ignore letter case. "A man, a plan, a canal: Panama" is one.

**Input:** one line of text.

**Output:** `YES` or `NO`.

**Constraints:** 1 ≤ length ≤ 1000

## Hints

1. Use a left pointer and a right pointer. Move each inward past characters that aren't letters or digits (`isalnum`).
2. Compare `tolower(*l)` with `tolower(*r)`. Cast to `unsigned char` before calling `<ctype.h>` functions.

```c starter
#include <ctype.h>
#include <stdio.h>
#include <string.h>

int main(void) {
    char s[1002];
    fgets(s, sizeof s, stdin);
    s[strcspn(s, "\r\n")] = '\0';
    /* two pointers from the ends */
    return 0;
}
```

```c solution
#include <ctype.h>
#include <stdio.h>
#include <string.h>

int main(void) {
    char s[1002];
    if (!fgets(s, sizeof s, stdin)) return 1;
    s[strcspn(s, "\r\n")] = '\0';
    const char *l = s, *r = s + strlen(s) - 1;
    int ok = 1;
    while (l < r) {
        if (!isalnum((unsigned char)*l)) { l++; continue; }
        if (!isalnum((unsigned char)*r)) { r--; continue; }
        if (tolower((unsigned char)*l) != tolower((unsigned char)*r)) { ok = 0; break; }
        l++; r--;
    }
    printf("%s\n", ok ? "YES" : "NO");
    return 0;
}
```

```test sample
A man, a plan, a canal: Panama
---
YES
```

```test hidden
race a car
---
NO
```

```test hidden
No 'x' in Nixon
---
YES
```

```test hidden
12321
---
YES
```
