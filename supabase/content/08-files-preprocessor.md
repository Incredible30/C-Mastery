<!-- lesson: file-io -->
Variables disappear when a program ends. To keep data, such as marks, settings or logs, you save it in a **file**. C reads and writes files through a `FILE *` handle from `<stdio.h>`.

**Real-life analogy:** opening a file is like checking out a book from a library. `fopen` gets it (and says whether you can read, write or both), you read or write, and `fclose` returns it. Forget to return it and nobody else gets your changes.

## Open modes

| Mode | Meaning | If the file doesn't exist |
| --- | --- | --- |
| `"r"` | read | fails, returns `NULL` |
| `"w"` | write, erasing old content | creates it |
| `"a"` | append to the end | creates it |
| `"r+"` | read and write | fails |
| add `b` | binary, such as `"rb"`, `"wb"` | |

## Example 1: write, then read back

```c
#include <stdio.h>

int main(void) {
    FILE *out = fopen("marks.txt", "w");
    if (out == NULL) {
        perror("marks.txt");
        return 1;
    }
    fprintf(out, "Priya 91\nRohan 84\nMeera 88\n");
    fclose(out);

    FILE *in = fopen("marks.txt", "r");
    if (in == NULL) {
        perror("marks.txt");
        return 1;
    }
    char name[20];
    int score;
    while (fscanf(in, "%19s %d", name, &score) == 2) {
        printf("%-6s scored %d\n", name, score);
    }
    fclose(in);
    return 0;
}
```

Output:

```
Priya  scored 91
Rohan  scored 84
Meera  scored 88
```

`perror` prints the reason a call failed, for example `marks.txt: No such file or directory`.

## Example 2: line by line with fgets

```c
#include <stdio.h>

int main(void) {
    FILE *f = fopen("marks.txt", "r");
    if (f == NULL) {
        perror("marks.txt");
        return 1;
    }
    char line[256];
    int n = 0;
    while (fgets(line, sizeof line, f) != NULL) {
        n++;
        printf("%d: %s", n, line);   /* line already ends with '\n' */
    }
    fclose(f);
    return 0;
}
```

Run after Example 1, it prints each line with its number.

## Example 3: append a log entry

```c
#include <stdio.h>

int main(void) {
    FILE *log = fopen("activity.log", "a");
    if (log == NULL) {
        perror("activity.log");
        return 1;
    }
    fprintf(log, "lesson completed: file-io\n");
    fclose(log);
    printf("logged\n");
    return 0;
}
```

Each run adds one line to the end; nothing is erased.

## Binary files

`fwrite` and `fread` copy raw bytes, which is fast for arrays and structs:

```c
int scores[3] = {91, 84, 88};
fwrite(scores, sizeof scores[0], 3, f);   /* write 3 ints */
fread(scores, sizeof scores[0], 3, f);    /* read them back */
```

Binary files aren't portable between different machines, because type sizes, padding and byte order can differ.

## Common mistakes

- **Not checking `fopen` for `NULL`,** then crashing on the first read.
- **Forgetting `fclose`:** buffered data may never reach the disk.
- **Using `"w"` when you meant `"a"`,** wiping the file.
- **Looping with `while (!feof(f))`:** it runs one extra time. Loop on the read function's return value instead.

## Key points

- `fopen` returns `NULL` on failure; check it and use `perror`.
- `fprintf`/`fscanf`/`fgets` for text, `fwrite`/`fread` for binary.
- Always `fclose` what you open.

## Interview corner

**Q: Why is `while (!feof(fp))` considered wrong?**
`feof` only becomes true after a read has already failed, so the loop body runs once more with stale data. Check the return value of `fgets`, `fscanf` or `fread` instead.

**Q: What is the difference between text and binary mode?**
On Windows, text mode converts `\r\n` to `\n` when reading and back when writing; binary mode leaves bytes untouched. On Linux and macOS there's no difference.

