---
title: Library Desk
difficulty: medium
topic: Arrays of Structures
xp: 30
plan: free
---
A library has `n` books, each with an id, a title and an availability flag. Process requests:

- `B id`: borrow. Print `Borrowed title`, or `Already borrowed` if it's out.
- `R id`: return. Print `Returned title`, or `Not borrowed` if it's already in.

Unknown ids print `No such book`. Finally, print how many books are on the shelf.

**Input:** `n`, then `n` lines of `id title`; `q`, then `q` requests.

**Output:** one line per request, then `Available: k`.

**Constraints:** 1 ≤ n, q ≤ 1000, ids are distinct positive integers.

## Hints

1. `struct Book { int id; char title[51]; int available; };` All books start available.
2. Write `struct Book *find(int id)` that returns a pointer to the book or `NULL`, then update through that pointer.

```c starter
#include <stdio.h>

struct Book { int id; char title[51]; int available; };

struct Book books[1000];
int n;

int main(void) {
    int q;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) { scanf("%d %50s", &books[i].id, books[i].title); books[i].available = 1; }
    scanf("%d", &q);
    /* process requests */
    return 0;
}
```

```c solution
#include <stdio.h>

struct Book { int id; char title[51]; int available; };

struct Book books[1000];
int n;

static struct Book *find(int id) {
    for (int i = 0; i < n; i++) if (books[i].id == id) return &books[i];
    return NULL;
}

int main(void) {
    int q;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) { if (scanf("%d %50s", &books[i].id, books[i].title) != 2) return 1; books[i].available = 1; }
    if (scanf("%d", &q) != 1) return 1;
    while (q--) {
        char op;
        int id;
        if (scanf(" %c %d", &op, &id) != 2) return 1;
        struct Book *b = find(id);
        if (!b) printf("No such book\n");
        else if (op == 'B') {
            if (b->available) { b->available = 0; printf("Borrowed %s\n", b->title); }
            else printf("Already borrowed\n");
        } else {
            if (!b->available) { b->available = 1; printf("Returned %s\n", b->title); }
            else printf("Not borrowed\n");
        }
    }
    int k = 0;
    for (int i = 0; i < n; i++) k += books[i].available;
    printf("Available: %d\n", k);
    return 0;
}
```

```test sample
3
101 Dune
102 Emma
103 Ulysses
5
B 101
B 101
R 102
R 101
B 999
---
Borrowed Dune
Already borrowed
Not borrowed
Returned Dune
No such book
Available: 3
```

```test hidden
1
7 Solo
2
B 7
B 7
---
Borrowed Solo
Already borrowed
Available: 0
```

```test hidden
2
1 A
2 B
3
B 1
B 2
R 2
---
Borrowed A
Borrowed B
Returned B
Available: 1
```
