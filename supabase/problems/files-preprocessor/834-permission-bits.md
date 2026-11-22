---
title: Permission Bits
difficulty: medium
topic: Bit Flags
xp: 35
plan: free
---
Unix file permissions store read, write and execute flags for the owner, the group and others. Each group is one octal digit, where `r = 4`, `w = 2` and `x = 1`. Define those flags as macros and use `&` and `|` to convert in both directions:

- A line of three octal digits like `755` becomes `rwxr-xr-x`.
- A line of nine characters like `rw-r--r--` becomes `644`.

**Input:** one permission per line, in either form.

**Output:** the other form.

**Constraints:** at most 1000 lines, all valid

## Hints

1. `#define PERM_R 4`, `#define PERM_W 2`, `#define PERM_X 1`. For one digit `d`: `(d & PERM_R) ? 'r' : '-'`, and so on.
2. In the other direction, build each digit with `|=` as you read three characters.

```c starter
#include <ctype.h>
#include <stdio.h>
#include <string.h>

#define PERM_R 4
#define PERM_W 2
#define PERM_X 1

int main(void) {
    char buf[32];
    while (scanf("%31s", buf) == 1) {
        /* octal -> symbolic, or symbolic -> octal */
    }
    return 0;
}
```

```c solution
#include <ctype.h>
#include <stdio.h>
#include <string.h>

#define PERM_R 4
#define PERM_W 2
#define PERM_X 1

int main(void) {
    char buf[32];
    while (scanf("%31s", buf) == 1) {
        if (isdigit((unsigned char)buf[0])) {
            for (int i = 0; i < 3; i++) {
                int d = buf[i] - '0';
                putchar(d & PERM_R ? 'r' : '-');
                putchar(d & PERM_W ? 'w' : '-');
                putchar(d & PERM_X ? 'x' : '-');
            }
            putchar('\n');
        } else {
            for (int i = 0; i < 3; i++) {
                int d = 0;
                if (buf[3 * i] == 'r') d |= PERM_R;
                if (buf[3 * i + 1] == 'w') d |= PERM_W;
                if (buf[3 * i + 2] == 'x') d |= PERM_X;
                putchar('0' + d);
            }
            putchar('\n');
        }
    }
    return 0;
}
```

```test sample
755
rw-r--r--
600
---
rwxr-xr-x
644
rw-------
```

```test hidden
000
777
rwxrwxrwx
--------x
---
---------
rwxrwxrwx
777
001
```

```test hidden
r--r-----
421
---
440
r---w---x
```
