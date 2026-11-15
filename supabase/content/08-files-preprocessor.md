<!-- lesson: file-io -->
C reads and writes files through a `FILE *` handle from `<stdio.h>`.

```c
#include <stdio.h>

int main(void) {
    FILE *out = fopen("marks.txt", "w");
    if (out == NULL) {
        perror("marks.txt");
        return 1;
    }
    fprintf(out, "Priya 91\nRohan 84\n");
    fclose(out);

    FILE *in = fopen("marks.txt", "r");
    if (!in) { perror("marks.txt"); return 1; }
    char name[20];
    int score;
    while (fscanf(in, "%19s %d", name, &score) == 2) {
        printf("%s scored %d\n", name, score);
    }
    fclose(in);
    return 0;
}
```

## Modes

| Mode | Meaning |
| --- | --- |
| `"r"` | read; fails if the file doesn't exist |
| `"w"` | write; creates or empties the file |
| `"a"` | append to the end |
| `"r+"` | read and write an existing file |
| add `b` | binary mode, such as `"rb"` |

## Reading line by line

```c
char line[256];
while (fgets(line, sizeof line, in)) {
    printf("%s", line);
}
```

## Rules

- Always check `fopen` for `NULL`. `perror` prints why it failed.
- Always `fclose` what you open, or data may never reach the disk.
- Check the return value of every read to know when you hit the end.

## Try it

Count the lines, words and characters in a text file, like the Unix `wc` command.

<!-- lesson: argc-argv -->
`main` can receive the words typed after the program name on the command line.

```c
#include <stdio.h>

int main(int argc, char *argv[]) {
    printf("Program: %s\n", argv[0]);
    for (int i = 1; i < argc; i++) {
        printf("Argument %d: %s\n", i, argv[i]);
    }
    return 0;
}
```

Running `./greet hello world` prints the program name, then `hello` and `world`.

- `argc` counts the arguments, including the program name.
- `argv` is an array of strings. `argv[argc]` is always `NULL`.

## Converting arguments

Arguments are strings. Convert numbers with `strtol`, which reports errors (unlike `atoi`):

```c
#include <stdlib.h>

char *end;
long n = strtol(argv[1], &end, 10);
if (*end != '\0') {
    fprintf(stderr, "Not a number: %s\n", argv[1]);
    return 1;
}
```

## Usage messages

```c
if (argc != 3) {
    fprintf(stderr, "Usage: %s <file> <count>\n", argv[0]);
    return 1;
}
```

## Try it

Write `sum` so that `./sum 4 10 7` prints `21`. Reject anything that isn't a number.

<!-- lesson: macros -->
The preprocessor runs before the compiler and rewrites your source text.

## Object-like macros

```c
#define MAX_USERS 100
#define VERSION "1.4.2"
```

## Function-like macros

```c
#define SQUARE(x) ((x) * (x))
#define MAX(a, b) ((a) > (b) ? (a) : (b))
```

Wrap every parameter and the whole body in parentheses. Without them, `SQUARE(1 + 2)` expands to `1 + 2 * 1 + 2`, which is 5, not 9.

Macros evaluate arguments as many times as they appear: `SQUARE(i++)` increments `i` twice. Prefer `static inline` functions when you can.

## Conditional compilation

```c
#ifdef DEBUG
    printf("debug: x = %d\n", x);
#endif
```

Compile with `gcc -DDEBUG main.c` to switch the debug lines on.

## Include guards

Stop a header being included twice:

```c
#ifndef STUDENT_H
#define STUDENT_H

typedef struct { char name[20]; int roll; } Student;
void print_student(const Student *s);

#endif
```

## Useful predefined macros

`__FILE__`, `__LINE__`, `__func__` (strictly an identifier, not a macro) and `__DATE__` help with logging.

## Try it

Write a `LOG(msg)` macro that prints the file, line and message, active only when `DEBUG` is defined.

<!-- lesson: function-pointers -->
A function pointer stores the address of a function, so you can pass behaviour around like data.

```c
#include <stdio.h>

int add(int a, int b) { return a + b; }
int mul(int a, int b) { return a * b; }

int main(void) {
    int (*op)(int, int) = add;   // pointer to a function taking two ints
    printf("%d\n", op(3, 4));    // 7
    op = mul;
    printf("%d\n", op(3, 4));    // 12
    return 0;
}
```

## Reading the declaration

`int (*op)(int, int)` means: `op` is a pointer to a function that takes `(int, int)` and returns `int`. The parentheses around `*op` matter. Without them it declares a function returning `int *`.

## typedef makes it readable

```c
typedef int (*BinaryOp)(int, int);
BinaryOp ops[] = { add, mul };
```

## Callbacks with qsort

The standard `qsort` takes a comparison function:

```c
#include <stdlib.h>

int by_value(const void *a, const void *b) {
    int x = *(const int *)a, y = *(const int *)b;
    return (x > y) - (x < y);
}

int data[] = {42, 7, 19, 3};
qsort(data, 4, sizeof data[0], by_value);   // 3 7 19 42
```

## Try it

Build a menu-driven calculator that stores `add`, `sub`, `mul` and `divide` in an array of function pointers and calls the one the user picks.

<!-- lesson: capstone -->
Bring everything together by building a **Student Record Manager**: a command-line program that stores student records in a file.

## What it must do

1. Show a menu: Add, List, Search, Update, Delete, Save and Quit.
2. Store students as `struct Student { int roll; char name[40]; float cgpa; }`.
3. Keep records in a dynamic array that grows with `realloc`.
4. Save records to `students.dat` and load them when the program starts.
5. Search by roll number and by part of a name.
6. Validate every input. Reject a CGPA outside 0–10 and duplicate roll numbers.

## Suggested structure

```
main.c        menu loop
student.h     struct and function prototypes, with include guards
student.c     add, find, update, delete
storage.c     load and save
```

Compile the parts together:

```bash
gcc -Wall -Wextra -std=c11 main.c student.c storage.c -o records
```

## Milestones

1. Menu and in-memory add and list.
2. Search, update and delete.
3. Saving and loading with `fwrite` and `fread`.
4. Sorting the list by CGPA with `qsort`.
5. Run it under `-fsanitize=address` with no errors or leaks.

## Done when

- No warnings with `-Wall -Wextra`.
- No leaks reported by AddressSanitizer.
- Closing and reopening the program keeps every record.

Share your finished project in your portfolio: it shows structs, pointers, dynamic memory, files and multi-file builds in one place.