## Practice

1. **Easy:** Write the numbers 1 to 10 to `numbers.txt`, one per line.
2. **Medium:** Read `numbers.txt` and print the sum.
3. **Hard:** Count the lines, words and characters in a file whose name is typed by the user, like the Unix `wc` command.

## Solutions

**1.**

```c
#include <stdio.h>

int main(void) {
    FILE *f = fopen("numbers.txt", "w");
    if (f == NULL) { perror("numbers.txt"); return 1; }
    for (int i = 1; i <= 10; i++) fprintf(f, "%d\n", i);
    fclose(f);
    return 0;
}
```

**2.**

```c
#include <stdio.h>

int main(void) {
    FILE *f = fopen("numbers.txt", "r");
    if (f == NULL) { perror("numbers.txt"); return 1; }
    int x, sum = 0;
    while (fscanf(f, "%d", &x) == 1) sum += x;
    fclose(f);
    printf("%d\n", sum);   /* 55 */
    return 0;
}
```

**3.**

```c
#include <stdio.h>
#include <ctype.h>

int main(void) {
    char path[260];
    if (scanf("%259s", path) != 1) return 1;
    FILE *f = fopen(path, "r");
    if (f == NULL) { perror(path); return 1; }

    long lines = 0, words = 0, chars = 0;
    int c, in_word = 0;
    while ((c = fgetc(f)) != EOF) {
        chars++;
        if (c == '\n') lines++;
        if (isspace(c)) {
            in_word = 0;
        } else if (!in_word) {
            in_word = 1;
            words++;
        }
    }
    fclose(f);
    printf("%ld %ld %ld\n", lines, words, chars);
    return 0;
}
```

<!-- lesson: argc-argv -->
Programs often take instructions when they start: `gcc main.c -o main` gives gcc three pieces of information. Your C programs can read these **command-line arguments** too.

**Real-life analogy:** ordering at a counter. "One masala dosa, extra chutney" tells the kitchen exactly what to make before they start. Command-line arguments are the order you give your program.

## main with arguments

```c
#include <stdio.h>

int main(int argc, char *argv[]) {
    printf("argc = %d\n", argc);
    for (int i = 0; i < argc; i++) {
        printf("argv[%d] = %s\n", i, argv[i]);
    }
    return 0;
}
```

Running `./greet hello world` gives:

```
argc = 3
argv[0] = ./greet
argv[1] = hello
argv[2] = world
```

- `argc` (argument count) includes the program name.
- `argv` (argument vector) is an array of strings. `argv[argc]` is always `NULL`.

## Example 2: a usage message

```c
#include <stdio.h>

int main(int argc, char *argv[]) {
    if (argc != 2) {
        fprintf(stderr, "Usage: %s <name>\n", argv[0]);
        return 1;
    }
    printf("Hello, %s!\n", argv[1]);
    return 0;
}
```

Running `./hello Meera` prints `Hello, Meera!`. Running `./hello` with no name prints the usage line and exits with code 1.

Printing errors to `stderr` instead of `stdout` keeps them separate from normal output.

## Example 3: numbers from arguments

Arguments always arrive as text. Convert them with `strtol`, which tells you if the text wasn't a valid number (unlike `atoi`, which silently returns 0):

```c
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {
    long total = 0;
    for (int i = 1; i < argc; i++) {
        char *end;
        long n = strtol(argv[i], &end, 10);
        if (end == argv[i] || *end != '\0') {
            fprintf(stderr, "Not a number: %s\n", argv[i]);
            return 1;
        }
        total += n;
    }
    printf("%ld\n", total);
    return 0;
}
```

`./sum 4 10 7` prints `21`. `./sum 4 ten` prints `Not a number: ten`.

## Running with arguments

```bash
gcc -Wall -Wextra -std=c11 sum.c -o sum
./sum 4 10 7
```

