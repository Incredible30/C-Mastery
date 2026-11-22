<!-- lesson: stack-heap -->
A running C program keeps its data in two main areas of memory: the **stack** and the **heap**. Knowing the difference tells you where a variable lives, how long it lasts, and when you must clean up after yourself.

**Real-life analogy:** the stack is like a stack of plates at a buffet. Each function call puts a plate on top, and when the function finishes its plate is removed automatically. The heap is like a warehouse: you rent space when you need it, keep it as long as you like, and must return it yourself.

## Stack versus heap

| | Stack | Heap |
| --- | --- | --- |
| Holds | local variables, function call details | memory you request while the program runs |
| Managed by | the compiler, automatically | you, with `malloc` and `free` |
| Lifetime | until the function returns | until you call `free` |
| Size | small, often 1–8 MB | large, limited by system memory |
| Speed | very fast | slower to allocate |

## Example 1: stack variables disappear

```c
#include <stdio.h>

void count_down(int n) {
    int doubled = n * 2;     /* lives on this call's stack frame */
    printf("n=%d doubled=%d\n", n, doubled);
    if (n > 1) count_down(n - 1);
}

int main(void) {
    count_down(3);
    return 0;
}
```

Output:

```
n=3 doubled=6
n=2 doubled=4
n=1 doubled=2
```

Each call has its own `n` and `doubled`. They vanish when that call returns.

## Example 2: when you need the heap

Use the heap when the size is only known at runtime, when data must outlive the function that made it, or when it's too big for the stack:

```c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n;
    printf("How many marks? ");
    if (scanf("%d", &n) != 1 || n <= 0) return 1;

    int *marks = malloc(n * sizeof *marks);   /* exactly n ints, on the heap */
    if (marks == NULL) return 1;

    for (int i = 0; i < n; i++) marks[i] = 60 + i;
    printf("last mark: %d\n", marks[n - 1]);

    free(marks);                               /* give the memory back */
    return 0;
}
```

Input `5` gives:

```
last mark: 64
```

## Example 3: returning heap memory is safe

```c
#include <stdio.h>
#include <stdlib.h>

int *make_squares(int n) {
    int *a = malloc(n * sizeof *a);    /* survives after this function returns */
    if (a == NULL) return NULL;
    for (int i = 0; i < n; i++) a[i] = (i + 1) * (i + 1);
    return a;
}

int main(void) {
    int *sq = make_squares(5);
    if (sq == NULL) return 1;
    for (int i = 0; i < 5; i++) printf("%d ", sq[i]);
    printf("\n");
    free(sq);                          /* the caller now owns it and must free it */
    return 0;
}
```

Output:

```
1 4 9 16 25
```

A local array would be destroyed on return; heap memory stays until `free`.

## Common mistakes

- **Huge local arrays:** `int big[10000000];` can overflow the stack and crash. Use the heap.
- **Returning a pointer to a local variable.**
- **Forgetting to `free`** heap memory (a memory leak).

## Key points

- Locals live on the stack and are cleaned up automatically.
- Heap memory lasts until you `free` it.
- Use the heap for runtime sizes, long-lived data and big data.

## Interview corner

**Q: What is a stack overflow?**
Running out of stack space, usually from very deep recursion or very large local arrays.

**Q: Why is heap allocation slower than stack allocation?**
The stack just moves a pointer. The heap allocator has to search for a free block of the right size and keep records about it.

## Practice

1. **Easy:** Allocate one `int` on the heap, store 42 in it, print it and free it.
2. **Medium:** Read `n` and allocate an array of `n` doubles. Fill it with `i * 0.5`, print the sum and free it.
3. **Hard:** Write `char *repeat(char c, int n)` that returns a heap string of `n` copies of `c`. Print `repeat('*', 10)` and free it.

## Solutions

**1.**

```c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *p = malloc(sizeof *p);
    if (p == NULL) return 1;
    *p = 42;
    printf("%d\n", *p);
    free(p);
    return 0;
}
```

