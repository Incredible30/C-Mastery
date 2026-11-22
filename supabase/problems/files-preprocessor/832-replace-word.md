---
title: Replace Whole Words
difficulty: medium
topic: Text Processing
xp: 40
plan: free
---
The first line holds two words, `old` and `new`. In the rest of the text, replace every **whole-word** occurrence of `old` with `new`. A word is a maximal run of letters, digits and underscores, so `cat` inside `concatenate` is not replaced. Keep everything else exactly as it is, then print `replacements: N`.

**Input:** `old new`, then any text.

**Output:** the edited text, then the count.

**Constraints:** words up to 60 characters, lines up to 1000 characters

## Hints

1. Walk each line. When you reach a word character, gather the whole word into a buffer, compare it with `old`, and print either `new` or the word.
2. Copy non-word characters straight through.

```c starter
#include <ctype.h>
#include <stdio.h>
#include <string.h>

static int isword(int c) { return isalnum(c) || c == '_'; }

int main(void) {
    char old[64], neu[64], buf[1002];
    if (!fgets(buf, sizeof buf, stdin) || sscanf(buf, "%63s %63s", old, neu) != 2) return 1;
    int count = 0;
    while (fgets(buf, sizeof buf, stdin)) {
        /* rewrite the line */
    }
    printf("replacements: %d\n", count);
    return 0;
}
```

```c solution
#include <ctype.h>
#include <stdio.h>
#include <string.h>

static int isword(int c) { return isalnum(c) || c == '_'; }

int main(void) {
    char old[64], neu[64], buf[1002], word[1002];
    if (!fgets(buf, sizeof buf, stdin) || sscanf(buf, "%63s %63s", old, neu) != 2) return 1;
    int count = 0;
    while (fgets(buf, sizeof buf, stdin)) {
        buf[strcspn(buf, "\r\n")] = '\0';
        const char *p = buf;
        while (*p) {
            if (isword((unsigned char)*p)) {
                size_t n = 0;
                while (isword((unsigned char)*p)) word[n++] = *p++;
                word[n] = '\0';
                if (strcmp(word, old) == 0) { fputs(neu, stdout); count++; }
                else fputs(word, stdout);
            } else {
                putchar(*p++);
            }
        }
        putchar('\n');
    }
    printf("replacements: %d\n", count);
    return 0;
}
```

```test sample
cat dog
The cat sat on the mat.
concatenate cat_food cat, cat!
---
The dog sat on the mat.
concatenate cat_food dog, dog!
replacements: 3
```

```test hidden
x value
int x = x + x2 * (x);
---
int value = value + x2 * (value);
replacements: 3
```

```test hidden
missing found
nothing to change here
---
nothing to change here
replacements: 0
```
