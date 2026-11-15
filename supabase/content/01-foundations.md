<!-- lesson: how-c-compiles -->
A C program goes through four stages before it runs. Knowing them explains most confusing compiler and linker errors.

## 1. Preprocessing

Lines starting with `#` are handled first. `#include <stdio.h>` pastes the header file in, and `#define` macros are expanded. You can see the result:

```bash
gcc -E main.c -o main.i
```

## 2. Compilation

The compiler turns the preprocessed C into assembly code and reports syntax and type errors, such as a missing semicolon.

## 3. Assembly

The assembler turns assembly into an **object file** (`main.o`) containing machine code.

## 4. Linking

The linker joins your object files with the C standard library to make an executable. An `undefined reference to 'foo'` error comes from this stage: a function was declared but never defined.

```bash
gcc -Wall -Wextra -std=c11 main.c -o main
./main
```

## Key points

- Compiler errors point at a line of your code.
- Linker errors mean something was declared but not defined or not linked.
- Always compile with `-Wall -Wextra`: warnings catch real bugs.

## Try it

Write a program that calls a function `greet()` but never defines it. Compile it and read the error. Which stage reported it?

<!-- lesson: first-program -->
Every C program starts running at a function called `main`. Here is the smallest useful program:

```c
#include <stdio.h>

int main(void) {
    printf("Hello, C!\n");
    return 0;
}
```

## Line by line

- `#include <stdio.h>` gives you `printf`, declared in the standard input/output header.
- `int main(void)` defines `main`. It takes no arguments and returns an `int`.
- `printf("Hello, C!\n");` prints text. `\n` is a newline.
- `return 0;` tells the operating system the program succeeded. Any non-zero value means failure.

## Statements and blocks

Each statement ends with a semicolon. Curly braces `{ }` group statements into a block, here the body of `main`.

## Comments

```c
// A single-line comment
/* A comment that can
   span several lines */
```

## Key points

- Execution starts at `main`.
- Forgetting `#include <stdio.h>` gives an "implicit declaration of printf" warning.
- `return 0;` from `main` means success.

## Try it

Change the program to print your name on one line and your city on the next, using a single `printf`.

<!-- lesson: variables-types -->
A variable is a named piece of memory with a **type**. The type decides how much memory it uses and what values it can hold.

```c
#include <stdio.h>

int main(void) {
    int age = 20;          // whole numbers
    double cgpa = 8.7;     // decimal numbers
    char grade = 'A';      // a single character
    printf("%d %.1f %c\n", age, cgpa, grade);
    return 0;
}
```

## Common types

| Type | Typical size | Holds |
| --- | --- | --- |
| `char` | 1 byte | a character or small integer |
| `int` | 4 bytes | whole numbers, about ±2 billion |
| `long long` | 8 bytes | very large whole numbers |
| `float` | 4 bytes | decimals, about 7 digits |
| `double` | 8 bytes | decimals, about 15 digits |

Sizes depend on the platform. The standard only guarantees minimums, so measure them.

## sizeof

`sizeof` gives the size in bytes of a type or variable. Its result has type `size_t`, printed with `%zu`.

```c
printf("int: %zu bytes\n", sizeof(int));
printf("double: %zu bytes\n", sizeof cgpa);
```

## Initialise before use

A local variable that isn't initialised holds garbage. Reading it is undefined behaviour.

```c
int total;        // garbage
int count = 0;    // safe
```

## Key points

- Pick `int` for counts, `double` for measurements.
- Use `sizeof` instead of assuming sizes.
- Always initialise local variables.

## Try it

Print the size of `char`, `short`, `int`, `long`, `long long`, `float` and `double` on your machine.

<!-- lesson: printf-scanf -->
`printf` writes formatted output and `scanf` reads formatted input. Both use **format specifiers** that must match the variable's type.

| Specifier | Type |
| --- | --- |
| `%d` | `int` |
| `%ld` / `%lld` | `long` / `long long` |
| `%u` | `unsigned int` |
| `%f` | `double` in printf |
| `%lf` | `double` in scanf |
| `%c` | `char` |
| `%s` | string (`char` array) |
| `%zu` | `size_t` |
| `%p` | pointer (cast to `void *`) |

## Width and precision

```c
printf("[%5d]\n", 42);      // [   42]
printf("[%-5d]\n", 42);     // [42   ]
printf("%.2f\n", 3.14159);  // 3.14
```

## Reading input

`scanf` needs the **address** of each variable, written with `&`:

```c
int age;
double height;
scanf("%d %lf", &age, &height);
```

Strings are the exception: an array name is already an address. Always limit the width to avoid overflowing the buffer:

```c
char name[20];
scanf("%19s", name);   // reads at most 19 chars + '\0'
```

## Check the return value

`scanf` returns how many values it read. Use it to detect bad input:

```c
if (scanf("%d", &age) != 1) {
    printf("Please enter a number\n");
}
```

## Key points

- A mismatched specifier is undefined behaviour.
- Use `%lf` for `double` in scanf, `%f` in printf.
- Forgetting `&` in scanf usually crashes the program.

## Try it

Read two integers and print their sum, difference, product and quotient to 2 decimal places.

<!-- lesson: constants-casting -->
## Constants

Use `const` for values that must not change, and `#define` for compile-time constants:

```c
#define MAX_STUDENTS 60
const double PI = 3.14159;
```

Assigning to `PI` later is a compile error, which protects you from mistakes.

## Literals

- Integer: `42`, `0x2A` (hex), `052` (octal: a leading 0 changes the base!)
- Long: `42L`, unsigned: `42u`
- Floating: `3.14` is a `double`, `3.14f` is a `float`
- Character: `'A'`, `'\n'`, `'\0'`

## Implicit conversion

When types mix, C converts the smaller type to the larger one:

```c
int a = 7;
double b = a / 2;     // 3.0  -- integer division happens first
double c = a / 2.0;   // 3.5  -- 2.0 is double, so a is converted
```

## Explicit casting

A cast converts a value on purpose:

```c
int total = 7, count = 2;
double avg = (double)total / count;   // 3.5
```

Casting a `double` to `int` drops the fractional part (it truncates toward zero):

```c
int n = (int)3.99;   // 3
```

## Key points

- Integer divided by integer gives an integer.
- Cast one operand to `double` to get a decimal result.
- A leading `0` makes a number octal: `010` is 8.

## Try it

Read the marks of 3 subjects as integers and print the average to 2 decimal places, without losing the fraction.

<!-- lesson: foundations-quiz -->
Test yourself on Module 1. Write down your answers, then check them at the bottom.

## Questions

1. Which stage reports `undefined reference to 'calculate'`: the compiler or the linker?
2. What does `return 0;` from `main` mean?
3. What is the output of `printf("%d", 7 / 2);`?
4. Which specifier reads a `double` with `scanf`?
5. Why is `scanf("%d", age);` wrong?
6. What does `sizeof(char)` always equal?
7. What is the value of `010` in C?
8. What does `(int)9.8` evaluate to?

## Answers

1. The linker: the function was declared but never defined.
2. The program finished successfully.
3. `3`, because integer division discards the remainder.
4. `%lf`.
5. scanf needs the address, `&age`, to store the value.
6. `1`, by definition.
7. `8`: a leading zero means octal.
8. `9`: casting to int truncates toward zero.

Got 6 or more right? Mark this quiz complete and move on to Module 2.
