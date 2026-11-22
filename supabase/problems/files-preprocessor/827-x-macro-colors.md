---
title: X-Macro Color Table
difficulty: medium
topic: Preprocessor
xp: 40
plan: free
---
An **X-macro** keeps one list of data and expands it several times to produce matching tables. The starter has the list `COLORS`. Use it to generate an `enum`, an array of names (with `#name`) and an array of RGB values, so all three always stay in sync.

For each word of input, look the color up without caring about case. If it's found, print `NAME index #RRGGBB` with uppercase hex. Otherwise print `NAME unknown`. In both cases `NAME` is the word in uppercase.

**Input:** color names, one per line.

**Output:** one line per name.

**Constraints:** at most 1000 names of at most 30 characters

## Hints

1. `#define X(name, r, g, b) #name,` then `COLORS` then `#undef X` builds the names array. Do the same with `{r, g, b},` for the values.
2. `printf("#%02X%02X%02X", r, g, b)` prints the hex code.

```c starter
#include <ctype.h>
#include <stdio.h>
#include <string.h>

#define COLORS \
    X(RED, 255, 0, 0) \
    X(GREEN, 0, 128, 0) \
    X(BLUE, 0, 0, 255) \
    X(WHITE, 255, 255, 255) \
    X(BLACK, 0, 0, 0) \
    X(ORANGE, 255, 165, 0) \
    X(PURPLE, 128, 0, 128)

/* generate enum Color, const char *names[], unsigned char rgb[][3] */

int main(void) {
    char word[32];
    while (scanf("%31s", word) == 1) {
        /* uppercase, look up, print */
    }
    return 0;
}
```

```c solution
#include <ctype.h>
#include <stdio.h>
#include <string.h>

#define COLORS \
    X(RED, 255, 0, 0) \
    X(GREEN, 0, 128, 0) \
    X(BLUE, 0, 0, 255) \
    X(WHITE, 255, 255, 255) \
    X(BLACK, 0, 0, 0) \
    X(ORANGE, 255, 165, 0) \
    X(PURPLE, 128, 0, 128)

enum Color {
#define X(name, r, g, b) COLOR_##name,
    COLORS
#undef X
    COLOR_COUNT
};

static const char *names[] = {
#define X(name, r, g, b) #name,
    COLORS
#undef X
};

static const unsigned char rgb[][3] = {
#define X(name, r, g, b) {r, g, b},
    COLORS
#undef X
};

int main(void) {
    char word[32];
    while (scanf("%31s", word) == 1) {
        for (char *p = word; *p; p++) *p = (char)toupper((unsigned char)*p);
        int found = -1;
        for (int i = 0; i < COLOR_COUNT; i++)
            if (strcmp(word, names[i]) == 0) { found = i; break; }
        if (found < 0) printf("%s unknown\n", word);
        else printf("%s %d #%02X%02X%02X\n", word, found,
                    rgb[found][0], rgb[found][1], rgb[found][2]);
    }
    return 0;
}
```

```test sample
red
Orange
mauve
BLUE
---
RED 0 #FF0000
ORANGE 5 #FFA500
MAUVE unknown
BLUE 2 #0000FF
```

```test hidden
purple
white
black
---
PURPLE 6 #800080
WHITE 3 #FFFFFF
BLACK 4 #000000
```

```test hidden
Green
grey
---
GREEN 1 #008000
GREY unknown
```
