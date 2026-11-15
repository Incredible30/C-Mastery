<!-- lesson: arrays -->
An array stores many values of the same type in one contiguous block of memory.

```c
int marks[5] = {72, 85, 91, 64, 78};

for (int i = 0; i < 5; i++) {
    printf("marks[%d] = %d\n", i, marks[i]);
}
```

## Indexing

Indexes run from `0` to `length - 1`. C does **not** check bounds: `marks[5]` compiles but reads memory that isn't yours. That is undefined behaviour and a common source of crashes.

## Initialising

```c
int a[5] = {1, 2};        // {1, 2, 0, 0, 0}
int zeros[100] = {0};     // all zero
int b[] = {4, 5, 6};      // size worked out: 3
```

## Length with sizeof

```c
size_t len = sizeof marks / sizeof marks[0];   // 5
```

This works only where the array was declared. Inside a function that received the array, `sizeof` gives the size of a pointer instead.

## Finding the largest value

```c
int max = marks[0];
for (int i = 1; i < 5; i++) {
    if (marks[i] > max) max = marks[i];
}
```

## Try it

Read 10 integers into an array, then print them in reverse order and print their average.

<!-- lesson: multi-dimensional -->
A 2D array is an array of arrays, useful for grids, matrices and tables.

```c
int m[2][3] = {
    {1, 2, 3},
    {4, 5, 6}
};

for (int r = 0; r < 2; r++) {
    for (int c = 0; c < 3; c++) {
        printf("%d ", m[r][c]);
    }
    printf("\n");
}
```

## Memory layout

C stores 2D arrays in **row-major** order: row 0 first, then row 1. `m` is laid out as `1 2 3 4 5 6`. Looping row by row, as above, is fastest because it reads memory in order.

## Passing to functions

Every dimension except the first must be given:

```c
void print_matrix(int rows, int m[][3]) { /* ... */ }
```

## Matrix addition

```c
for (int r = 0; r < R; r++)
    for (int c = 0; c < C; c++)
        sum[r][c] = a[r][c] + b[r][c];
```

## Try it

Write a program that multiplies a 2×3 matrix by a 3×2 matrix. Remember: `result[i][j]` is the sum of `a[i][k] * b[k][j]` over `k`.

<!-- lesson: strings -->
C has no string type. A string is a `char` array that ends with the **null terminator** `'\0'`.

```c
char name[] = "Priya";   // 6 bytes: P r i y a \0
printf("%s has %zu bytes\n", name, sizeof name);   // 6
```

The terminator is how functions know where the string ends. Forget it and they keep reading past your data.

## Character by character

```c
for (int i = 0; name[i] != '\0'; i++) {
    printf("%c-", name[i]);
}
```

## Reading strings safely

`scanf("%s")` stops at a space. To read a full line, use `fgets`, which also limits the length:

```c
char line[100];
if (fgets(line, sizeof line, stdin)) {
    line[strcspn(line, "\n")] = '\0';   // remove the newline
}
```

Never use `gets`: it cannot limit the length and was removed from the language.

## String literals are read-only

```c
char *p = "hello";
p[0] = 'H';          // undefined behaviour: may crash
char s[] = "hello";
s[0] = 'H';          // fine: s is your own copy
```

## Try it

Read a word and print it reversed, swapping characters in place.

<!-- lesson: string-h -->
`<string.h>` provides the standard string functions. Each assumes null-terminated strings.

| Function | What it does |
| --- | --- |
| `strlen(s)` | length, not counting `'\0'` |
| `strcpy(dst, src)` | copies src into dst |
| `strncpy(dst, src, n)` | copies at most n chars (may not add `'\0'`!) |
| `strcat(dst, src)` | appends src to dst |
| `strcmp(a, b)` | 0 if equal, negative if a < b, positive if a > b |
| `strchr(s, c)` | pointer to first c in s, or NULL |
| `strstr(s, sub)` | pointer to first sub in s, or NULL |

## Comparing strings

`==` compares addresses, not contents. Use `strcmp`:

```c
if (strcmp(answer, "yes") == 0) { /* equal */ }
```

## Buffer overflows

`strcpy` and `strcat` don't know how big the destination is:

```c
char user[8];
strcpy(user, "arjun_mehta_2026");   // overflows: 17 bytes into 8
```

Use `snprintf`, which always respects the size and terminates the string:

```c
snprintf(user, sizeof user, "%s", input);
```

## Try it

Write your own `my_strlen` and `my_strcmp` without using string.h, then compare results with the real ones.

<!-- lesson: arrays-quiz -->
Test yourself on Module 4. Answers are at the bottom.

## Questions

1. What are the valid indexes of `int a[8]`?
2. What does `sizeof a / sizeof a[0]` give for `int a[8]`?
3. In what order is `int m[2][3]` stored in memory?
4. How many bytes does `char s[] = "C99";` use?
5. Why is `if (s == "yes")` wrong?
6. What is wrong with `strcpy(buf, input)` when `buf` is small?
7. Why should you never use `gets`?

## Answers

1. 0 to 7.
2. `8`, the number of elements.
3. Row-major: all of row 0, then row 1.
4. 4 bytes: three characters plus `'\0'`.
5. It compares addresses. Use `strcmp(s, "yes") == 0`.
6. strcpy doesn't check the size, so long input overflows the buffer.
7. It cannot limit input length, so it always risks overflow. It was removed in C11.
