---
title: Hex Dump
difficulty: medium
topic: Streams
xp: 35
plan: free
---
Write a small hex dump tool. Read every byte of input with `getchar` and print 16 bytes per line. Each line starts with the offset of its first byte as 8 hex digits and a colon, followed by each byte as ` %02x`. After the data, print one more line with the total byte count as 8 hex digits.

**Input:** any text (the newlines are bytes too: `0a`).

**Output:** the dump.

**Constraints:** at most 10^5 bytes

## Hints

1. Keep a byte counter. When `count % 16 == 0`, start a new line with `printf("%08lx:", count)`.
2. After the loop, end an unfinished line, then print the final count.

```c starter
#include <stdio.h>

int main(void) {
    unsigned long count = 0;
    int c;
    while ((c = getchar()) != EOF) {
        /* print offsets and bytes */
    }
    return 0;
}
```

```c solution
#include <stdio.h>

int main(void) {
    unsigned long count = 0;
    int c;
    while ((c = getchar()) != EOF) {
        if (count % 16 == 0) {
            if (count) putchar('\n');
            printf("%08lx:", count);
        }
        printf(" %02x", (unsigned)c);
        count++;
    }
    if (count) putchar('\n');
    printf("%08lx\n", count);
    return 0;
}
```

```test sample
Hello, hex dump world!
---
00000000: 48 65 6c 6c 6f 2c 20 68 65 78 20 64 75 6d 70 20
00000010: 77 6f 72 6c 64 21 0a
00000017
```

```test hidden
A
---
00000000: 41 0a
00000002
```

```test hidden
0123456789abcdef
ABC
---
00000000: 30 31 32 33 34 35 36 37 38 39 61 62 63 64 65 66
00000010: 0a 41 42 43 0a
00000015
```