On Windows Command Prompt, run `sum.exe 4 10 7`.

## Common mistakes

- **Reading `argv[1]` without checking `argc`:** if no argument was given, it's `NULL` and the program crashes.
- **Using `atoi`:** it can't report bad input.
- **Forgetting that `argv[0]` is the program name,** so the first real argument is `argv[1]`.

## Key points

- `argc` counts arguments including the program name; `argv` holds them as strings.
- Always check `argc` before using `argv[i]`.
- Convert numbers with `strtol` and check for errors.

## Interview corner

**Q: What is `argv[0]`?**
Usually the name or path used to run the program. It's useful in usage messages.

**Q: Why prefer `strtol` over `atoi`?**
`strtol` reports where parsing stopped, so you can detect invalid input and overflow. `atoi` returns 0 for bad input, which is indistinguishable from a real 0.

## Practice

1. **Easy:** Print all arguments in reverse order.
2. **Medium:** Write `./max 4 19 7` that prints the largest number given.
3. **Hard:** Write `./calc 12 + 5` that supports `+`, `-`, `x` and `/` (use `x` because `*` has a special meaning in shells), with error messages for bad input.

## Solutions

**1.**

```c
#include <stdio.h>

int main(int argc, char *argv[]) {
    for (int i = argc - 1; i >= 1; i--) printf("%s ", argv[i]);
    printf("\n");
    return 0;
}
```

**2.**

```c
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {
    if (argc < 2) {
        fprintf(stderr, "Usage: %s <numbers...>\n", argv[0]);
        return 1;
    }
    long best = strtol(argv[1], NULL, 10);
    for (int i = 2; i < argc; i++) {
        long n = strtol(argv[i], NULL, 10);
        if (n > best) best = n;
    }
    printf("%ld\n", best);
    return 0;
}
```

**3.**

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, char *argv[]) {
    if (argc != 4 || strlen(argv[2]) != 1) {
        fprintf(stderr, "Usage: %s <a> <+|-|x|/> <b>\n", argv[0]);
        return 1;
    }
    char *end1, *end2;
    double a = strtod(argv[1], &end1);
    double b = strtod(argv[3], &end2);
    if (*end1 != '\0' || *end2 != '\0') {
        fprintf(stderr, "Both operands must be numbers\n");
        return 1;
    }
    switch (argv[2][0]) {
        case '+': printf("%g\n", a + b); break;
        case '-': printf("%g\n", a - b); break;
        case 'x': printf("%g\n", a * b); break;
        case '/':
            if (b == 0) { fprintf(stderr, "Cannot divide by zero\n"); return 1; }
            printf("%g\n", a / b);
            break;
        default:
            fprintf(stderr, "Unknown operator %s\n", argv[2]);
            return 1;
    }
    return 0;
}
```

<!-- lesson: macros -->
Before the compiler sees your code, the **preprocessor** rewrites it, following lines that start with `#`. You've used `#include`. This lesson covers `#define` macros, conditional compilation and include guards.

**Real-life analogy:** the preprocessor is find-and-replace in a word processor, run automatically before printing. It doesn't understand C; it just swaps text. That's what makes macros powerful, and occasionally dangerous.

## Object-like macros

```c
#define MAX_STUDENTS 60
#define APP_NAME "C Mastery"
```

Every `MAX_STUDENTS` in the code becomes `60` before compiling.

## Example 1: function-like macros, and why brackets matter

```c
#include <stdio.h>

#define BAD_SQUARE(x) x * x
#define SQUARE(x) ((x) * (x))
#define MAX(a, b) ((a) > (b) ? (a) : (b))

int main(void) {
    printf("%d\n", BAD_SQUARE(1 + 2));   /* 1 + 2 * 1 + 2 = 5, wrong */
    printf("%d\n", SQUARE(1 + 2));       /* ((1 + 2) * (1 + 2)) = 9 */
    printf("%d\n", MAX(7, 12));          /* 12 */
    return 0;
}
```

