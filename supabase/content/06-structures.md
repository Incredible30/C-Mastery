<!-- lesson: structs -->
Real-world things have several properties of different types. A student has a name (text), a roll number (integer) and a CGPA (decimal). A `struct` bundles those related values into one new type.

**Real-life analogy:** a struct is like a form or an ID card. The card design (the struct definition) lists the fields. Each filled-in card (a struct variable) holds one person's details.

## Example 1: define and use a struct

```c
#include <stdio.h>

struct Student {
    char name[20];
    int roll;
    float cgpa;
};

int main(void) {
    struct Student s = {"Priya", 101, 9.1f};
    printf("%s (roll %d): CGPA %.1f\n", s.name, s.roll, s.cgpa);

    s.cgpa = 9.3f;              /* change one member with the dot operator */
    printf("Updated CGPA: %.1f\n", s.cgpa);
    return 0;
}
```

Output:

```
Priya (roll 101): CGPA 9.1
Updated CGPA: 9.3
```

New words:
- **Member** (or field): one value inside a struct, like `roll`.
- **Dot operator** `.`: accesses a member, as in `s.roll`.

## Example 2: typedef and designated initialisers

`typedef` gives the struct a short name, so you don't have to write `struct` every time. Designated initialisers name each field, so order doesn't matter and the code explains itself:

```c
#include <stdio.h>

typedef struct {
    char name[20];
    int roll;
    float cgpa;
} Student;

int main(void) {
    Student a = {.name = "Rohan", .roll = 102, .cgpa = 8.4f};
    Student b = a;           /* copies every member, including the name array */
    b.roll = 103;
    printf("%s %d / %s %d\n", a.name, a.roll, b.name, b.roll);
    return 0;
}
```

Output:

```
Rohan 102 / Rohan 103
```

Assigning one struct to another copies everything. But you can't compare structs with `==`; compare the members you care about.

## Example 3: an array of structs

```c
#include <stdio.h>

typedef struct {
    char name[20];
    int roll;
    float cgpa;
} Student;

int main(void) {
    Student batch[3] = {
        {"Priya", 101, 9.1f},
        {"Rohan", 102, 8.4f},
        {"Meera", 103, 8.9f}
    };

    int top = 0;
    for (int i = 1; i < 3; i++) {
        if (batch[i].cgpa > batch[top].cgpa) top = i;
    }
    for (int i = 0; i < 3; i++) {
        printf("%-6s %d %.1f\n", batch[i].name, batch[i].roll, batch[i].cgpa);
    }
    printf("Topper: %s\n", batch[top].name);
    return 0;
}
```

Output:

```
Priya  101 9.1
Rohan  102 8.4
Meera  103 8.9
Topper: Priya
```

## Common mistakes

- **Forgetting the semicolon** after the closing brace of a struct definition.
- **Assigning to a char array member:** `s.name = "Asha";` doesn't compile. Use `snprintf(s.name, sizeof s.name, "Asha");` or `strcpy`.
- **Comparing structs with `==`:** compare member by member.
- **Writing `struct Student`** when you defined it with an anonymous `typedef` (just use `Student`).

## Key points

- A struct groups related values of different types.
- Access members with `.`.
- `typedef` creates a short type name.
- Struct assignment copies every member.

## Interview corner

**Q: What is the difference between a struct and an array?**
An array holds many values of the same type, accessed by index. A struct holds values of possibly different types, accessed by member name.

**Q: Can a struct contain an array? Another struct?**
Yes to both. A struct can contain arrays, other structs, and pointers, including pointers to its own type.

## Practice

1. **Easy:** Define a `Book` struct with title, author and price. Create one book and print it.
2. **Medium:** Read 3 students (name and marks) into an array of structs and print the average marks.
3. **Hard:** Define a `Date` struct (day, month, year) and write `int is_earlier(Date a, Date b)` that returns 1 if `a` comes before `b`.

## Solutions

**1.**

```c
#include <stdio.h>

typedef struct {
    char title[50];
    char author[40];
    double price;
} Book;

int main(void) {
    Book b = {.title = "The C Programming Language", .author = "Kernighan & Ritchie", .price = 499.0};
    printf("%s by %s: Rs %.2f\n", b.title, b.author, b.price);
    return 0;
}
```

