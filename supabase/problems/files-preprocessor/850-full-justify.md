---
title: Full Justification
difficulty: hard
topic: Text Formatting
xp: 50
plan: pro
time_limit_ms: 1000
---
The first line holds a width `W`. The rest is text made of paragraphs separated by one or more blank lines. Typeset each paragraph like a newspaper column:

- Fill lines greedily: put as many words on a line as fit when separated by single spaces.
- Stretch every line **except the last line of a paragraph** to exactly `W` characters by widening the gaps between words. Spread the extra spaces evenly, and give the leftmost gaps one more space when they don't divide evenly.
- The last line of a paragraph, and any line holding only one word, is left-aligned with single spaces.
- A word longer than `W` gets a line to itself.

Print one blank line between paragraphs.

**Input:** `W`, then the text.

**Output:** the justified paragraphs.

**Constraints:** 10 ≤ W ≤ 100, at most 4000 words of at most 50 characters

## Hints

1. Collect a paragraph's words, then pick the words for each line: keep adding while `len + 1 + strlen(next) <= W`.
2. With `gaps` gaps and `spaces` spaces to share out, each gap gets `spaces / gaps`, and the first `spaces % gaps` gaps get one more.

```c starter
#include <ctype.h>
#include <stdio.h>
#include <string.h>

static char words[4000][52];

int main(void) {
    char buf[1024];
    int width;
    if (!fgets(buf, sizeof buf, stdin) || sscanf(buf, "%d", &width) != 1) return 1;
    /* group words into paragraphs and justify each */
    return 0;
}
```

```c solution
#include <ctype.h>
#include <stdio.h>
#include <string.h>

static char words[4000][52];
static int width, printed;

static void justify(int n) {
    if (n == 0) return;
    if (printed++) putchar('\n');
    int i = 0;
    while (i < n) {
        int j = i, len = (int)strlen(words[i]);
        while (j + 1 < n && len + 1 + (int)strlen(words[j + 1]) <= width) {
            j++;
            len += 1 + (int)strlen(words[j]);
        }
        if (j == n - 1 || j == i) {
            for (int k = i; k <= j; k++) printf(k > i ? " %s" : "%s", words[k]);
        } else {
            int gaps = j - i, letters = len - gaps;
            int spaces = width - letters, base = spaces / gaps, extra = spaces % gaps;
            for (int k = i; k <= j; k++) {
                fputs(words[k], stdout);
                if (k < j) printf("%*s", base + (k - i < extra), "");
            }
        }
        putchar('\n');
        i = j + 1;
    }
}

int main(void) {
    char buf[1024];
    if (!fgets(buf, sizeof buf, stdin) || sscanf(buf, "%d", &width) != 1) return 1;
    int n = 0;
    while (fgets(buf, sizeof buf, stdin)) {
        const char *p = buf;
        int used, any = 0;
        while (n < 4000 && sscanf(p, "%51s%n", words[n], &used) == 1) {
            p += used;
            n++;
            any = 1;
        }
        if (!any) { justify(n); n = 0; }
    }
    justify(n);
    return 0;
}
```

```test sample
20
This is an example of text justification
done in C.

Second paragraph here.
---
This  is  an example
of              text
justification   done
in C.

Second     paragraph
here.
```

```test hidden
10
a b c d e f g h i j k l
---
a  b c d e
f  g h i j
k l
```

```test hidden
12
supercalifragilistic is long
ok


tiny words a b c
---
supercalifragilistic
is long ok

tiny words a
b c
```