**2.**

```c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1 || n <= 0) return 1;
    double *v = malloc(n * sizeof *v);
    if (v == NULL) return 1;
    double sum = 0;
    for (int i = 0; i < n; i++) {
        v[i] = i * 0.5;
        sum += v[i];
    }
    printf("%.1f\n", sum);
    free(v);
    return 0;
}
```

**3.**

```c
#include <stdio.h>
#include <stdlib.h>

char *repeat(char c, int n) {
    char *s = malloc(n + 1);       /* +1 for the '\0' */
    if (s == NULL) return NULL;
    for (int i = 0; i < n; i++) s[i] = c;
    s[n] = '\0';
    return s;
}

int main(void) {
    char *stars = repeat('*', 10);
    if (stars == NULL) return 1;
    printf("%s\n", stars);
    free(stars);
    return 0;
}
```

<!-- lesson: malloc-free -->
Four functions from `<stdlib.h>` manage heap memory: `malloc`, `calloc`, `realloc` and `free`. This lesson covers the first, second and last; `realloc` gets its own lesson next.

**Real-life analogy:** `malloc` rents an empty room (whatever was left inside is still there). `calloc` rents a room that's been cleaned to zero. `free` hands the key back. Using the room after returning the key is trespassing.

## The functions

| Function | What you get | On failure |
| --- | --- | --- |
| `malloc(bytes)` | uninitialised memory | `NULL` |
| `calloc(count, size)` | memory set to all zeros; overflow-checked | `NULL` |
| `free(ptr)` | releases memory; `free(NULL)` does nothing | — |

## Example 1: malloc an array

```c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n = 5;
    int *a = malloc(n * sizeof *a);
    if (a == NULL) {
        fprintf(stderr, "Out of memory\n");
        return 1;
    }
    for (int i = 0; i < n; i++) a[i] = i * i;
    for (int i = 0; i < n; i++) printf("%d ", a[i]);
    printf("\n");

    free(a);
    a = NULL;     /* so any accidental later use fails loudly */
    return 0;
}
```

Output:

```
0 1 4 9 16
```

Write `sizeof *a` rather than `sizeof(int)`: if you later change `a` to `long *`, the size stays correct automatically.

## Example 2: calloc starts at zero

```c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *votes = calloc(4, sizeof *votes);   /* 4 candidates, all start at 0 */
    if (votes == NULL) return 1;

    int ballots[] = {2, 0, 2, 3, 2, 1, 0};
    for (int i = 0; i < 7; i++) votes[ballots[i]]++;

    for (int c = 0; c < 4; c++) printf("candidate %d: %d\n", c, votes[c]);
    free(votes);
    return 0;
}
```

Output:

```
candidate 0: 2
candidate 1: 1
candidate 2: 3
candidate 3: 1
```

## Example 3: a heap copy of a string

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *copy_string(const char *src) {
    size_t len = strlen(src);
    char *dst = malloc(len + 1);       /* +1 for '\0' */
    if (dst == NULL) return NULL;
    memcpy(dst, src, len + 1);
    return dst;
}