**2.**

```c
#include <stdio.h>

typedef struct {
    char name[20];
    int marks;
} Student;

int main(void) {
    Student s[3];
    int total = 0;
    for (int i = 0; i < 3; i++) {
        scanf("%19s %d", s[i].name, &s[i].marks);
        total += s[i].marks;
    }
    printf("Average: %.2f\n", total / 3.0);
    return 0;
}
```

**3.**

```c
#include <stdio.h>

typedef struct {
    int day, month, year;
} Date;

int is_earlier(Date a, Date b) {
    if (a.year != b.year) return a.year < b.year;
    if (a.month != b.month) return a.month < b.month;
    return a.day < b.day;
}

int main(void) {
    Date x = {15, 8, 1947}, y = {26, 1, 1950};
    printf("%d\n", is_earlier(x, y));   /* 1 */
    printf("%d\n", is_earlier(y, x));   /* 0 */
    return 0;
}
```

<!-- lesson: struct-pointers -->
Structs can be large. Passing one to a function copies the whole thing, which is slow and means the function can't change the original. So structs are usually passed **by pointer**, and C has a special operator for that: the arrow `->`.

**Real-life analogy:** instead of photocopying a thick student file for every teacher, you tell each teacher which cabinet drawer the file is in. They can read it, or update it, in place.

## Example 1: changing a struct through a pointer

```c
#include <stdio.h>

typedef struct {
    char owner[20];
    int balance;
} Account;

void deposit(Account *a, int amount) {
    a->balance += amount;      /* same as (*a).balance += amount */
}

int main(void) {
    Account acc = {"Arjun", 1000};
    deposit(&acc, 500);
    printf("%s: %d\n", acc.owner, acc.balance);
    return 0;
}
```

Output:

```
Arjun: 1500
```

## . versus ->

| You have | Write |
| --- | --- |
| the struct itself: `Account acc` | `acc.balance` |
| a pointer to it: `Account *p` | `p->balance` |

`p->balance` is shorthand for `(*p).balance`. The brackets are needed because `.` binds tighter than `*`.

## Example 2: read-only access with const

When a function only reads, mark the pointer `const`. The compiler then stops accidental changes:

```c
#include <stdio.h>

typedef struct {
    char owner[20];
    int balance;
} Account;

void print_account(const Account *a) {
    printf("%-8s Rs %6d\n", a->owner, a->balance);
    /* a->balance = 0;  would be a compile error */
}

int main(void) {
    Account all[2] = {{"Arjun", 1500}, {"Meera", 25000}};
    for (int i = 0; i < 2; i++) print_account(&all[i]);
    return 0;
}
```

Output:

```
Arjun    Rs   1500
Meera    Rs  25000
```

## Example 3: a struct that points to its own type

A struct can hold a pointer to another struct of the same type. This is the building block of linked lists and trees:

```c
#include <stdio.h>

typedef struct Node {
    int value;
    struct Node *next;     /* must use "struct Node" here: the typedef isn't finished yet */
} Node;

int main(void) {
    Node c = {30, NULL};
    Node b = {20, &c};
    Node a = {10, &b};

    for (Node *p = &a; p != NULL; p = p->next) {
        printf("%d -> ", p->value);
    }
    printf("NULL\n");
    return 0;
}
```

Output:

```
10 -> 20 -> 30 -> NULL
```

In Module 7 you'll create nodes on the heap so the list can grow while the program runs.

## Common mistakes

- **Using `.` on a pointer** (`p.balance`) or `->` on a struct (`acc->balance`): the compiler reports an error.
- **Writing `*p.balance`:** this means `*(p.balance)`. Use `p->balance` or `(*p).balance`.
- **Passing big structs by value** when a `const` pointer would do.
- **Using `Node` inside its own typedef** before the typedef is complete.

## Key points

- Pass structs by pointer to avoid copying and to allow changes.
- `p->member` is short for `(*p).member`.
- Use `const` pointers for read-only access.
- Self-referential structs build linked data structures.

## Interview corner