Output:

```
5
9
12
```

Wrap every parameter, and the whole body, in brackets.

## Example 2: the double-evaluation trap

A macro pastes its argument wherever the parameter appears, so side effects can happen twice:

```c
#include <stdio.h>

#define SQUARE(x) ((x) * (x))

static inline int square(int x) { return x * x; }

int main(void) {
    int i = 3, j = 3;
    int a = square(i++);   /* function: i++ happens once */
    printf("function: %d, i is now %d\n", a, i);
    printf("macro would run j++ twice, so avoid SQUARE(j++); j is %d\n", j);
    printf("%d\n", SQUARE(j));
    return 0;
}
```

Output:

```
function: 9, i is now 4
macro would run j++ twice, so avoid SQUARE(j++); j is 3
9
```

`SQUARE(j++)` would expand to `((j++) * (j++))`, which is undefined behaviour. Prefer `static inline` functions when you can: they're type-checked and evaluate arguments once.

## Example 3: conditional compilation for debug output

```c
#include <stdio.h>

#ifdef DEBUG
#define LOG(msg) printf("[%s:%d] %s\n", __FILE__, __LINE__, msg)
#else
#define LOG(msg) ((void)0)
#endif

int main(void) {
    LOG("starting");
    printf("Working...\n");
    LOG("finished");
    return 0;
}
```

Compiled normally, it prints only `Working...`. Compiled with `gcc -DDEBUG main.c`, it also prints the log lines with the file name and line number.

## Include guards

A header included twice would declare everything twice. Guards prevent that:

```c
/* student.h */
#ifndef STUDENT_H
#define STUDENT_H

typedef struct {
    char name[40];
    int roll;
} Student;

void print_student(const Student *s);

#endif
```

## Useful built-in macros

| Macro | Gives |
| --- | --- |
| `__FILE__` | current file name |
| `__LINE__` | current line number |
| `__DATE__`, `__TIME__` | when the file was compiled |
| `__func__` | current function name (strictly an identifier, not a macro) |

## Common mistakes

- **Missing brackets** in function-like macros.
- **A semicolon at the end** of a `#define`.
- **Arguments with side effects** passed to macros.
- **No include guards** in header files.

## Key points

- Macros are text replacement done before compiling.
- Bracket every parameter and the whole body.
- Prefer `const` variables and `static inline` functions where possible.
- Use `#ifdef` for optional code and include guards in every header.

## Interview corner

**Q: What is the difference between a macro and an inline function?**
A macro is text substitution with no type checking, and it may evaluate arguments several times. An inline function is a real function the compiler may expand in place; it's type-checked and evaluates each argument once.

**Q: What are include guards for?**
They stop a header's contents from being processed twice when it's included from several places, which would otherwise cause redefinition errors.

## Practice

1. **Easy:** Write a macro `IS_EVEN(n)` and use it to print the even numbers from 1 to 10.
2. **Medium:** Write a macro `ARRAY_LEN(a)` that gives the number of elements in an array, and use it in a loop.
3. **Hard:** Write a header `mathutil.h` with include guards declaring `int gcd(int a, int b);`, plus a program that defines and uses `gcd`.

## Solutions

**1.**

```c
#include <stdio.h>

#define IS_EVEN(n) ((n) % 2 == 0)

int main(void) {
    for (int i = 1; i <= 10; i++) {
        if (IS_EVEN(i)) printf("%d ", i);
    }
    printf("\n");
    return 0;
}
```

**2.**

```c
#include <stdio.h>

#define ARRAY_LEN(a) (sizeof(a) / sizeof((a)[0]))

int main(void) {
    int primes[] = {2, 3, 5, 7, 11, 13};
    for (size_t i = 0; i < ARRAY_LEN(primes); i++) printf("%d ", primes[i]);
    printf("\n");
    return 0;
}
```