int main(void) {
    char *name = copy_string("Kavya");
    if (name == NULL) return 1;
    name[0] = 'k';
    printf("%s\n", name);
    free(name);
    return 0;
}
```

Output:

```
kavya
```

## Rules to live by

1. Check every allocation for `NULL`.
2. Every `malloc`/`calloc` needs exactly one `free`.
3. Set pointers to `NULL` after freeing.
4. Never use memory after freeing it, and never free it twice.

## Common mistakes

- **`malloc(n)` instead of `malloc(n * sizeof *p)`:** allocates bytes, not elements.
- **Forgetting the `+1`** for a string's `'\0'`.
- **Double free:** calling `free` twice on the same pointer corrupts the heap.
- **Use after free:** reading or writing memory after `free`.

## Key points

- `malloc` gives raw memory, `calloc` gives zeroed memory.
- Always check for `NULL` and always `free`.
- Use `sizeof *ptr` to size allocations.

## Interview corner

**Q: What's the difference between `malloc` and `calloc`?**
`calloc` takes a count and a size, zeroes the memory, and checks the multiplication for overflow. `malloc` takes a byte count and leaves the memory uninitialised.

**Q: What happens if you `free` a pointer twice?**
Undefined behaviour: it can corrupt the allocator's records, crash, or open security holes. Setting the pointer to `NULL` after freeing prevents it, because `free(NULL)` is safe.

## Practice

1. **Easy:** Use `calloc` to make an array of 10 ints and print them to show they start at 0.
2. **Medium:** Read `n` numbers into a heap array and print them sorted in ascending order.
3. **Hard:** Write `int *merge(const int *a, int na, const int *b, int nb)` that returns a new heap array containing both arrays one after the other.

## Solutions

**1.**

```c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *a = calloc(10, sizeof *a);
    if (a == NULL) return 1;
    for (int i = 0; i < 10; i++) printf("%d ", a[i]);
    printf("\n");
    free(a);
    return 0;
}
```

**2.**

```c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1 || n <= 0) return 1;
    int *a = malloc(n * sizeof *a);
    if (a == NULL) return 1;
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);

    for (int i = 0; i < n - 1; i++)           /* simple bubble sort */
        for (int j = 0; j < n - 1 - i; j++)
            if (a[j] > a[j + 1]) {
                int t = a[j];
                a[j] = a[j + 1];
                a[j + 1] = t;
            }

    for (int i = 0; i < n; i++) printf("%d ", a[i]);
    printf("\n");
    free(a);
    return 0;
}
```

**3.**

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int *merge(const int *a, int na, const int *b, int nb) {
    int *out = malloc((na + nb) * sizeof *out);
    if (out == NULL) return NULL;
    memcpy(out, a, na * sizeof *a);
    memcpy(out + na, b, nb * sizeof *b);
    return out;
}

int main(void) {
    int x[] = {1, 2, 3}, y[] = {7, 8};
    int *m = merge(x, 3, y, 2);
    if (m == NULL) return 1;
    for (int i = 0; i < 5; i++) printf("%d ", m[i]);   /* 1 2 3 7 8 */
    printf("\n");
    free(m);
    return 0;
}
```

<!-- lesson: realloc -->
Sometimes you don't know in advance how much data is coming: lines in a file, numbers typed by the user. `realloc` resizes a heap block, so your array can grow as data arrives.

**Real-life analogy:** you rented a 2-room office and your team grew. `realloc` either knocks down a wall into the empty room next door, or moves you to a bigger office and carries your furniture across. Either way, use the new address afterwards.

## How realloc works

```c
void *realloc(void *ptr, size_t new_size);
```

- Returns a pointer to a block of `new_size` bytes containing the old data.
- The block may have **moved**, so use the returned pointer.
- On failure it returns `NULL` and the **old block is untouched and still yours**.
- `realloc(NULL, n)` behaves like `malloc(n)`.

## Example 1: the safe pattern

```c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *a = malloc(3 * sizeof *a);
    if (a == NULL) return 1;
    for (int i = 0; i < 3; i++) a[i] = i + 1;

    int *tmp = realloc(a, 6 * sizeof *a);   /* never assign straight back to a */
    if (tmp == NULL) {
        free(a);                            /* old block is still valid: clean up */
        return 1;
    }
    a = tmp;
    for (int i = 3; i < 6; i++) a[i] = (i + 1) * 10;

    for (int i = 0; i < 6; i++) printf("%d ", a[i]);
    printf("\n");
    free(a);
    return 0;
}
```

Output:

```
1 2 3 40 50 60
```

Writing `a = realloc(a, ...)` is a classic leak: if realloc fails, `a` becomes `NULL` and you've lost your only pointer to the old block.

