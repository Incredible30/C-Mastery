---
title: Bookshelf Total
difficulty: easy
topic: Arrays of Structures
xp: 20
plan: free
---
Store `n` books, each with a title and a price, in an array of structures. Print the total price of all books and the title of the most expensive one (the first if tied).

**Input:** `n`, then `n` lines of `title price`.

**Output:** the total with 2 decimals, then the most expensive title.

**Constraints:** 1 ≤ n ≤ 1000, 0 ≤ price ≤ 10000, titles are single words.

## Hints

1. `struct Book { char title[51]; double price; };`
2. One loop can both add to the total and track the index of the most expensive book.

```c starter
#include <stdio.h>

struct Book { char title[51]; double price; };

struct Book b[1000];

int main(void) {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%50s %lf", b[i].title, &b[i].price);
    /* total and most expensive */
    return 0;
}
```

```c solution
#include <stdio.h>

struct Book { char title[51]; double price; };

struct Book b[1000];

int main(void) {
    int n, top = 0;
    double total = 0;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) if (scanf("%50s %lf", b[i].title, &b[i].price) != 2) return 1;
    for (int i = 0; i < n; i++) {
        total += b[i].price;
        if (b[i].price > b[top].price) top = i;
    }
    printf("%.2f\n%s\n", total, b[top].title);
    return 0;
}
```

```test sample
3
CPrimer 450.50
KandR 299
Algorithms 999.99
---
1749.49
Algorithms
```

```test hidden
1
Free 0
---
0.00
Free
```

```test hidden
2
Same 10
Twin 10
---
20.00
Same
```
