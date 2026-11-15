<!-- lesson: stack-heap -->
A running C program uses two main areas of memory for data.

| | Stack | Heap |
| --- | --- | --- |
| Used for | local variables, function calls | memory you request at runtime |
| Managed by | the compiler, automatically | you, with malloc and free |
| Lifetime | until the function returns | until you call free |
| Size | small, often 1–8 MB | large, limited by system memory |
| Speed | very fast | slower to allocate |

## Stack in action

```c
void f(void) {
    int scores[100];   // on the stack, freed automatically when f returns
}
```

A huge local array like `int big[10000000];` can overflow the stack and crash.

## When you need the heap

- The size is only known at runtime, such as "read n, then store n numbers".
- The data must outlive the function that created it.
- The data is too big for the stack.

```c
int n;
scanf("%d", &n);
int *scores = malloc(n * sizeof *scores);   // on the heap
```

Every heap allocation must eventually be freed. The next lessons show how to do that safely.

## Try it

Explain why a function can safely return a pointer to heap memory but not a pointer to one of its local variables.

<!-- lesson: malloc-free -->
`<stdlib.h>` provides functions to request and release heap memory.

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

    free(a);
    a = NULL;
    return 0;
}
```

## The functions

- `malloc(bytes)` returns uninitialised memory, or `NULL` on failure.
- `calloc(count, size)` returns zeroed memory and checks `count × size` for overflow.
- `free(ptr)` gives memory back. `free(NULL)` is safe and does nothing.

## Good habits

- Write `sizeof *a` rather than `sizeof(int)`: it stays correct if the type changes.
- Always check for `NULL`.
- Set the pointer to `NULL` after `free`, so accidental reuse fails loudly.
- Every `malloc` needs exactly one `free`.

## Common bugs

- **Double free**: calling `free` twice on the same pointer corrupts the heap.
- **Use after free**: reading memory after freeing it is undefined behaviour.

## Try it

Read `n`, allocate an array of `n` doubles with `calloc`, fill it from input, print the average and free it.

<!-- lesson: realloc -->
`realloc` resizes a heap block. It's how you build arrays that grow as data arrives.

```c
int *grow(int *data, size_t new_cap) {
    int *tmp = realloc(data, new_cap * sizeof *tmp);
    if (tmp == NULL) {
        return NULL;    // data is still valid; the caller must free it
    }
    return tmp;
}
```

## The safe pattern

Never write `data = realloc(data, ...)`. If realloc fails it returns `NULL`, you lose your only pointer to the old block, and it leaks. Assign to a temporary first.

## A growing array

```c
int *items = NULL;
size_t len = 0, cap = 0;
int x;

while (scanf("%d", &x) == 1) {
    if (len == cap) {
        size_t new_cap = cap ? cap * 2 : 4;
        int *tmp = realloc(items, new_cap * sizeof *tmp);
        if (!tmp) { free(items); return 1; }
        items = tmp;
        cap = new_cap;
    }
    items[len++] = x;
}
free(items);
```

Doubling the capacity keeps the average cost of adding an item constant.

## Facts

- `realloc(NULL, n)` behaves like `malloc(n)`.
- realloc may move the block, so old pointers into it become invalid.

## Try it

Wrap the growing array in a struct with `data`, `len` and `cap`, and write `push`, `get` and `destroy` functions.

<!-- lesson: leaks -->
## Memory leaks

A leak happens when you lose the last pointer to heap memory without freeing it:

```c
void process(void) {
    char *buf = malloc(1024);
    if (something_failed) return;   // leak: buf never freed
    free(buf);
}
```

One leak is small. A leak inside a loop or a long-running server eats all the memory.

## Dangling pointers

A dangling pointer points to memory that has been freed or no longer exists:

```c
int *p = malloc(sizeof *p);
free(p);
*p = 5;          // use after free: undefined behaviour
```

## Prevention

- Free in the reverse order of allocation, at one clear exit point.
- Set pointers to `NULL` after freeing.
- Give every allocation a clear owner who is responsible for freeing it.

## Finding them with tools

Compile with AddressSanitizer:

```bash
gcc -g -fsanitize=address main.c -o main
./main
```

It reports leaks, use-after-free and buffer overflows with the exact line. On Linux, Valgrind does the same:

```bash
valgrind --leak-check=full ./main
```

## Try it

Write a program with a deliberate leak and a deliberate use-after-free. Run it with `-fsanitize=address` and read the report.

<!-- lesson: linked-list -->
A linked list is a chain of nodes on the heap, each pointing to the next. Unlike an array, it can grow one item at a time without moving existing items.

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int value;
    struct Node *next;
} Node;

Node *push_front(Node *head, int value) {
    Node *n = malloc(sizeof *n);
    if (!n) return head;
    n->value = value;
    n->next = head;
    return n;
}

void print_list(const Node *head) {
    for (const Node *p = head; p != NULL; p = p->next)
        printf("%d -> ", p->value);
    printf("NULL\n");
}

void free_list(Node *head) {
    while (head) {
        Node *next = head->next;   // save before freeing
        free(head);
        head = next;
    }
}

int main(void) {
    Node *list = NULL;
    for (int i = 1; i <= 3; i++) list = push_front(list, i);
    print_list(list);    // 3 -> 2 -> 1 -> NULL
    free_list(list);
    return 0;
}
```

## Arrays versus linked lists

| | Array | Linked list |
| --- | --- | --- |
| Access item i | instant | walk i nodes |
| Insert at front | shift everything | instant |
| Memory | compact | extra pointer per node |

## Try it

Add `Node *reverse(Node *head)` that reverses the list in place using three pointers: `prev`, `curr` and `next`.