**3.** `mathutil.h`:

```
#ifndef MATHUTIL_H
#define MATHUTIL_H
int gcd(int a, int b);
#endif
```

The program, with the header's contents shown inline so it compiles on its own:

```c
#include <stdio.h>

#ifndef MATHUTIL_H
#define MATHUTIL_H
int gcd(int a, int b);
#endif

int gcd(int a, int b) {
    while (b != 0) {
        int t = a % b;
        a = b;
        b = t;
    }
    return a;
}

int main(void) {
    printf("%d\n", gcd(84, 36));   /* 12 */
    return 0;
}
```

<!-- lesson: function-pointers -->
Functions live in memory too, so they have addresses. A **function pointer** stores a function's address, which lets you choose which function to call at runtime, or pass a function to another function.

**Real-life analogy:** a TV remote with programmable buttons. You can assign any channel to button 1. Pressing the button runs whatever was assigned. A function pointer is that button.

## Declaring a function pointer

```c
int (*op)(int, int);
```

Read it from the name outward: `op` is a pointer (`*op`) to a function taking `(int, int)` and returning `int`. The brackets around `*op` matter: `int *op(int, int)` would declare a function returning `int *`.

## Example 1: switching functions

```c
#include <stdio.h>

int add(int a, int b) { return a + b; }
int mul(int a, int b) { return a * b; }

int main(void) {
    int (*op)(int, int) = add;
    printf("%d\n", op(3, 4));   /* calls add */
    op = mul;
    printf("%d\n", op(3, 4));   /* calls mul */
    return 0;
}
```

Output:

```
7
12
```

## Example 2: an array of operations

`typedef` makes function pointer types readable:

```c
#include <stdio.h>

typedef int (*BinaryOp)(int, int);

int add(int a, int b) { return a + b; }
int sub(int a, int b) { return a - b; }
int mul(int a, int b) { return a * b; }

int main(void) {
    BinaryOp ops[] = {add, sub, mul};
    const char *names[] = {"add", "sub", "mul"};
    for (int i = 0; i < 3; i++) {
        printf("%s(10, 4) = %d\n", names[i], ops[i](10, 4));
    }
    return 0;
}
```

Output:

```
add(10, 4) = 14
sub(10, 4) = 6
mul(10, 4) = 40
```

This replaces a long `switch` with a lookup table.

## Example 3: callbacks with qsort

The standard library's `qsort` sorts anything, as long as you give it a **comparison function** that it calls back:

```c
#include <stdio.h>
#include <stdlib.h>

int ascending(const void *a, const void *b) {
    int x = *(const int *)a;
    int y = *(const int *)b;
    return (x > y) - (x < y);   /* -1, 0 or 1, without overflow */
}

int descending(const void *a, const void *b) {
    return ascending(b, a);
}

int main(void) {
    int data[] = {42, 7, 19, 3, 25};
    qsort(data, 5, sizeof data[0], ascending);
    for (int i = 0; i < 5; i++) printf("%d ", data[i]);
    printf("\n");
    qsort(data, 5, sizeof data[0], descending);
    for (int i = 0; i < 5; i++) printf("%d ", data[i]);
    printf("\n");
    return 0;
}
```

Output:

```
3 7 19 25 42
42 25 19 7 3
```

`void *` means "a pointer to anything". The comparison function casts it back to the real type.

## Common mistakes

- **Missing brackets** in the declaration: `int *f(int)` is not a function pointer.
- **Signature mismatch:** the pointer type must match the function's parameters and return type.
- **Returning `x - y` from a comparator:** it can overflow for large values. Use `(x > y) - (x < y)`.
- **Calling a NULL function pointer:** crashes. Check before calling if it might be unset.

## Key points

- `ret (*name)(params)` declares a function pointer.
- `typedef` makes them readable.
- Function pointers enable callbacks, lookup tables and plug-in behaviour.

