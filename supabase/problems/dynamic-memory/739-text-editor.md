---
title: Text Editor Buffer
difficulty: hard
topic: Linked Lists
xp: 50
plan: pro
time_limit_ms: 1000
---
Simulate a tiny text editor. The input is one line of keystrokes:

- a letter or digit is typed at the cursor
- `<` moves the cursor one character left, `>` one character right (doing nothing at either end)
- `#` is backspace: delete the character just left of the cursor (if any)

The cursor starts at the end of an empty document. Print the final text. Use a **doubly linked list** of characters so typing and deleting in the middle are O(1).

**Input:** one line of keystrokes.

**Output:** the final text, or `(empty)`.

**Constraints:** 1 ≤ length ≤ 10^6

## Hints

1. `struct Node { char c; struct Node *prev, *next; };` with one **sentinel** node whose `next` is the first character and whose `prev` is the last. The sentinel removes all the `NULL` checks.
2. Keep `cur` = the node just left of the cursor (the sentinel when the cursor is at the start). Typing inserts after `cur`; backspace removes `cur` and steps back to its `prev`.

```c starter
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Node { char c; struct Node *prev, *next; };

int main(void) {
    struct Node head = {0, &head, &head};
    struct Node *cur = &head;
    int ch;
    while ((ch = getchar()) != EOF && ch != '\n' && ch != '\r') {
        /* handle keystroke */
    }
    /* print and free */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Node { char c; struct Node *prev, *next; };

int main(void) {
    struct Node head = {0, &head, &head};
    struct Node *cur = &head;
    int ch;
    while ((ch = getchar()) != EOF && ch != '\n' && ch != '\r') {
        if (ch == '<') { if (cur != &head) cur = cur->prev; }
        else if (ch == '>') { if (cur->next != &head) cur = cur->next; }
        else if (ch == '#') {
            if (cur != &head) {
                struct Node *dead = cur;
                dead->prev->next = dead->next;
                dead->next->prev = dead->prev;
                cur = dead->prev;
                free(dead);
            }
        } else {
            struct Node *n = malloc(sizeof *n);
            if (!n) return 1;
            n->c = (char)ch;
            n->prev = cur;
            n->next = cur->next;
            cur->next->prev = n;
            cur->next = n;
            cur = n;
        }
    }
    if (head.next == &head) printf("(empty)");
    for (struct Node *p = head.next; p != &head;) {
        struct Node *next = p->next;
        putchar(p->c);
        free(p);
        p = next;
    }
    putchar('\n');
    return 0;
}
```

```test sample
abc<<x>>y#z
---
axbcz
```

```test hidden
<<>>##
---
(empty)
```

```test hidden
hello#####world
---
world
```

```test hidden
ab<<<<cd>>>>ef
---
cdabef
```