**Q: What is the difference between `.` and `->`?**
`.` accesses a member of a struct variable; `->` accesses a member through a pointer to a struct.

**Q: Why pass a struct by pointer instead of by value?**
It avoids copying the whole struct, which matters for large structs, and it lets the function modify the caller's struct.

## Practice

1. **Easy:** Write `void birthday(Person *p)` that adds 1 to a person's age.
2. **Medium:** Write `void withdraw(Account *a, int amount)` that refuses (prints a message) if the balance is too low.
3. **Hard:** Write `const Student *find_topper(const Student *arr, int n)` that returns a pointer to the student with the highest CGPA.

## Solutions

**1.**

```c
#include <stdio.h>

typedef struct {
    char name[20];
    int age;
} Person;

void birthday(Person *p) {
    p->age++;
}

int main(void) {
    Person me = {"Arjun", 19};
    birthday(&me);
    printf("%s is now %d\n", me.name, me.age);   /* 20 */
    return 0;
}
```

**2.**

```c
#include <stdio.h>

typedef struct {
    char owner[20];
    int balance;
} Account;

void withdraw(Account *a, int amount) {
    if (amount > a->balance) {
        printf("Insufficient balance for %s\n", a->owner);
        return;
    }
    a->balance -= amount;
}

int main(void) {
    Account acc = {"Arjun", 1000};
    withdraw(&acc, 300);
    withdraw(&acc, 5000);
    printf("Balance: %d\n", acc.balance);   /* 700 */
    return 0;
}
```

**3.**

```c
#include <stdio.h>

typedef struct {
    char name[20];
    float cgpa;
} Student;

const Student *find_topper(const Student *arr, int n) {
    const Student *best = &arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i].cgpa > best->cgpa) best = &arr[i];
    }
    return best;
}

int main(void) {
    Student s[3] = {{"Priya", 9.1f}, {"Rohan", 8.4f}, {"Meera", 9.4f}};
    printf("Topper: %s\n", find_topper(s, 3)->name);   /* Meera */
    return 0;
}
```

<!-- lesson: unions-enums -->
This lesson covers three tools that make code clearer and use memory well: `enum` for named choices, `union` for one-of-several values, and `typedef` for friendly type names.

**Real-life analogy:** an `enum` is a dropdown menu with fixed options. A `union` is a single parking spot that can hold a car **or** a bike **or** a scooter, but only one at a time.

## enum: named constants

```c
#include <stdio.h>

enum Weekday { MON, TUE, WED, THU, FRI, SAT, SUN };   /* 0 to 6 */

int main(void) {
    enum Weekday today = SAT;
    if (today == SAT || today == SUN) {
        printf("Weekend!\n");
    }
    printf("SAT is stored as %d\n", today);
    return 0;
}
```

Output:

```
Weekend!
SAT is stored as 5
```

Values start at 0 and go up by 1. You can set them yourself: `enum HttpStatus { OK = 200, NOT_FOUND = 404 };`. Enums make code self-explanatory: `if (status == NOT_FOUND)` beats `if (status == 404)`.

## Example 2: enums and switch

```c
#include <stdio.h>

typedef enum { RED, GREEN, YELLOW } Light;

Light next_light(Light l) {
    switch (l) {
        case RED:    return GREEN;
        case GREEN:  return YELLOW;
        case YELLOW: return RED;
    }
    return RED;
}

int main(void) {
    const char *names[] = {"RED", "GREEN", "YELLOW"};
    Light l = RED;
    for (int i = 0; i < 4; i++) {
        printf("%s ", names[l]);
        l = next_light(l);
    }
    printf("\n");
    return 0;
}
```

Output:

```
RED GREEN YELLOW RED
```

## union: shared memory

All members of a union share the same memory. Its size is that of its largest member, and only the member you last wrote is valid:

```c
#include <stdio.h>

union Value {
    int i;
    float f;
    char text[8];
};

int main(void) {
    union Value v;
    printf("size of union: %zu\n", sizeof v);   /* 8: the largest member */
    v.i = 42;
    printf("as int: %d\n", v.i);
    v.f = 3.5f;                                  /* overwrites the same bytes */
    printf("as float: %.1f\n", v.f);
    return 0;
}
```