## Interview corner

**Q: Where are function pointers used in real programs?**
Callbacks (`qsort`, event handlers, signal handlers), dispatch tables in interpreters and state machines, and plug-in systems. In embedded systems, interrupt vector tables are arrays of function pointers.

**Q: What does `qsort`'s comparison function return?**
A negative value if the first element should come first, zero if they're equal, and a positive value if the second should come first.

## Practice

1. **Easy:** Write `void apply(int *a, int n, int (*f)(int))` that replaces each element with `f(element)`, and use it to square an array.
2. **Medium:** Sort an array of strings alphabetically with `qsort` and `strcmp`.
3. **Hard:** Build a menu calculator: store `add`, `sub`, `mul` and `divide` in an array of function pointers and call the one matching the user's choice 1–4.

## Solutions

**1.**

```c
#include <stdio.h>

int square(int x) { return x * x; }

void apply(int *a, int n, int (*f)(int)) {
    for (int i = 0; i < n; i++) a[i] = f(a[i]);
}

int main(void) {
    int a[] = {1, 2, 3, 4};
    apply(a, 4, square);
    for (int i = 0; i < 4; i++) printf("%d ", a[i]);   /* 1 4 9 16 */
    printf("\n");
    return 0;
}
```

**2.** Each element is a `char *`, so the comparator receives pointers to `char *`.

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int by_name(const void *a, const void *b) {
    const char *x = *(const char *const *)a;
    const char *y = *(const char *const *)b;
    return strcmp(x, y);
}

int main(void) {
    const char *names[] = {"Rohan", "Asha", "Meera", "Dev"};
    qsort(names, 4, sizeof names[0], by_name);
    for (int i = 0; i < 4; i++) printf("%s ", names[i]);   /* Asha Dev Meera Rohan */
    printf("\n");
    return 0;
}
```

**3.**

```c
#include <stdio.h>

double add(double a, double b) { return a + b; }
double sub(double a, double b) { return a - b; }
double mul(double a, double b) { return a * b; }
double divide(double a, double b) { return b != 0 ? a / b : 0; }