## Example 2: a growing array

Doubling the capacity each time it fills up keeps the average cost of adding an item small:

```c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *items = NULL;
    size_t len = 0, cap = 0;
    int samples[] = {5, 8, 13, 21, 34, 55, 89};

    for (int k = 0; k < 7; k++) {
        if (len == cap) {
            size_t new_cap = cap ? cap * 2 : 2;
            int *tmp = realloc(items, new_cap * sizeof *tmp);
            if (tmp == NULL) {
                free(items);
                return 1;
            }
            items = tmp;
            cap = new_cap;
            printf("grew to capacity %zu\n", cap);
        }
        items[len++] = samples[k];
    }
    printf("stored %zu items, last = %d\n", len, items[len - 1]);
    free(items);
    return 0;
}
```

Output:

```
grew to capacity 2
grew to capacity 4
grew to capacity 8
stored 7 items, last = 89
```

## Example 3: reading a line of any length

```c
#include <stdio.h>
#include <stdlib.h>

char *read_line(void) {
    size_t cap = 16, len = 0;
    char *buf = malloc(cap);
    if (buf == NULL) return NULL;
    int c;
    while ((c = getchar()) != EOF && c != '\n') {
        if (len + 1 == cap) {
            char *tmp = realloc(buf, cap * 2);
            if (tmp == NULL) { free(buf); return NULL; }
            buf = tmp;
            cap *= 2;
        }
        buf[len++] = (char)c;
    }
    buf[len] = '\0';
    return buf;
}

int main(void) {
    char *line = read_line();
    if (line == NULL) return 1;
    printf("You typed: %s\n", line);
    free(line);
    return 0;
}
```

No matter how long the line is, it fits.

## Common mistakes

- **`p = realloc(p, n)`:** leaks on failure. Use a temporary pointer.
- **Keeping old pointers into the block:** after realloc moves it, they dangle.
- **Growing by 1 each time:** works, but becomes very slow for large data. Double instead.

## Key points

- `realloc` may move the block; always use its return value.
- Assign to a temporary first and check for `NULL`.
- Double the capacity when growing.

## Interview corner

**Q: What does `realloc` return if it fails, and what happens to the original memory?**
It returns `NULL` and leaves the original block unchanged and still allocated. You must still free it.

**Q: Why double the capacity instead of adding a fixed amount?**
Doubling means each element is copied only a constant number of times on average, so adding items is O(1) amortised. Growing by a fixed amount makes it O(n) per item over time.

## Practice

1. **Easy:** Allocate 2 ints, then grow to 4 with realloc, fill all 4 and print them.
2. **Medium:** Keep reading integers until the user enters 0, storing them in a growing array. Print how many were read and their sum.
3. **Hard:** Build a `Stack` struct with `data`, `len` and `cap`, and functions `push`, `pop` and `stack_free`. Push 1 to 10 and pop them all.

## Solutions

**1.**

```c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *a = malloc(2 * sizeof *a);
    if (a == NULL) return 1;
    int *tmp = realloc(a, 4 * sizeof *a);
    if (tmp == NULL) { free(a); return 1; }
    a = tmp;
    for (int i = 0; i < 4; i++) a[i] = (i + 1) * 100;
    for (int i = 0; i < 4; i++) printf("%d ", a[i]);
    printf("\n");
    free(a);
    return 0;
}
```

**2.**

```c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *v = NULL, x;
    size_t len = 0, cap = 0;
    long long sum = 0;
    while (scanf("%d", &x) == 1 && x != 0) {
        if (len == cap) {
            size_t nc = cap ? cap * 2 : 4;
            int *tmp = realloc(v, nc * sizeof *tmp);
            if (tmp == NULL) { free(v); return 1; }
            v = tmp;
            cap = nc;
        }
        v[len++] = x;
        sum += x;
    }
    printf("read %zu numbers, sum %lld\n", len, sum);
    free(v);
    return 0;
}
```

