<!-- lesson: addresses -->
Every variable lives somewhere in your computer's memory, and every location in memory has a number called its **address**. Understanding addresses is the first step to understanding pointers, the most powerful feature of C.

**Real-life analogy:** memory is a very long street of houses. Each house holds one byte and has a house number: its address. A 4-byte `int` occupies 4 neighbouring houses, and its address is the number of the first one.

## The & operator

`&` means "address of". Print addresses with `%p`, casting to `(void *)`:

```c
#include <stdio.h>

int main(void) {
    int marks = 85;
    printf("value:   %d\n", marks);
    printf("address: %p\n", (void *)&marks);
    printf("size:    %zu bytes\n", sizeof marks);
    return 0;
}
```

Example output (the address changes from run to run):

```
value:   85
address: 0x7ffd5c3a1a4c
size:    4 bytes
```

Addresses are usually shown in **hexadecimal** (base 16, digits 0–9 and a–f).

## Example 2: neighbours in memory

Array elements sit next to each other, so their addresses go up by the element size:

```c
#include <stdio.h>

int main(void) {
    int a[3] = {10, 20, 30};
    for (int i = 0; i < 3; i++) {
        printf("a[%d] = %d at %p\n", i, a[i], (void *)&a[i]);
    }
    return 0;
}
```

Example output:

```
a[0] = 10 at 0x7ffee4b8c9a0
a[1] = 20 at 0x7ffee4b8c9a4
a[2] = 30 at 0x7ffee4b8c9a8
```

Each address is 4 more than the last because each `int` takes 4 bytes.

## Example 3: why scanf needs &

```c
#include <stdio.h>

int main(void) {
    int age;
    printf("Age: ");
    scanf("%d", &age);   /* "here is where age lives: write the number there" */
    printf("Stored %d at %p\n", age, (void *)&age);
    return 0;
}
```

`scanf` can't change your variable from a copy of its value. Given the address, it can go to that location and write the number.

## Why addresses matter

- Functions can change the caller's variables (Lesson 5).
- Arrays can be walked through efficiently (Lessons 3 and 4).
- Data structures like linked lists and trees are built from addresses (Module 7).

## Common mistakes

- **Printing an address with `%d`:** on 64-bit systems an address doesn't fit in an `int`. Use `%p` with `(void *)`.
- **Expecting the same address every run:** operating systems randomise memory layout for security.
- **Taking the address of a constant or expression:** `&5` or `&(a + b)` doesn't compile.

## Key points

- Every variable has an address; `&x` gives it.
- Print addresses with `%p` and a `(void *)` cast.
- Array elements have consecutive addresses.

## Interview corner

**Q: What does `&` do in `scanf("%d", &n)`?**
It passes the address of `n`, so scanf can store the value directly in `n`'s memory.

**Q: Why are addresses different each time a program runs?**
Address Space Layout Randomisation (ASLR) places memory at random locations to make attacks harder.

## Practice

1. **Easy:** Declare an `int`, a `double` and a `char`, then print each one's value, address and size.
2. **Medium:** Print the addresses of the elements of a `double` array of 4 elements. How far apart are they?
3. **Hard:** Declare two `int` variables and print which one has the lower address.

## Solutions

**1.**

```c
#include <stdio.h>

int main(void) {
    int i = 7;
    double d = 3.5;
    char c = 'Z';
    printf("int    %d at %p, %zu bytes\n", i, (void *)&i, sizeof i);
    printf("double %.1f at %p, %zu bytes\n", d, (void *)&d, sizeof d);
    printf("char   %c at %p, %zu bytes\n", c, (void *)&c, sizeof c);
    return 0;
}
```

**2.** They are 8 bytes apart, the size of a `double`.

```c
#include <stdio.h>

int main(void) {
    double v[4] = {1.5, 2.5, 3.5, 4.5};
    for (int i = 0; i < 4; i++) {
        printf("v[%d] at %p\n", i, (void *)&v[i]);
    }
    return 0;
}
```

**3.** Comparing addresses of unrelated variables with `<` isn't defined in C, so convert them to integers first using `uintptr_t`.

