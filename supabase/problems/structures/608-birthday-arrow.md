---
title: Happy Birthday, Arrow Operator
difficulty: easy
topic: Pointers to Structures
xp: 15
plan: free
---
Write `void birthday(struct Person *p)` that adds one year to a person's age **through a pointer**. Inside, use the arrow operator: `p->age` is shorthand for `(*p).age`. `main` applies it `k` times.

**Input:** a name, an age and `k`.

**Output:** `name is now age`.

**Constraints:** 0 ≤ age ≤ 150, 0 ≤ k ≤ 100

## Hints

1. Passing `&person` lets the function change the caller's structure; passing the structure by value would only change a copy.
2. `p->age++;` is all the function needs.

```c starter
#include <stdio.h>

struct Person { char name[31]; int age; };

void birthday(struct Person *p) {
}

int main(void) {
    struct Person x;
    int k;
    scanf("%30s %d %d", x.name, &x.age, &k);
    while (k--) birthday(&x);
    printf("%s is now %d\n", x.name, x.age);
    return 0;
}
```

```c solution
#include <stdio.h>

struct Person { char name[31]; int age; };

void birthday(struct Person *p) {
    p->age++;
}

int main(void) {
    struct Person x;
    int k;
    if (scanf("%30s %d %d", x.name, &x.age, &k) != 3) return 1;
    while (k--) birthday(&x);
    printf("%s is now %d\n", x.name, x.age);
    return 0;
}
```

```test sample
Maya 29 1
---
Maya is now 30
```

```test hidden
Leo 0 0
---
Leo is now 0
```

```test hidden
Ann 50 100
---
Ann is now 150
```