**3.**

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int *data;
    size_t len, cap;
} Stack;

int push(Stack *s, int x) {
    if (s->len == s->cap) {
        size_t nc = s->cap ? s->cap * 2 : 4;
        int *tmp = realloc(s->data, nc * sizeof *tmp);
        if (tmp == NULL) return 0;
        s->data = tmp;
        s->cap = nc;
    }
    s->data[s->len++] = x;
    return 1;
}

int pop(Stack *s, int *out) {
    if (s->len == 0) return 0;
    *out = s->data[--s->len];
    return 1;
}

void stack_free(Stack *s) {
    free(s->data);
    s->data = NULL;
    s->len = s->cap = 0;
}

int main(void) {
    Stack s = {NULL, 0, 0};
    for (int i = 1; i <= 10; i++) push(&s, i);
    int x;
    while (pop(&s, &x)) printf("%d ", x);   /* 10 9 ... 1 */
    printf("\n");
    stack_free(&s);
    return 0;
}
```

<!-- lesson: leaks -->
Two bugs cause most problems with heap memory: **memory leaks**, where you forget to give memory back, and **dangling pointers**, where you keep using memory you already gave back. Both are easy to write and hard to spot without the right tools.

**Real-life analogy:** a leak is renting hotel rooms and never checking out: eventually the hotel is full. A dangling pointer is keeping your old room key after checkout and walking in on the next guest.

## Memory leaks

A leak happens when the last pointer to a heap block is lost before `free`:

```c
#include <stdio.h>
#include <stdlib.h>

int process(int fail) {
    char *buf = malloc(1024);
    if (buf == NULL) return -1;
    if (fail) {
        free(buf);       /* without this line, every failure leaks 1 KB */
        return -1;
    }
    snprintf(buf, 1024, "working");
    printf("%s\n", buf);
    free(buf);
    return 0;
}

int main(void) {
    process(0);
    process(1);
    return 0;
}
```

Output:

```
working
```

One small leak is harmless in a short program, but a leak inside a loop or a server that runs for weeks eventually uses up all memory.

## Dangling pointers

```c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *p = malloc(sizeof *p);
    if (p == NULL) return 1;
    *p = 5;
    free(p);
    /* *p = 10;   use after free: undefined behaviour */
    p = NULL;     /* now any mistaken use crashes immediately and obviously */
    printf("safe\n");
    return 0;
}
```

## One clean exit: the goto cleanup pattern

When a function allocates several things, free them all in one place:

```c
#include <stdio.h>
#include <stdlib.h>

int run(void) {
    int status = -1;
    int *a = NULL, *b = NULL;

    a = malloc(100 * sizeof *a);
    if (a == NULL) goto cleanup;
    b = malloc(100 * sizeof *b);
    if (b == NULL) goto cleanup;

    a[0] = 1;
    b[0] = 2;
    printf("sum %d\n", a[0] + b[0]);
    status = 0;

cleanup:
    free(b);    /* free(NULL) is safe, so this works on every path */
    free(a);
    return status;
}