Output:

```
size of union: 8
as int: 42
as float: 3.5
```

After writing `v.f`, reading `v.i` would give meaningless bytes.

## Example 4: tagged unions

To know which member is valid, pair the union with an enum "tag":

```c
#include <stdio.h>

typedef enum { INT_VAL, FLOAT_VAL } Kind;

typedef struct {
    Kind kind;
    union {
        int i;
        float f;
    } as;
} Number;

void print_number(Number n) {
    if (n.kind == INT_VAL) printf("int %d\n", n.as.i);
    else printf("float %.2f\n", n.as.f);
}

int main(void) {
    Number a = {.kind = INT_VAL, .as.i = 7};
    Number b = {.kind = FLOAT_VAL, .as.f = 2.75f};
    print_number(a);
    print_number(b);
    return 0;
}
```

Output:

```
int 7
float 2.75
```

## Common mistakes

- **Reading a union member you didn't write last.**
- **Assuming enums are type-safe:** C lets you assign any integer to an enum variable. Be disciplined.
- **Using `typedef` to hide pointers**, like `typedef int *IntPtr;`, which makes code harder to read.

## Key points

- `enum` gives names to integer constants.
- A `union`'s members share memory; only one is valid at a time.
- Tagged unions use an enum to track which member is valid.
- `typedef` creates readable type names.

## Interview corner

**Q: What is the size of a union?**
At least the size of its largest member, possibly a little more for alignment.

**Q: When would you use a union?**
When a value can be one of several types but never several at once, such as tokens in a compiler or messages in a network protocol, to save memory.

## Practice

1. **Easy:** Define `enum Month` with JAN = 1 to DEC = 12 and print the value of OCT.
2. **Medium:** Write `const char *season(enum Month m)` returning "Winter", "Summer", "Monsoon" or "Autumn" for Indian seasons (Dec–Feb, Mar–May, Jun–Sep, Oct–Nov).
3. **Hard:** Define a tagged union `Shape` that holds either a circle (radius) or a rectangle (width, height), and write `double area(Shape s)`.

## Solutions

**1.**

```c
#include <stdio.h>

enum Month { JAN = 1, FEB, MAR, APR, MAY, JUN, JUL, AUG, SEP, OCT, NOV, DEC };

int main(void) {
    printf("%d\n", OCT);   /* 10 */
    return 0;
}
```

**2.**

```c
#include <stdio.h>

enum Month { JAN = 1, FEB, MAR, APR, MAY, JUN, JUL, AUG, SEP, OCT, NOV, DEC };

const char *season(enum Month m) {
    if (m == DEC || m <= FEB) return "Winter";
    if (m <= MAY) return "Summer";
    if (m <= SEP) return "Monsoon";
    return "Autumn";
}

int main(void) {
    printf("%s %s %s\n", season(JAN), season(JUL), season(NOV));
    return 0;
}
```

**3.**

```c
#include <stdio.h>

typedef enum { CIRCLE, RECT } ShapeKind;

typedef struct {
    ShapeKind kind;
    union {
        struct { double r; } circle;
        struct { double w, h; } rect;
    } as;
} Shape;

double area(Shape s) {
    if (s.kind == CIRCLE) return 3.14159265 * s.as.circle.r * s.as.circle.r;
    return s.as.rect.w * s.as.rect.h;
}

int main(void) {
    Shape c = {.kind = CIRCLE, .as.circle.r = 2.0};
    Shape r = {.kind = RECT, .as.rect = {3.0, 4.0}};
    printf("%.2f %.2f\n", area(c), area(r));   /* 12.57 12.00 */
    return 0;
}
```

<!-- lesson: padding -->
You might expect a struct's size to be the sum of its members' sizes. Often it's bigger. The compiler inserts unused bytes called **padding** so each member starts at an address its type prefers. This is called **alignment**, and it makes memory access faster.

**Real-life analogy:** a bookshelf with fixed-width slots. A thin booklet still takes a whole slot, leaving a gap. Putting the big books together and the booklets together leaves fewer gaps.

## Example 1: same members, different sizes