int main(void) {
    double (*ops[])(double, double) = {add, sub, mul, divide};
    int choice;
    double a, b;
    printf("1) add 2) subtract 3) multiply 4) divide: ");
    if (scanf("%d %lf %lf", &choice, &a, &b) != 3 || choice < 1 || choice > 4) {
        printf("Invalid input\n");
        return 1;
    }
    if (choice == 4 && b == 0) {
        printf("Cannot divide by zero\n");
        return 1;
    }
    printf("%.2f\n", ops[choice - 1](a, b));
    return 0;
}
```

<!-- lesson: capstone -->
Time to bring everything together. You'll build a **Student Record Manager**, a complete command-line program that stores student records in a file. It uses structs, pointers, dynamic memory, files, functions and multi-file builds: everything from this course.

**Why this project:** it's the kind of program companies ask freshers to explain in interviews, and it makes a solid portfolio piece on GitHub.

## What it must do

1. Show a menu: **Add, List, Search, Update, Delete, Save, Quit**.
2. Store each student as a struct: roll number, name and CGPA.
3. Keep records in a **dynamic array** that grows with `realloc`.
4. **Save** records to `students.dat` and **load** them when the program starts.
5. Search by roll number, and by part of a name.
6. Validate everything: reject a CGPA outside 0–10, duplicate roll numbers and empty names.

## Suggested files

| File | Contains |
| --- | --- |
| `student.h` | the struct, the `StudentList` type and function prototypes, with include guards |
| `student.c` | add, find, update, delete, sort |
| `storage.c` | load and save |
| `main.c` | the menu loop and input handling |

Build them together:

```bash
gcc -Wall -Wextra -std=c11 main.c student.c storage.c -o records
```

## Starter code

This single-file starter compiles and runs. It already has the data types, `add`, `list` and a basic menu. Your job is to add the rest, then split it into the files above.

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    int roll;
    char name[40];
    float cgpa;
} Student;

typedef struct {
    Student *items;
    size_t len, cap;
} StudentList;

int find_index(const StudentList *list, int roll) {
    for (size_t i = 0; i < list->len; i++) {
        if (list->items[i].roll == roll) return (int)i;
    }
    return -1;
}

int add_student(StudentList *list, Student s) {
    if (s.cgpa < 0 || s.cgpa > 10 || s.name[0] == '\0') return -1;
    if (find_index(list, s.roll) >= 0) return -2;
    if (list->len == list->cap) {
        size_t nc = list->cap ? list->cap * 2 : 4;
        Student *tmp = realloc(list->items, nc * sizeof *tmp);
        if (tmp == NULL) return -3;
        list->items = tmp;
        list->cap = nc;
    }
    list->items[list->len++] = s;
    return 0;
}

void list_students(const StudentList *list) {
    if (list->len == 0) {
        printf("No students yet.\n");
        return;
    }
    printf("%-6s %-20s %s\n", "Roll", "Name", "CGPA");
    for (size_t i = 0; i < list->len; i++) {
        const Student *s = &list->items[i];
        printf("%-6d %-20s %.2f\n", s->roll, s->name, s->cgpa);
    }
}

int main(void) {
    StudentList list = {NULL, 0, 0};
    int choice;
    do {
        printf("\n1) Add  2) List  0) Quit\nChoice: ");
        if (scanf("%d", &choice) != 1) break;
        if (choice == 1) {
            Student s;
            printf("Roll, name (one word), CGPA: ");
            if (scanf("%d %39s %f", &s.roll, s.name, &s.cgpa) != 3) break;
            int r = add_student(&list, s);
            if (r == 0) printf("Added.\n");
            else if (r == -1) printf("Invalid name or CGPA.\n");
            else if (r == -2) printf("Roll %d already exists.\n", s.roll);
            else printf("Out of memory.\n");
        } else if (choice == 2) {
            list_students(&list);
        }
    } while (choice != 0);
    free(list.items);
    return 0;
}
```

## Milestones

1. **Run the starter.** Add two students and list them.
2. **Search and update.** Find by roll number; update a student's CGPA with validation.
3. **Delete.** Remove a student by moving the later elements down one place.
4. **Save and load.** Write `len`, then the array, with `fwrite`; read them back with `fread` at start-up. Handle a missing file gracefully.
5. **Sort.** Sort by CGPA (highest first) with `qsort` and a comparison function.
6. **Name search.** Use `strstr` to find all students whose name contains some text.
7. **Split into files** with a header and include guards.
8. **Check for memory bugs:** build with `-g -fsanitize=address` and run every menu option.

## Grading rubric

| Area | What "done" looks like |
| --- | --- |
| Correctness | every menu option works, and data survives restarting the program |
| Validation | bad input never crashes the program or corrupts data |
| Memory | no leaks or errors under AddressSanitizer |
| Code quality | no warnings with `-Wall -Wextra`; small, well-named functions |
| Structure | separate `.c` files and a header with include guards |

## Interview corner

Be ready to answer these about your project:

- **Why a dynamic array instead of a fixed-size array?** It grows to fit any number of students and doesn't waste memory.
- **Why is `realloc` assigned to a temporary pointer?** So the original data isn't lost if allocation fails.
- **What happens if `students.dat` is missing or corrupted?** Explain how your load function detects and handles it.
- **How would you make search faster for thousands of students?** Keep the array sorted by roll number and use binary search, or use a hash table.

## Stretch goals

- Read full names with spaces using `fgets`.
- Export the records as a CSV file that opens in a spreadsheet.
- Add a command-line mode: `./records list` or `./records add 104 Asha 9.2`.

When you're finished, put it on GitHub with a short README explaining how to build and use it.