```c
#include <stdio.h>
#include <stdint.h>

int main(void) {
    int x = 1, y = 2;
    uintptr_t ax = (uintptr_t)&x, ay = (uintptr_t)&y;
    printf("%s has the lower address\n", ax < ay ? "x" : "y");
    printf("x=%d y=%d\n", x, y);
    return 0;
}
```

<!-- lesson: dereferencing -->
A **pointer** is a variable that stores an address. Once you have a pointer, you can read or change the value at that address. This is called **dereferencing**.

**Real-life analogy:** a pointer is a piece of paper with a house number written on it. The paper isn't the house. But by following the address, you can go to the house and see what's inside, or change it.

## Declaring and using a pointer

```c
#include <stdio.h>

int main(void) {
    int marks = 85;
    int *p = &marks;      /* p is a pointer to int, holding marks' address */

    printf("%d\n", *p);   /* 85: read the value at the address */
    *p = 90;              /* change the value at the address */
    printf("%d\n", marks);
    return 0;
}
```

Output:

```
85
90
```

## The two meanings of *

| Where | Example | Meaning |
| --- | --- | --- |
| In a declaration | `int *p;` | "p is a pointer to an int" |
| In an expression | `*p = 90;` | "the int that p points to" |

The type matters: an `int *` points to an `int`, a `double *` points to a `double`. It tells C how many bytes to read and how to interpret them.

## Example 2: two pointers, one variable

```c
#include <stdio.h>

int main(void) {
    int score = 10;
    int *a = &score;
    int *b = a;          /* b now holds the same address */

    *b = 25;
    printf("score=%d *a=%d *b=%d\n", score, *a, *b);
    printf("same address? %s\n", a == b ? "yes" : "no");
    return 0;
}
```

Output:

```
score=25 *a=25 *b=25
same address? yes
```

## Example 3: NULL and pointer-to-pointer

A pointer that points nowhere should be set to `NULL`. Always check before dereferencing a pointer that might be `NULL`:

```c
#include <stdio.h>

int main(void) {
    int value = 42;
    int *p = NULL;
    if (p == NULL) {
        printf("p points nowhere yet\n");
    }
    p = &value;

    int **pp = &p;              /* a pointer to a pointer */
    printf("%d\n", **pp);       /* follow two addresses: 42 */
    return 0;
}
```

Output:

```
p points nowhere yet
42
```

## Common mistakes

- **Dereferencing an uninitialised pointer:** `int *p; *p = 5;` writes to a random address. Initialise pointers, to `NULL` if nothing else.
- **Dereferencing `NULL`:** usually crashes with a "segmentation fault".
- **Declaring several pointers on one line:** `int *a, b;` makes `a` a pointer but `b` a plain `int`. Write `int *a, *b;`.
- **Mixing up `p` and `*p`:** `p = 5;` changes the address; `*p = 5;` changes the value.

## Key points

- `int *p = &x;` makes `p` point to `x`.
- `*p` reads or writes the value `p` points to.
- Initialise pointers, and check for `NULL` before use.

## Interview corner

**Q: What is a dangling pointer?**
A pointer that still holds the address of memory that has been freed or no longer exists, such as a local variable after its function returned. Using it is undefined behaviour.

**Q: What is the size of a pointer?**
It depends on the platform, not the type pointed to: usually 8 bytes on 64-bit systems and 4 on 32-bit systems.

## Practice

1. **Easy:** Make a pointer to an `int`, double the value through the pointer, and print the original variable.
2. **Medium:** Make two pointers to two different variables, then swap the values using only the pointers.
3. **Hard:** Use a pointer-to-pointer to make a pointer `p` switch from pointing at `x` to pointing at `y`, without writing `p =` directly.

## Solutions

**1.**

```c
#include <stdio.h>

int main(void) {
    int n = 21;
    int *p = &n;
    *p = *p * 2;
    printf("%d\n", n);   /* 42 */
    return 0;
}
```

**2.**