int main(void) {
    return run() == 0 ? 0 : 1;
}
```

Output:

```
sum 3
```

## Finding bugs with tools

**AddressSanitizer** is built into gcc and clang. Compile with it and run normally:

```bash
gcc -g -fsanitize=address main.c -o main
./main
```

It reports leaks, use-after-free and buffer overflows with the exact file and line. On Linux, **Valgrind** does a similar job:

```bash
valgrind --leak-check=full ./main
```

## Common mistakes

- **Returning early** without freeing what was allocated.
- **Overwriting the only pointer:** `p = malloc(10); p = malloc(20);` leaks the first block.
- **Freeing memory that's still in use** elsewhere in the program.
- **Double free** of the same pointer.

## Key points

- Every allocation needs exactly one matching `free` on every path.
- Set pointers to `NULL` after freeing.
- Give each allocation a clear owner.
- Test with `-fsanitize=address`.

## Interview corner

**Q: What is a memory leak, and how do you find one?**
Heap memory that's no longer reachable but was never freed. Tools like AddressSanitizer and Valgrind report leaks and where the memory was allocated.

**Q: What is the difference between a dangling pointer and a NULL pointer?**
A NULL pointer deliberately points nowhere and can be checked. A dangling pointer still holds an old address that's no longer valid, and there's no way to tell by looking at it.

## Practice

1. **Easy:** Find and fix the leak: `int *p = malloc(4); p = malloc(8); free(p);`
2. **Medium:** Write a function that allocates two arrays and returns early if the second allocation fails, without leaking the first.
3. **Hard:** Write `void free_words(char **words, int n)` that frees an array of `n` heap strings and the array itself. Build such an array with 3 words and free it.

## Solutions

**1.** The first block is lost when `p` is overwritten. Free it before reusing `p`:

```c
#include <stdlib.h>

int main(void) {
    int *p = malloc(4);
    free(p);
    p = malloc(8);
    free(p);
    return 0;
}
```

**2.**

```c
#include <stdio.h>
#include <stdlib.h>

int make_two(size_t n) {
    int *a = malloc(n * sizeof *a);
    if (a == NULL) return -1;
    int *b = malloc(n * sizeof *b);
    if (b == NULL) {
        free(a);          /* don't leak the first one */
        return -1;
    }
    free(b);
    free(a);
    return 0;
}

int main(void) {
    printf("%d\n", make_two(100));
    return 0;
}
```

**3.**

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void free_words(char **words, int n) {
    for (int i = 0; i < n; i++) free(words[i]);
    free(words);
}

int main(void) {
    const char *src[] = {"stack", "heap", "pointer"};
    char **words = malloc(3 * sizeof *words);
    if (words == NULL) return 1;
    for (int i = 0; i < 3; i++) {
        words[i] = malloc(strlen(src[i]) + 1);
        if (words[i] == NULL) { free_words(words, i); return 1; }
        strcpy(words[i], src[i]);
    }
    for (int i = 0; i < 3; i++) printf("%s\n", words[i]);
    free_words(words, 3);
    return 0;
}
```

<!-- lesson: linked-list -->
A **linked list** is a chain of nodes on the heap. Each node holds a value and a pointer to the next node. Unlike an array, a linked list can grow one item at a time, and you can insert at the front without moving anything.

**Real-life analogy:** a treasure hunt. Each clue (node) holds a prize (the value) and directions to the next clue (the `next` pointer). The last clue says "the end" (`NULL`). To reach the fifth clue, you must follow the first four.

## Building blocks

```c
typedef struct Node {
    int value;
    struct Node *next;
} Node;
```

The list itself is just a pointer to the first node, called the **head**. An empty list is `head == NULL`.

## Example 1: push, print, free

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int value;
    struct Node *next;
} Node;

Node *push_front(Node *head, int value) {
    Node *n = malloc(sizeof *n);
    if (n == NULL) return head;
    n->value = value;
    n->next = head;        /* new node points at the old first node */
    return n;              /* new node becomes the head */
}

void print_list(const Node *head) {
    for (const Node *p = head; p != NULL; p = p->next) printf("%d -> ", p->value);
    printf("NULL\n");
}

void free_list(Node *head) {
    while (head != NULL) {
        Node *next = head->next;   /* save it before freeing */
        free(head);
        head = next;
    }
}

