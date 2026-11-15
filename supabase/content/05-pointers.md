<!-- lesson: addresses -->
Every variable lives somewhere in memory, and every location has an **address**. The `&` operator gives you a variable's address.

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

A typical output is `address: 0x7ffd5c3a1a4c`. The exact number changes from run to run.

## Think of memory as a street

- Each house is one byte with a house number (the address).
- An `int` usually takes 4 neighbouring houses; its address is the first one.
- `&marks` asks "which house does marks start at?"

## Why addresses matter

Addresses let functions change the caller's variables, let you walk through arrays efficiently, and let you build data structures like linked lists. `scanf("%d", &marks)` works because you give scanf the address to write into.

## Printing addresses

Use `%p` and cast to `(void *)`. Using `%d` for an address is wrong and gives garbage on 64-bit systems.

## Try it

Declare an `int`, a `double` and a `char`. Print each one's address and size. Are the addresses close together?

<!-- lesson: dereferencing -->
A **pointer** is a variable that stores an address. Its type says what it points to.

```c
int marks = 85;
int *p = &marks;     // p holds the address of marks

printf("%d\n", *p);  // 85  -- * reads the value at that address
*p = 90;             // writes through the pointer
printf("%d\n", marks);   // 90
```

## Two meanings of *

- In a declaration, `int *p` means "p is a pointer to int".
- In an expression, `*p` means "the value p points to". This is called **dereferencing**.

## NULL

A pointer that points nowhere should be set to `NULL`. Check before dereferencing:

```c
int *q = NULL;
if (q != NULL) {
    printf("%d\n", *q);
}
```

Dereferencing `NULL` or an uninitialised pointer is undefined behaviour and usually crashes with a segmentation fault.

## Pointer to pointer

```c
int **pp = &p;
printf("%d\n", **pp);   // 90
```

## Declaring several pointers

```c
int *a, *b;   // two pointers
int *c, d;    // c is a pointer, d is a plain int
```

## Try it

Make two pointers point at the same `int`. Change the value through one pointer and print it through the other.

<!-- lesson: pointer-arithmetic -->
A pointer stores an address. Adding an integer to a pointer moves it by that many **elements**, not bytes.

```c
#include <stdio.h>

int main(void) {
    int marks[4] = {72, 85, 91, 64};
    int *p = marks;          // points to marks[0]

    printf("%d\n", *p);       // 72
    printf("%d\n", *(p + 2)); // 91
    return 0;
}
```

If an `int` is 4 bytes, `p + 1` is 4 bytes further on. For a `double *`, `p + 1` moves 8 bytes.

## Walking an array

```c
int sum = 0;
for (int *q = marks; q < marks + 4; q++) {
    sum += *q;
}
printf("Total: %d\n", sum);   // Total: 312
```

## Subtracting pointers

Subtracting two pointers into the same array gives the number of elements between them, as a `ptrdiff_t`:

```c
int *first = &marks[0];
int *last  = &marks[3];
printf("%td\n", last - first);  // 3
```

## Key points

- `p + n` moves `n` elements, not `n` bytes.
- Only compare or subtract pointers within the same array.
- One-past-the-end (`marks + 4`) is a valid comparison target but must never be dereferenced.

## Try it

Write `int sum(const int *start, const int *end)` that adds every element from start up to, but not including, end.

<!-- lesson: pointers-arrays -->
Arrays and pointers are closely linked, but they are not the same thing.

## Array decay

In most expressions, an array name turns into a pointer to its first element:

```c
int a[5] = {10, 20, 30, 40, 50};
int *p = a;          // same as &a[0]
```

That's why `a[i]` and `*(a + i)` mean exactly the same thing. Even `i[a]` works, though nobody should write it.

## Where they differ

```c
printf("%zu\n", sizeof a);   // 20: the whole array
printf("%zu\n", sizeof p);   // 8: just the pointer (64-bit)
p = p + 1;                    // fine
// a = a + 1;                 // error: an array name can't be reassigned
```

## Arrays as function parameters

These three declarations are identical: the function receives a pointer.

```c
void f(int a[]);
void f(int a[10]);
void f(int *a);
```

So inside the function, `sizeof a` is the pointer size. Pass the length separately.

## Strings again

```c
char s[] = "hello";
char *t = s;
while (*t) {          // stops at '\0'
    putchar(*t++);
}
```

## Try it

Write `void reverse(int *a, int n)` using two pointers, one at each end, swapping and moving inward.

<!-- lesson: pointers-functions -->
Passing a pointer lets a function change the caller's variables. This is how C returns more than one result.

## Swap

```c
void swap(int *a, int *b) {
    int tmp = *a;
    *a = *b;
    *b = tmp;
}

int x = 3, y = 9;
swap(&x, &y);     // x is 9, y is 3
```

## Returning several results

```c
void min_max(const int *arr, int n, int *min, int *max) {
    *min = *max = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] < *min) *min = arr[i];
        if (arr[i] > *max) *max = arr[i];
    }
}
```

## const pointers

`const` documents and enforces what may change:

| Declaration | Can change the value? | Can point elsewhere? |
| --- | --- | --- |
| `const int *p` | No | Yes |
| `int *const p` | Yes | No |
| `const int *const p` | No | No |

Use `const` on parameters you only read, like `arr` above.

## Never return a local's address

```c
int *bad(void) {
    int n = 5;
    return &n;    // n dies when the function returns
}
```

The caller gets a dangling pointer. Return heap memory or let the caller pass a buffer instead.

## Try it

Write `void split(double value, int *whole, double *fraction)` that splits 7.25 into 7 and 0.25.

<!-- lesson: pointers-quiz -->
Test yourself on Module 5. Answers are at the bottom.

## Questions

1. `int x = 5; int *p = &x; *p = 9;` What is `x` now?
2. What does `*(p + 2)` mean if `p` points to `a[0]`?
3. If `int a[10]`, what is `sizeof a` on a system with 4-byte ints?
4. What is the difference between `const int *p` and `int *const p`?
5. What happens when you dereference `NULL`?
6. Why can't a function return the address of its local variable?
7. How can a function give back two results?

## Answers

1. `9`: writing through the pointer changes x.
2. The same as `a[2]`.
3. `40`.
4. `const int *p`: the value can't be changed through p. `int *const p`: p can't point elsewhere.
5. Undefined behaviour, usually a segmentation fault.
6. The local is destroyed when the function returns, leaving a dangling pointer.
7. Take pointer parameters and write the results through them.