```c
#include <stdio.h>

int main(void) {
    int x = 3, y = 9;
    int *px = &x, *py = &y;
    int tmp = *px;
    *px = *py;
    *py = tmp;
    printf("x=%d y=%d\n", x, y);   /* x=9 y=3 */
    return 0;
}
```

**3.**

```c
#include <stdio.h>

int main(void) {
    int x = 1, y = 2;
    int *p = &x;
    int **pp = &p;
    *pp = &y;            /* changes p itself */
    printf("%d\n", *p);  /* 2 */
    return 0;
}
```

<!-- lesson: pointer-arithmetic -->
You can add to and subtract from pointers. But C does something clever: adding 1 to a pointer moves it to the **next element**, not the next byte. This is what makes walking through arrays with pointers work.

**Real-life analogy:** you're on a street of identical flats, each 4 doors wide. "Go to the next flat" means skipping 4 doors, not 1. C knows the flat size from the pointer's type.

## Example 1: moving along an array

```c
#include <stdio.h>

int main(void) {
    int marks[4] = {72, 85, 91, 64};
    int *p = marks;              /* points to marks[0] */

    printf("%d\n", *p);          /* 72 */
    printf("%d\n", *(p + 1));    /* 85 */
    printf("%d\n", *(p + 2));    /* 91 */
    printf("%p -> %p\n", (void *)p, (void *)(p + 1));
    return 0;
}
```

Example output:

```
72
85
91
0x7ffd1000 -> 0x7ffd1004
```

`p + 1` is 4 bytes further on because an `int` is 4 bytes. For a `double *`, it would move 8 bytes.

## Example 2: walking with ++

```c
#include <stdio.h>

int main(void) {
    int marks[4] = {72, 85, 91, 64};
    int sum = 0;
    for (int *q = marks; q < marks + 4; q++) {
        sum += *q;
    }
    printf("Total: %d\n", sum);
    return 0;
}
```

Output:

```
Total: 312
```

`marks + 4` is the address **one past the end**. You may compare against it, but never dereference it.

## Example 3: distance between pointers

Subtracting two pointers into the same array gives the number of elements between them, as a `ptrdiff_t` (print with `%td`):

```c
#include <stdio.h>

int main(void) {
    char word[] = "programming";
    char *start = word;
    char *g = word;
    while (*g != 'g') g++;          /* find the first 'g' */
    printf("first g at index %td\n", g - start);
    return 0;
}
```

Output:

```
first g at index 3
```

## What you can and can't do

| Operation | Allowed? |
| --- | --- |
| pointer + integer, pointer − integer | yes |
| `p++`, `p--` | yes |
| pointer − pointer (same array) | yes, gives element count |
| compare pointers in the same array | yes |
| pointer + pointer | no |
| pointer × or ÷ anything | no |

## Common mistakes

- **Thinking `p + 1` adds one byte.** It adds one element.
- **Going past the end and dereferencing.** `*(marks + 4)` reads outside the array.
- **Subtracting pointers from different arrays:** the result is meaningless and undefined.

## Key points

- `p + n` moves `n` elements, not `n` bytes.
- `*(p + i)` is the same as `p[i]`.
- One-past-the-end is fine to compare against but never to read.

## Interview corner

**Q: If `int *p` holds `1000`, what does `p + 3` hold, with 4-byte ints?**
`1012`: three elements of 4 bytes each.

**Q: Why can't you add two pointers?**
Adding two addresses gives a number with no meaning as a location. Subtracting them, on the other hand, gives a distance, which is meaningful.

## Practice

1. **Easy:** Print an array of 5 integers using only a pointer and `*(p + i)`.
2. **Medium:** Write `int sum_range(const int *start, const int *end)` that adds every element from `start` up to, but not including, `end`.
3. **Hard:** Write `int my_strlen(const char *s)` using pointer subtraction instead of a counter.

## Solutions

**1.**

```c
#include <stdio.h>

int main(void) {
    int a[5] = {3, 1, 4, 1, 5};
    int *p = a;
    for (int i = 0; i < 5; i++) printf("%d ", *(p + i));
    printf("\n");
    return 0;
}
```

**2.**

