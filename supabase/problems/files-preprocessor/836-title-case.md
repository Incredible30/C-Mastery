---
title: Title Case
difficulty: medium
topic: Text Processing
xp: 35
plan: free
---
Convert each line to title case. A word is a run of non-space characters. Lowercase every word, then capitalise its first letter, **unless** the word is one of the small words `a an the of and in on to for`. Small words stay lowercase except when they are the first word of the line. Keep the spacing exactly as it was.

**Input:** lines of text.

**Output:** the same lines in title case.

**Constraints:** lines up to 1000 characters

## Hints

1. Copy each word into a buffer, lowercase it, then compare it with the small-word list.
2. Keep a flag for "first word on this line", and reset it for every line.

```c starter
#include <ctype.h>
#include <stdio.h>
#include <string.h>

static const char *small[] = {"a", "an", "the", "of", "and", "in", "on", "to", "for"};

int main(void) {
    char buf[1002];
    while (fgets(buf, sizeof buf, stdin)) {
        /* rewrite each word */
    }
    return 0;
}
```

```c solution
#include <ctype.h>
#include <stdio.h>
#include <string.h>

static const char *small[] = {"a", "an", "the", "of", "and", "in", "on", "to", "for"};
#define NSMALL (sizeof small / sizeof small[0])

static int is_small(const char *w) {
    for (size_t i = 0; i < NSMALL; i++)
        if (strcmp(w, small[i]) == 0) return 1;
    return 0;
}

int main(void) {
    char buf[1002], word[1002];
    while (fgets(buf, sizeof buf, stdin)) {
        buf[strcspn(buf, "\r\n")] = '\0';
        const char *p = buf;
        int first = 1;
        while (*p) {
            if (isspace((unsigned char)*p)) { putchar(*p++); continue; }
            size_t n = 0;
            while (*p && !isspace((unsigned char)*p))
                word[n++] = (char)tolower((unsigned char)*p++);
            word[n] = '\0';
            if (first || !is_small(word)) word[0] = (char)toupper((unsigned char)word[0]);
            first = 0;
            fputs(word, stdout);
        }
        putchar('\n');
    }
    return 0;
}
```

```test sample
the lord OF the rings
a tale of two cities
learn C in 21 days
---
The Lord of the Rings
A Tale of Two Cities
Learn C in 21 Days
```

```test hidden
AND then THERE were none
---
And Then There Were None
```

```test hidden
  gone   with  the wind
on the road to x86
---
  Gone   With  the Wind
On the Road to X86
```