```c
#include <stdio.h>

struct A {
    char c;    /* 1 byte, then 3 bytes padding so x starts on a multiple of 4 */
    int x;     /* 4 bytes */
    char d;    /* 1 byte, then 3 bytes padding to round the size up */
};

struct B {
    int x;     /* 4 bytes */
    char c;    /* 1 byte */
    char d;    /* 1 byte, then 2 bytes padding */
};

int main(void) {
    printf("A: %zu bytes\n", sizeof(struct A));
    printf("B: %zu bytes\n", sizeof(struct B));
    return 0;
}
```

Typical output:

```
A: 12 bytes
B: 8 bytes
```

Same three members, but reordering saves 4 bytes per struct. With a million records, that's 4 MB.

## Example 2: see exactly where members sit

`offsetof` from `<stddef.h>` gives each member's position in bytes:

```c
#include <stdio.h>
#include <stddef.h>

struct A {
    char c;
    int x;
    char d;
};

int main(void) {
    printf("c at %zu\n", offsetof(struct A, c));
    printf("x at %zu\n", offsetof(struct A, x));
    printf("d at %zu\n", offsetof(struct A, d));
    printf("total %zu\n", sizeof(struct A));
    return 0;
}
```

Typical output:

```
c at 0
x at 4
d at 8
total 12
```

Bytes 1–3 and 9–11 are padding.

## Why the size is rounded up

A struct's size is rounded up to a multiple of its strictest member's alignment, so that every element in an **array** of structs is also correctly aligned.

## Example 3: a well-ordered record

```c
#include <stdio.h>

struct Record {
    double balance;     /* 8 bytes */
    int id;             /* 4 bytes */
    short branch;       /* 2 bytes */
    char type;          /* 1 byte */
    char active;        /* 1 byte */
};

int main(void) {
    printf("%zu bytes\n", sizeof(struct Record));   /* typically 16 */
    return 0;
}
```

Ordering members from largest to smallest leaves no gaps here: 8 + 4 + 2 + 1 + 1 = 16.

## Common mistakes

- **Assuming `sizeof(struct)` equals the sum of members.** Always use `sizeof`.
- **Writing structs directly to files or networks** and reading them on another machine. Padding and byte order can differ; write each field separately instead.
- **Comparing structs with `memcmp`:** padding bytes may contain garbage, so equal structs can compare as different.

## Key points

- Compilers add padding for alignment.
- Order members from largest to smallest to reduce padding.
- Use `sizeof` and `offsetof` instead of guessing.

## Interview corner

**Q: Why does the compiler add padding?**
Most CPUs read data faster, or only correctly, when it's aligned to its size. Padding keeps every member aligned.

**Q: How can you reduce a struct's size?**
Reorder members from largest to smallest alignment. Some compilers also offer packing attributes, but packed structs can be slower and aren't portable.

## Practice

1. **Easy:** Print the size of a struct with one `char` and one `double`, then with the members swapped. Are they the same?
2. **Medium:** Use `offsetof` to print where each member starts in `struct { char a; double b; int c; }`.
3. **Hard:** Reorder `struct { char a; double b; char c; int d; }` to make it as small as possible, and print both sizes.

## Solutions

**1.** Both are typically 16 bytes, because the struct size rounds up to a multiple of 8 either way.

```c
#include <stdio.h>

struct P { char c; double d; };
struct Q { double d; char c; };

int main(void) {
    printf("%zu %zu\n", sizeof(struct P), sizeof(struct Q));
    return 0;
}
```

**2.**

```c
#include <stdio.h>
#include <stddef.h>

struct S { char a; double b; int c; };

int main(void) {
    printf("a %zu, b %zu, c %zu, total %zu\n",
           offsetof(struct S, a), offsetof(struct S, b), offsetof(struct S, c), sizeof(struct S));
    return 0;   /* typically a 0, b 8, c 16, total 24 */
}
```

**3.**

```c
#include <stdio.h>

struct Before { char a; double b; char c; int d; };
struct After  { double b; int d; char a; char c; };

int main(void) {
    printf("before %zu, after %zu\n", sizeof(struct Before), sizeof(struct After));
    return 0;   /* typically before 24, after 16 */
}
```