```c
#include <stdio.h>

int sum_range(const int *start, const int *end) {
    int sum = 0;
    while (start < end) sum += *start++;
    return sum;
}

int main(void) {
    int a[6] = {1, 2, 3, 4, 5, 6};
    printf("%d\n", sum_range(a, a + 6));       /* 21 */
    printf("%d\n", sum_range(a + 2, a + 4));   /* 7 */
    return 0;
}
```

**3.**

```c
#include <stdio.h>

int my_strlen(const char *s) {
    const char *p = s;
    while (*p) p++;
    return (int)(p - s);
}

int main(void) {
    printf("%d\n", my_strlen("pointer"));   /* 7 */
    return 0;
}
```

<!-- lesson: pointers-arrays -->
Arrays and pointers are closely related in C, which confuses many learners. The key idea: in most expressions, an array's name **turns into a pointer** to its first element. But an array is not a pointer, and the differences matter.

**Real-life analogy:** an array is a row of houses you own. Its name, used in a sentence, means "the address of the first house". A pointer is a slip of paper with an address on it, which you can rewrite to point anywhere. You can't move your row of houses, but you can rewrite the slip.

## Array decay

```c
#include <stdio.h>

int main(void) {
    int a[5] = {10, 20, 30, 40, 50};
    int *p = a;                 /* same as &a[0] */

    printf("%d %d\n", a[2], *(a + 2));   /* 30 30 */
    printf("%d %d\n", p[2], *(p + 2));   /* 30 30 */
    return 0;
}
```

Output:

```
30 30
30 30
```

`a[i]` is defined as `*(a + i)`. That's why indexing works on both arrays and pointers.

## Example 2: where they differ

```c
#include <stdio.h>

int main(void) {
    int a[5] = {10, 20, 30, 40, 50};
    int *p = a;

    printf("sizeof a = %zu\n", sizeof a);   /* the whole array: 20 */
    printf("sizeof p = %zu\n", sizeof p);   /* just the pointer: 8 on 64-bit */
    p++;                                     /* fine: p now points to a[1] */
    printf("*p = %d\n", *p);
    /* a++;  error: an array name can't be changed */
    return 0;
}
```

Output on a 64-bit PC:

```
sizeof a = 20
sizeof p = 8
*p = 20
```

| | Array `int a[5]` | Pointer `int *p` |
| --- | --- | --- |
| `sizeof` | whole array | size of an address |
| Can be reassigned | no | yes |
| Owns memory | yes, 5 ints | no, it points at memory |

## Example 3: arrays passed to functions

When you pass an array to a function, it decays to a pointer. These three parameter forms all mean the same thing:

```c
#include <stdio.h>

int sum(const int *arr, int n) {     /* same as int arr[] */
    int s = 0;
    for (int i = 0; i < n; i++) s += arr[i];
    return s;
}

int main(void) {
    int a[] = {4, 8, 15, 16, 23, 42};
    int n = sizeof a / sizeof a[0];
    printf("%d\n", sum(a, n));
    return 0;
}
```

Output:

```
108
```

Inside `sum`, `sizeof arr` would be the size of a pointer, which is why the length is passed separately.

## Common mistakes

- **Using `sizeof` inside a function** to get an array's length.
- **Assigning to an array name:** `a = p;` doesn't compile.
- **Returning a local array from a function:** it disappears when the function returns. Return heap memory or fill a caller-provided array.

## Key points

- An array name decays to a pointer to its first element.
- `a[i]` means `*(a + i)`.
- `sizeof` differs, and array names can't be reassigned.
- Functions receive arrays as pointers, so always pass the length.

## Interview corner

**Q: Is an array a pointer?**
No. An array is a block of elements; its name converts to a pointer in most expressions. The exceptions are `sizeof`, the `&` operator and initialising a char array from a string literal.

**Q: What is `&a` for `int a[5]`?**
A pointer to the whole array, with type `int (*)[5]`. It has the same address as `a`, but `&a + 1` jumps past all 5 elements.

## Practice

