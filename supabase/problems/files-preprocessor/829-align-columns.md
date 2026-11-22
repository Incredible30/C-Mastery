---
title: Align Columns
difficulty: medium
topic: Text Formatting
xp: 40
plan: free
---
Each line holds words separated by whitespace. Print them as a table: every column is left-aligned and as wide as its longest word, with one space between columns. Lines can have different numbers of words. Trailing spaces don't matter.

**Input:** up to 100 lines, each with up to 20 words.

**Output:** the aligned table.

**Constraints:** words have at most 30 characters

## Hints

1. Use two passes: store every word and track `width[col]`, then print.
2. `printf("%-*s ", width[j], word)` pads a word to `width[j]` characters.

```c starter
#include <stdio.h>
#include <string.h>

#define MAXR 100
#define MAXC 20

static char cell[MAXR][MAXC][32];
static int ncols[MAXR];

int main(void) {
    int width[MAXC] = {0}, rows = 0;
    char buf[1024];
    /* split each line into cells, then print aligned */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <string.h>

#define MAXR 100
#define MAXC 20

static char cell[MAXR][MAXC][32];
static int ncols[MAXR];

int main(void) {
    int width[MAXC] = {0}, rows = 0;
    char buf[1024];
    while (rows < MAXR && fgets(buf, sizeof buf, stdin)) {
        const char *p = buf;
        int used, c = 0;
        while (c < MAXC && sscanf(p, "%31s%n", cell[rows][c], &used) == 1) {
            int len = (int)strlen(cell[rows][c]);
            if (len > width[c]) width[c] = len;
            p += used;
            c++;
        }
        ncols[rows++] = c;
    }
    for (int r = 0; r < rows; r++) {
        for (int j = 0; j < ncols[r]; j++) {
            if (j < ncols[r] - 1) printf("%-*s ", width[j], cell[r][j]);
            else printf("%s", cell[r][j]);
        }
        printf("\n");
    }
    return 0;
}
```

```test sample
name city score
Asha Pune 92
Bartholomew Delhi 7
Li Bengaluru 100
---
name        city      score
Asha        Pune      92
Bartholomew Delhi     7
Li          Bengaluru 100
```

```test hidden
a bb ccc
dddd e
f
---
a    bb ccc
dddd e
f
```

```test hidden
x    y
  long_word   z   extra
---
x         y
long_word z extra
```
