<!-- lesson: structs -->
A `struct` groups related values of different types into one record.

```c
#include <stdio.h>

struct Student {
    char name[20];
    int roll;
    float cgpa;
};

int main(void) {
    struct Student s = {"Priya", 101, 9.1f};
    printf("%s (%d): %.1f\n", s.name, s.roll, s.cgpa);

    s.cgpa = 9.3f;          // access members with .
    return 0;
}
```

## typedef for shorter names

```c
typedef struct {
    char name[20];
    int roll;
    float cgpa;
} Student;

Student s = {.name = "Rohan", .roll = 102, .cgpa = 8.4f};
```

The `.name =` form, called designated initialisers, makes the code clear and order-independent.

## Copying

Assigning one struct to another copies every member, including arrays inside it:

```c
Student t = s;   // full copy
```

You cannot compare structs with `==`. Compare the members you care about.

## Arrays of structs

```c
Student batch[3] = {
    {"Priya", 101, 9.1f}, {"Rohan", 102, 8.4f}, {"Meera", 103, 8.9f}
};
for (int i = 0; i < 3; i++) printf("%s\n", batch[i].name);
```

## Try it

Store 5 students in an array and print the name of the topper.

<!-- lesson: struct-pointers -->
Large structs are usually passed by pointer, to avoid copying and to let functions change them.

```c
typedef struct {
    char name[20];
    int balance;
} Account;

void deposit(Account *a, int amount) {
    a->balance += amount;    // same as (*a).balance
}

Account acc = {"Arjun", 1000};
deposit(&acc, 500);          // acc.balance is 1500
```

## . versus ->

- `s.member` when you have the struct itself.
- `p->member` when you have a pointer to it. `p->x` is shorthand for `(*p).x`.

## Read-only access

Use `const` when the function only reads:

```c
void print_account(const Account *a) {
    printf("%s: %d\n", a->name, a->balance);
}
```

## Self-referential structs

A struct can contain a pointer to its own type. This is the building block of linked lists and trees:

```c
typedef struct Node {
    int value;
    struct Node *next;
} Node;
```

Note that the tag name `Node` must be used inside, because the typedef isn't complete yet.

## Try it

Write `void raise_cgpa(Student *s, float by)` that increases a student's CGPA but never above 10.0.

<!-- lesson: unions-enums -->
## enum: named integer constants

```c
enum Weekday { MON, TUE, WED, THU, FRI, SAT, SUN };   // 0..6

enum Weekday today = WED;
if (today == SAT || today == SUN) printf("Weekend\n");
```

You can set values explicitly: `enum Status { OK = 200, NOT_FOUND = 404 };`. Enums make `switch` statements readable and self-documenting.

## union: one memory, several types

All members of a union share the same memory. Its size is the size of its largest member, and only one member is valid at a time.

```c
union Value {
    int i;
    float f;
    char text[8];
};

union Value v;
v.i = 42;      // now v.f and v.text hold meaningless bytes
```

## Tagged unions

Pair a union with an enum that says which member is in use:

```c
typedef enum { INT, FLOAT } Kind;
typedef struct {
    Kind kind;
    union { int i; float f; } as;
} Number;

Number n = { .kind = FLOAT, .as.f = 3.5f };
if (n.kind == FLOAT) printf("%.1f\n", n.as.f);
```

## typedef

`typedef` gives a type a new name: `typedef unsigned long long u64;`. Use it to make code clearer, not to hide pointers.

## Try it

Make an `enum TrafficLight` and a function that returns the next light in the cycle.

<!-- lesson: padding -->
The compiler may add unused bytes, called **padding**, between struct members so each member sits at an address its type prefers. This makes memory access faster.

```c
struct A {
    char c;    // 1 byte + 3 padding
    int x;     // 4 bytes
    char d;    // 1 byte + 3 padding
};             // usually 12 bytes

struct B {
    int x;     // 4 bytes
    char c;    // 1 byte
    char d;    // 1 byte + 2 padding
};             // usually 8 bytes
```

Same members, different order, 4 bytes saved per struct. With a million records, that's 4 MB.

## See it yourself

```c
#include <stddef.h>
printf("%zu %zu\n", sizeof(struct A), sizeof(struct B));
printf("x is at offset %zu\n", offsetof(struct A, x));
```

## Rules of thumb

- Order members from largest to smallest to reduce padding.
- Never assume `sizeof(struct)` equals the sum of its members.
- Don't write structs directly to files or networks expecting the same layout everywhere. Padding and byte order differ between machines.

## Try it

Design a struct with a `double`, two `char`s and an `int`. Find the order that makes it smallest and print its size.