1. **Easy:** Print an array using a pointer that you increment, without any index variable.
2. **Medium:** Write `void reverse(int *a, int n)` using two pointers, one at each end.
3. **Hard:** Write `int *find(int *a, int n, int target)` that returns a pointer to the first match, or `NULL`. Use it to change the found element.

## Solutions

**1.**

```c
#include <stdio.h>

int main(void) {
    int a[] = {5, 10, 15, 20};
    for (int *p = a; p < a + 4; p++) printf("%d ", *p);
    printf("\n");
    return 0;
}
```

**2.**

```c
#include <stdio.h>

void reverse(int *a, int n) {
    int *left = a, *right = a + n - 1;
    while (left < right) {
        int t = *left;
        *left++ = *right;
        *right-- = t;
    }
}

int main(void) {
    int a[] = {1, 2, 3, 4, 5};
    reverse(a, 5);
    for (int i = 0; i < 5; i++) printf("%d ", a[i]);   /* 5 4 3 2 1 */
    printf("\n");
    return 0;
}
```

**3.**

```c
#include <stdio.h>
#include <stddef.h>

int *find(int *a, int n, int target) {
    for (int i = 0; i < n; i++) {
        if (a[i] == target) return &a[i];
    }
    return NULL;
}

int main(void) {
    int a[] = {7, 3, 9, 3};
    int *hit = find(a, 4, 9);
    if (hit != NULL) *hit = 99;
    for (int i = 0; i < 4; i++) printf("%d ", a[i]);   /* 7 3 99 3 */
    printf("\n");
    return 0;
}
```

<!-- lesson: pointers-functions -->
C passes arguments by value: functions get copies. To let a function change the caller's variable, you pass the variable's **address**. This is how `swap` works, how `scanf` works, and how a function can give back more than one result.

**Real-life analogy:** if you want a friend to repaint your door, giving them a photo of the door (a copy) doesn't help. You give them your address, and they come and paint the real door.

## Example 1: swap

```c
#include <stdio.h>

void swap(int *a, int *b) {
    int tmp = *a;
    *a = *b;
    *b = tmp;
}

int main(void) {
    int x = 3, y = 9;
    swap(&x, &y);
    printf("x=%d y=%d\n", x, y);
    return 0;
}
```

Output:

```
x=9 y=3
```

`swap` receives the addresses of `x` and `y`, and writes through them.

## Example 2: returning several results

A function can return only one value, but it can write as many results as you like through pointers:

```c
#include <stdio.h>

void min_max(const int *arr, int n, int *min, int *max) {
    *min = *max = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] < *min) *min = arr[i];
        if (arr[i] > *max) *max = arr[i];
    }
}

int main(void) {
    int marks[] = {72, 85, 91, 64, 78};
    int lo, hi;
    min_max(marks, 5, &lo, &hi);
    printf("lowest %d, highest %d\n", lo, hi);
    return 0;
}
```

Output:

```
lowest 64, highest 91
```

## const with pointers

`const` documents and enforces what a function may change:

| Declaration | Change the value? | Point somewhere else? |
| --- | --- | --- |
| `const int *p` | no | yes |
| `int *const p` | yes | no |
| `const int *const p` | no | no |

Read it right to left: `const int *p` is "p is a pointer to an int that is const". Use `const` on pointer parameters you only read, like `arr` above.

## Example 3: never return a local's address

```c
#include <stdio.h>

void make_greeting(char *out, size_t size, const char *name) {
    snprintf(out, size, "Hello, %s!", name);   /* the caller owns the buffer */
}

int main(void) {
    char msg[40];
    make_greeting(msg, sizeof msg, "Kavya");
    printf("%s\n", msg);
    return 0;
}
```

Output:

```
Hello, Kavya!
```

A function that created `char buf[40]` inside itself and returned `buf` would hand back a **dangling pointer**: the array is destroyed when the function returns. Letting the caller pass in the buffer, as above, avoids that.

## Common mistakes

- **Forgetting `&` when calling:** `swap(x, y)` passes values, not addresses; the compiler warns.
- **Forgetting `*` inside the function:** `a = b;` swaps the local pointers, not the values.
- **Returning the address of a local variable.**
- **Passing `NULL`** to a function that dereferences without checking.

