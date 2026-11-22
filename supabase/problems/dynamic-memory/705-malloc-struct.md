---
title: A Structure on the Heap
difficulty: easy
topic: malloc & free
xp: 15
plan: free
---
Allocate a single `struct Person` with `malloc`, fill it through the pointer with `->`, print it, and free it. Heap-allocated structures can outlive the function that created them, which is how linked lists and trees work.

**Input:** a name and an age.

**Output:** `name is age years old`.

**Constraints:** name up to 30 characters, 0 ≤ age ≤ 150

## Hints

1. `struct Person *p = malloc(sizeof *p);`. Writing `sizeof *p` instead of the type name keeps it correct if the type ever changes.
2. Read with `scanf("%30s %d", p->name, &p->age);`

```c starter
#include <stdio.h>
#include <stdlib.h>

struct Person { char name[31]; int age; };

int main(void) {
    /* malloc one Person, read, print, free */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>

struct Person { char name[31]; int age; };

static struct Person *new_person(void) {
    struct Person *p = malloc(sizeof *p);
    if (p && scanf("%30s %d", p->name, &p->age) != 2) { free(p); return NULL; }
    return p;
}

int main(void) {
    struct Person *p = new_person();
    if (!p) return 1;
    printf("%s is %d years old\n", p->name, p->age);
    free(p);
    return 0;
}
```

```test sample
Nila 24
---
Nila is 24 years old
```

```test hidden
Baby 0
---
Baby is 0 years old
```

```test hidden
Elder 150
---
Elder is 150 years old
```