int main(void) {
    Node *list = NULL;
    for (int i = 1; i <= 4; i++) list = push_front(list, i * 10);
    print_list(list);
    free_list(list);
    return 0;
}
```

Output:

```
40 -> 30 -> 20 -> 10 -> NULL
```

## Example 2: append at the end and delete a value

Functions that may change the head take a **pointer to the head pointer** (`Node **`):

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int value;
    struct Node *next;
} Node;

void push_back(Node **head, int value) {
    Node *n = malloc(sizeof *n);
    if (n == NULL) return;
    n->value = value;
    n->next = NULL;
    Node **p = head;
    while (*p != NULL) p = &(*p)->next;   /* walk to the last next pointer */
    *p = n;
}

void delete_value(Node **head, int value) {
    for (Node **p = head; *p != NULL; p = &(*p)->next) {
        if ((*p)->value == value) {
            Node *dead = *p;
            *p = dead->next;              /* unlink it */
            free(dead);
            return;
        }
    }
}

int main(void) {
    Node *list = NULL;
    for (int i = 1; i <= 5; i++) push_back(&list, i);
    delete_value(&list, 3);
    delete_value(&list, 1);
    for (Node *p = list; p != NULL; p = p->next) printf("%d ", p->value);
    printf("\n");
    while (list) { Node *n = list->next; free(list); list = n; }
    return 0;
}
```

Output:

```
2 4 5
```

## Arrays versus linked lists

| | Array | Linked list |
| --- | --- | --- |
| Access the i-th item | instant | walk i nodes |
| Insert or delete at the front | shift everything | instant |
| Memory | compact, cache-friendly | extra pointer per node, scattered |
| Size | fixed, or realloc to grow | grows one node at a time |

## Common mistakes

- **Freeing a node, then reading `node->next`.** Save `next` first.
- **Losing the head:** walking with the head pointer itself (`head = head->next`) and then losing the start of the list.
- **Not handling the empty list** (`head == NULL`) or a one-element list.
- **Forgetting `Node **`** when a function needs to change the head.

## Key points

- A list is a head pointer plus nodes linked by `next`.
- The last node's `next` is `NULL`.
- Pass `Node **` to functions that may change the head.
- Free every node, saving `next` before each `free`.

## Interview corner

**Q: How do you reverse a singly linked list?**
Walk the list with three pointers, `prev`, `curr` and `next`. For each node, save `next`, point `curr->next` at `prev`, then move `prev` and `curr` forward. At the end, `prev` is the new head. It's O(n) time and O(1) extra space.

**Q: How do you detect a cycle in a linked list?**
Floyd's algorithm: move one pointer one step at a time and another two steps at a time. If they ever meet, there's a cycle.

## Practice

1. **Easy:** Write `int length(const Node *head)` that counts the nodes.
2. **Medium:** Write `Node *reverse(Node *head)` and test it on 1 → 2 → 3.
3. **Hard:** Write `int middle(const Node *head)` that returns the middle node's value in one pass, using a slow and a fast pointer.

## Solutions

**1.**

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct Node { int value; struct Node *next; } Node;

int length(const Node *head) {
    int n = 0;
    for (; head != NULL; head = head->next) n++;
    return n;
}

int main(void) {
    Node c = {3, NULL}, b = {2, &c}, a = {1, &b};
    printf("%d\n", length(&a));   /* 3 */
    return 0;
}
```

**2.**

```c
#include <stdio.h>

typedef struct Node { int value; struct Node *next; } Node;

Node *reverse(Node *head) {
    Node *prev = NULL, *curr = head;
    while (curr != NULL) {
        Node *next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}

int main(void) {
    Node c = {3, NULL}, b = {2, &c}, a = {1, &b};
    for (Node *p = reverse(&a); p != NULL; p = p->next) printf("%d ", p->value);
    printf("\n");   /* 3 2 1 */
    return 0;
}
```

**3.** When the fast pointer reaches the end, the slow one is in the middle.

```c
#include <stdio.h>

typedef struct Node { int value; struct Node *next; } Node;

int middle(const Node *head) {
    const Node *slow = head, *fast = head;
    while (fast != NULL && fast->next != NULL) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow->value;
}

int main(void) {
    Node e = {5, NULL}, d = {4, &e}, c = {3, &d}, b = {2, &c}, a = {1, &b};
    printf("%d\n", middle(&a));   /* 3 */
    return 0;
}
```
