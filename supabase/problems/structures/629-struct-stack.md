---
title: Stack in a Structure
difficulty: medium
topic: Structures
xp: 25
plan: free
---
Implement a stack as `struct Stack { int data[1000]; int top; };` with functions `push`, `pop` and `peek` that take a `struct Stack *`. Keeping the array and its counter together in one structure is how C programs build data structures.

**Input:** `q`, then `q` commands: `push x`, `pop`, `peek` or `size`.

**Output:** `pop` prints the removed value, `peek` the top value, `size` the count. `pop` or `peek` on an empty stack prints `EMPTY`.

**Constraints:** 1 ≤ q ≤ 1000

## Hints

1. Start with `top = 0`. `push`: `s->data[s->top++] = x;` `pop`: `return s->data[--s->top];`
2. Check `s->top == 0` before popping or peeking.

```c starter
#include <stdio.h>
#include <string.h>

struct Stack { int data[1000]; int top; };

int main(void) {
    struct Stack s = { .top = 0 };
    int q;
    char cmd[8];
    scanf("%d", &q);
    while (q--) {
        scanf("%7s", cmd);
        /* handle command */
    }
    return 0;
}
```

```c solution
#include <stdio.h>
#include <string.h>

struct Stack { int data[1000]; int top; };

static void push(struct Stack *s, int x) { s->data[s->top++] = x; }
static int pop(struct Stack *s) { return s->data[--s->top]; }
static int peek(const struct Stack *s) { return s->data[s->top - 1]; }

int main(void) {
    struct Stack s = { .top = 0 };
    int q;
    char cmd[8];
    if (scanf("%d", &q) != 1) return 1;
    while (q--) {
        if (scanf("%7s", cmd) != 1) return 1;
        if (strcmp(cmd, "push") == 0) {
            int x;
            if (scanf("%d", &x) != 1) return 1;
            push(&s, x);
        } else if (strcmp(cmd, "size") == 0) printf("%d\n", s.top);
        else if (s.top == 0) printf("EMPTY\n");
        else if (strcmp(cmd, "pop") == 0) printf("%d\n", pop(&s));
        else printf("%d\n", peek(&s));
    }
    return 0;
}
```

```test sample
7
push 5
push 8
peek
pop
size
pop
pop
---
8
8
1
5
EMPTY
```

```test hidden
2
peek
size
---
EMPTY
0
```

```test hidden
4
push -1
push 2
pop
peek
---
2
-1
```