## Key points

- Pass `&x` so a function can change `x`.
- Use pointer parameters to return extra results.
- Mark read-only pointer parameters `const`.
- Never return a pointer to a local variable.

## Interview corner

**Q: Write a swap function. Why does `void swap(int a, int b)` fail?**
The correct version takes `int *a, int *b` and swaps `*a` and `*b`. The failing version swaps copies that disappear when the function returns.

**Q: What does `const int *p` protect?**
The value pointed to: you can't write `*p = 5`, but you can make `p` point elsewhere.

## Practice

1. **Easy:** Write `void triple(int *x)` that triples the caller's variable.
2. **Medium:** Write `void split_time(int total, int *h, int *m, int *s)` that converts seconds into hours, minutes and seconds.
3. **Hard:** Write `void sort3(int *a, int *b, int *c)` that puts three variables in ascending order, using a `swap` helper.

## Solutions

**1.**

```c
#include <stdio.h>

void triple(int *x) {
    *x *= 3;
}

int main(void) {
    int n = 14;
    triple(&n);
    printf("%d\n", n);   /* 42 */
    return 0;
}
```

**2.**

```c
#include <stdio.h>

void split_time(int total, int *h, int *m, int *s) {
    *h = total / 3600;
    *m = (total % 3600) / 60;
    *s = total % 60;
}

int main(void) {
    int h, m, s;
    split_time(3725, &h, &m, &s);
    printf("%dh %dm %ds\n", h, m, s);   /* 1h 2m 5s */
    return 0;
}
```

**3.**

```c
#include <stdio.h>

void swap(int *a, int *b) {
    int t = *a;
    *a = *b;
    *b = t;
}

void sort3(int *a, int *b, int *c) {
    if (*a > *b) swap(a, b);
    if (*b > *c) swap(b, c);
    if (*a > *b) swap(a, b);
}

int main(void) {
    int x = 9, y = 2, z = 5;
    sort3(&x, &y, &z);
    printf("%d %d %d\n", x, y, z);   /* 2 5 9 */
    return 0;
}
```

<!-- lesson: pointers-quiz -->
Check what you've learned in Module 5. Pointers are the topic interviewers love most, so take your time.

## Questions

1. `int x = 5; int *p = &x; *p = 9;` What is `x` now?
2. What is the difference between `p` and `*p`?
3. If `p` points to `a[0]`, what is `*(p + 2)`?
4. With 4-byte ints, if `p` holds address 2000, what does `p + 3` hold?
5. For `int a[10]` with 4-byte ints, what is `sizeof a`? And `sizeof p` for `int *p` on a 64-bit PC?
6. Can you write `a++` for an array `a`? Can you write `p++` for a pointer?
7. What is the difference between `const int *p` and `int *const p`?
8. What happens when you dereference `NULL`?
9. Why can't a function return the address of its local variable?
10. In `int *a, b;`, what type is `b`?
11. How can a function give back two results?
12. What does `int **pp` hold?

## Answers

1. **`9`.** Writing through the pointer changes `x`.
2. **`p` is the address;** `*p` is the value stored at that address.
3. **The same as `a[2]`.**
4. **`2012`.** Three elements × 4 bytes.
5. **`40`** and **`8`**.
6. **No for the array** (its name can't be reassigned), **yes for the pointer**.
7. **`const int *p`:** you can't change the value through `p`. **`int *const p`:** you can't make `p` point elsewhere.
8. **Undefined behaviour,** usually a segmentation fault crash.
9. **The local is destroyed** when the function returns, leaving a dangling pointer.
10. **A plain `int`.** The `*` belongs to `a` only.
11. **Take pointer parameters** and write the results through them, like `min_max(arr, n, &lo, &hi)`.
12. **The address of a pointer** (a pointer to a pointer to `int`).

## How did you do?

- **10–12 correct:** excellent. You're ready for structures.
- **7–9 correct:** good. Review the lessons for anything you missed.
- **0–6 correct:** pointers take time. Redo the practice problems, drawing boxes and arrows on paper.
