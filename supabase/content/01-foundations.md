<!-- lesson: how-c-compiles -->
Before your C code can run, it has to be turned into machine instructions your computer understands. This happens in four stages. Knowing them helps you read error messages and fix them faster.

**Real-life analogy:** think of making a printed book. First an editor gathers all the chapters and notes (preprocessing). A translator turns the text into the printer's language (compiling). The printer makes the pages (assembling). Finally a binder puts every page, including borrowed ones, into one book (linking).

## The four stages

| Stage | Input | Output | What it does |
| --- | --- | --- | --- |
| 1. Preprocess | `main.c` | expanded C code | Handles `#include` and `#define` lines |
| 2. Compile | expanded C | assembly code | Checks grammar and types, reports most errors |
| 3. Assemble | assembly | `main.o` (object file) | Turns assembly into machine code |
| 4. Link | `main.o` + libraries | `main` (program) | Joins your code with library code like `printf` |

New words:
- **Header file** (`.h`): a file of declarations, such as `stdio.h`, that tells the compiler what functions exist.
- **Object file** (`.o`): machine code for one source file, not yet runnable.
- **Executable**: the final program you can run.

## Example 1: build in one step

```c
#include <stdio.h>

int main(void) {
    printf("Hello from C!\n");
    return 0;
}
```

```bash
gcc -Wall -Wextra -std=c11 main.c -o main
./main
```

Output:

```
Hello from C!
```

`-Wall -Wextra` turns on helpful warnings, `-std=c11` picks the C language version, and `-o main` names the program.

## Example 2: watch each stage

```bash
gcc -E main.c -o main.i     # 1. preprocess only
gcc -S main.i -o main.s     # 2. compile to assembly
gcc -c main.s -o main.o     # 3. assemble to object file
gcc main.o -o main          # 4. link into a program
```

Open `main.i` in a text editor: the single `#include` line has become hundreds of lines copied from `stdio.h`.

## Example 3: a linker error

```c
#include <stdio.h>

void greet(void);   /* declared, but never defined */

int main(void) {
    greet();
    return 0;
}
```

The compiler is happy, because it knows `greet` exists. The linker fails:

```
undefined reference to `greet'
```

The fix is to write the function body, or add the file that contains it to the gcc command.

## Common mistakes

- **Reading only the last error.** Fix the **first** error first; later ones are often caused by it.
- **Ignoring warnings.** A warning like "implicit declaration of function" usually means a missing `#include`.
- **Mixing up compiler and linker errors.** Compiler errors show a line number in your file. Linker errors mention "undefined reference".

## Key points

- C goes through preprocess, compile, assemble and link.
- Compile with `gcc -Wall -Wextra -std=c11`.
- "undefined reference" means something is declared but never defined.

## Interview corner

**Q: What is the difference between a compiler error and a linker error?**
A compiler error is a problem inside one file, such as bad syntax or wrong types. A linker error happens when combining files, usually because a function was declared but its definition can't be found.

**Q: What does the preprocessor do?**
It handles lines starting with `#` before compilation: it pastes in header files, expands macros and removes comments.

## Practice

1. **Easy:** Write a program that prints `Compiled successfully!`. Build it with the warning flags.
2. **Medium:** Write a program with a function `square` declared at the top and defined below `main`. Print `square(9)`.
3. **Hard:** Split the program from problem 2 into two files: `main.c` with `main`, and `math.c` with `square`. Build them together.

## Solutions

**1.**

```c
#include <stdio.h>

int main(void) {
    printf("Compiled successfully!\n");
    return 0;
}
```

**2.**

```c
#include <stdio.h>

int square(int x);

int main(void) {
    printf("%d\n", square(9));   /* 81 */
    return 0;
}

int square(int x) {
    return x * x;
}
```

**3.** `math.c` contains only the `square` definition. `main.c` keeps the prototype `int square(int x);` and `main`. Build both:

```bash
gcc -Wall -Wextra -std=c11 main.c math.c -o main
```

<!-- lesson: first-program -->
Every C program starts running at one special function called `main`. In this lesson you'll write your first program and understand every character in it.

**Real-life analogy:** a program is like a recipe. `#include` lists the tools you borrow from the kitchen, `main` is "start here", and each statement is one step of the recipe.

## The smallest useful program

```c
#include <stdio.h>

int main(void) {
    printf("Hello, C!\n");
    return 0;
}
```

Output:

```
Hello, C!
```

## Line by line

| Code | Meaning |
| --- | --- |
| `#include <stdio.h>` | Brings in the standard input/output library, which provides `printf` |
| `int main(void)` | Defines `main`: it takes nothing (`void`) and gives back a whole number (`int`) |
| `{ ... }` | Curly braces group the statements that belong to `main` |
| `printf("Hello, C!\n");` | Prints text. `\n` means "new line" |
| `return 0;` | Tells the operating system the program finished successfully |

New words:
- **Function**: a named block of code that does a job. `main` and `printf` are functions.
- **Statement**: one instruction. Each statement ends with a semicolon `;`.
- **String**: text inside double quotes, like `"Hello"`.

## Example 2: several lines

```c
#include <stdio.h>

int main(void) {
    printf("Name: Priya\n");
    printf("City: Chennai\n");
    printf("Course: C Mastery\n");
    return 0;
}
```

Output:

```
Name: Priya
City: Chennai
Course: C Mastery
```

## Escape sequences

Some characters need a backslash inside strings:

| Sequence | Prints |
| --- | --- |
| `\n` | a new line |
| `\t` | a tab |
| `\"` | a double quote |
| `\\` | a backslash |

```c
printf("She said \"hi\"\tand left.\n");
```

Output:

```
She said "hi"	and left.
```

## Comments

Comments are notes for humans. The compiler ignores them.

```c
// a comment until the end of the line
/* a comment that can
   span several lines */
```

## Common mistakes

- **Missing semicolon:** `printf("Hi")` without `;` gives "expected ';'".
- **Missing `#include <stdio.h>`:** gives a warning about an implicit declaration of `printf`.
- **Writing `Main` or `MAIN`:** C is case-sensitive; it must be `main`.
- **Forgetting `\n`:** the next output, or your terminal prompt, appears on the same line.

## Key points

- Execution always starts at `main`.
- Statements end with `;`, blocks are wrapped in `{ }`.
- `return 0;` from `main` means success.

## Interview corner

**Q: What does `return 0;` in `main` mean?**
It reports success to the operating system. A non-zero value signals an error, which scripts can check.

**Q: Is `void main()` correct?**
No. The C standard says `main` returns `int`. Some compilers accept `void main()`, but it is not portable.

## Practice

1. **Easy:** Print your name, college and favourite programming language on three lines.
2. **Medium:** Print a small box using `+`, `-` and `|` characters.
3. **Hard:** Print this exact line, including the quotes and backslash: `Path: "C:\Users\Arjun"`

## Solutions

**1.**

```c
#include <stdio.h>

int main(void) {
    printf("Arjun Mehta\n");
    printf("VIT Vellore\n");
    printf("C\n");
    return 0;
}
```

**2.**

```c
#include <stdio.h>

int main(void) {
    printf("+-------+\n");
    printf("|  C!   |\n");
    printf("+-------+\n");
    return 0;
}
```

**3.**

```c
#include <stdio.h>

int main(void) {
    printf("Path: \"C:\\Users\\Arjun\"\n");
    return 0;
}
```

<!-- lesson: variables-types -->
Programs need to remember things: a score, a price, a letter grade. A **variable** is a named box in memory that holds a value. Its **type** says what kind of value fits in the box and how big the box is.

**Real-life analogy:** variables are labelled containers in a kitchen. A small jar holds salt (a `char`), a bigger tin holds rice (an `int`), and a measuring jug holds milk with exact amounts (a `double`). You must pick the container before you fill it.

## Declaring and using variables

```c
#include <stdio.h>

int main(void) {
    int age = 20;          /* whole number */
    double cgpa = 8.75;    /* number with decimals */
    char grade = 'A';      /* one character, in single quotes */

    printf("Age: %d\n", age);
    printf("CGPA: %.2f\n", cgpa);
    printf("Grade: %c\n", grade);
    return 0;
}
```

Output:

```
Age: 20
CGPA: 8.75
Grade: A
```

## Common types

| Type | Typical size | Example values | Use it for |
| --- | --- | --- | --- |
| `char` | 1 byte | `'A'`, `'7'`, `'\n'` | single characters |
| `int` | 4 bytes | `-5`, `0`, `2026` | counts, ages, marks |
| `long long` | 8 bytes | `9000000000` | very large whole numbers |
| `float` | 4 bytes | `3.14f` | decimals (about 7 digits) |
| `double` | 8 bytes | `3.14159265` | decimals (about 15 digits) |

Sizes can differ between computers. The C standard only promises minimum sizes, so measure them with `sizeof`.

## Example 2: sizeof

`sizeof` tells you how many bytes a type or variable uses. Print the result with `%zu`.

```c
#include <stdio.h>

int main(void) {
    printf("char:      %zu\n", sizeof(char));
    printf("int:       %zu\n", sizeof(int));
    printf("long long: %zu\n", sizeof(long long));
    printf("double:    %zu\n", sizeof(double));
    return 0;
}
```

Typical output on a 64-bit PC:

```
char:      1
int:       4
long long: 8
double:    8
```

## Example 3: changing a variable

```c
#include <stdio.h>

int main(void) {
    int balance = 1000;
    balance = balance + 250;   /* deposit */
    balance = balance - 100;   /* withdrawal */
    printf("Balance: %d\n", balance);
    return 0;
}
```

Output:

```
Balance: 1150
```

## Naming rules

- Use letters, digits and `_`, but don't start with a digit: `total2` is fine, `2total` is not.
- Names are case-sensitive: `marks` and `Marks` are different.
- Keywords like `int` or `return` can't be names.
- Choose meaningful names: `total_marks` beats `t`.

## Common mistakes

- **Using a variable before giving it a value.** `int total; printf("%d", total);` prints garbage. Always initialise: `int total = 0;`.
- **Integer overflow.** An `int` can't hold 3 billion. Use `long long` for very large numbers.
- **Double quotes for a char.** `char c = "A";` is wrong; use single quotes `'A'`.

## Key points

- Every variable has a name, a type and a value.
- Use `int` for counting and `double` for measurements.
- `sizeof` gives the size in bytes; print it with `%zu`.
- Always initialise local variables.

## Interview corner

**Q: What is the size of `int`?**
It depends on the platform. It's usually 4 bytes today, but the standard only guarantees at least 2. Use `sizeof(int)` to check.

**Q: What is the difference between `float` and `double`?**
`double` has about twice the precision (15–16 significant digits versus about 7) and usually takes 8 bytes instead of 4. Prefer `double` unless memory is very tight.

## Practice

1. **Easy:** Store your age, height in metres and blood group letter in variables, then print them.
2. **Medium:** Print the size in bytes of `short`, `int`, `long`, `float` and `double`.
3. **Hard:** A shop has 3 items priced 249, 1299 and 75 rupees. Store them in variables, then print the total and the total after a 10% discount, with 2 decimal places.

## Solutions

**1.**

```c
#include <stdio.h>

int main(void) {
    int age = 20;
    double height = 1.72;
    char blood_group = 'O';
    printf("Age %d, height %.2f m, blood group %c\n", age, height, blood_group);
    return 0;
}
```

**2.**

```c
#include <stdio.h>

int main(void) {
    printf("short:  %zu\n", sizeof(short));
    printf("int:    %zu\n", sizeof(int));
    printf("long:   %zu\n", sizeof(long));
    printf("float:  %zu\n", sizeof(float));
    printf("double: %zu\n", sizeof(double));
    return 0;
}
```

**3.**

```c
#include <stdio.h>

int main(void) {
    int a = 249, b = 1299, c = 75;
    int total = a + b + c;
    double discounted = total * 0.90;
    printf("Total: %d\n", total);                  /* 1623 */
    printf("After discount: %.2f\n", discounted);  /* 1460.70 */
    return 0;
}
```

<!-- lesson: printf-scanf -->
`printf` shows information on the screen and `scanf` reads what the user types. Both use **format specifiers**, little codes starting with `%` that say what type of value goes where.

**Real-life analogy:** a format string is like a form with blanks: "Name: ____, Age: ____". The specifiers are the blanks, and the values you pass fill them in order.

## Format specifiers

| Specifier | Type | Example |
| --- | --- | --- |
| `%d` | `int` | `42` |
| `%lld` | `long long` | `9000000000` |
| `%u` | `unsigned int` | `42` |
| `%f` | `double` (printf) | `3.140000` |
| `%lf` | `double` (scanf) | reads `3.14` |
| `%c` | `char` | `A` |
| `%s` | string | `Priya` |
| `%zu` | `size_t` (from `sizeof`) | `4` |
| `%p` | address (cast to `void *`) | `0x7ffd...` |
| `%%` | a literal `%` sign | `%` |

## Example 1: formatting output

```c
#include <stdio.h>

int main(void) {
    int marks = 87;
    double pct = 87.456;
    printf("[%d]\n", marks);      /* plain */
    printf("[%5d]\n", marks);     /* width 5, right-aligned */
    printf("[%-5d]\n", marks);    /* width 5, left-aligned */
    printf("[%05d]\n", marks);    /* pad with zeros */
    printf("[%.1f%%]\n", pct);    /* 1 decimal place and a % sign */
    return 0;
}
```

Output:

```
[87]
[   87]
[87   ]
[00087]
[87.5%]
```

## Example 2: reading input

`scanf` needs the **address** of each variable so it knows where to store the value. You get an address with `&`.

```c
#include <stdio.h>

int main(void) {
    int age;
    double height;
    printf("Enter age and height: ");
    scanf("%d %lf", &age, &height);
    printf("You are %d years old and %.2f m tall.\n", age, height);
    return 0;
}
```

Input `20 1.75` gives:

```
You are 20 years old and 1.75 m tall.
```

## Example 3: reading a word safely

A string variable is a `char` array, and its name already acts as an address, so no `&`. Always set a maximum width so long input can't overflow the array:

```c
#include <stdio.h>

int main(void) {
    char name[20];
    printf("Your first name: ");
    scanf("%19s", name);          /* at most 19 letters + the end marker */
    printf("Welcome, %s!\n", name);
    return 0;
}
```

`%s` stops at the first space. To read a full line with spaces, use `fgets`, covered in the Strings lesson.

## Checking that input worked

`scanf` returns how many values it successfully read:

```c
if (scanf("%d", &age) != 1) {
    printf("That wasn't a number.\n");
    return 1;
}
```

## Common mistakes

- **Forgetting `&`:** `scanf("%d", age);` usually crashes. Write `&age`.
- **Wrong specifier:** using `%d` for a `double`, or `%f` with scanf for a `double`, gives wrong values. scanf needs `%lf`.
- **No width on `%s`:** `scanf("%s", name)` can overflow the array.
- **Leftover newline with `%c`:** after reading a number, `scanf("%c", &ch)` reads the Enter key. Use `" %c"` with a space to skip it.

## Key points

- Specifiers must match the variable's type exactly.
- scanf needs addresses: `&age`, but just `name` for strings.
- Check scanf's return value to catch bad input.

## Interview corner

**Q: Why does scanf need `&` but printf doesn't?**
scanf must write into your variable, so it needs its address. printf only reads the value, so a copy is enough.

**Q: Why is `%lf` used in scanf but `%f` works in printf for a double?**
When passed to printf, a `float` is automatically converted to `double`, so `%f` covers both. scanf receives addresses, and a `float *` and `double *` point to different sizes, so it needs `%f` for float and `%lf` for double.

## Practice

1. **Easy:** Read two integers and print their sum.
2. **Medium:** Read a price and a quantity, then print a bill line like `3 x 49.50 = 148.50`.
3. **Hard:** Read a temperature in Celsius and print it in Fahrenheit with 1 decimal place. Print an error if the input isn't a number.

## Solutions

**1.**

```c
#include <stdio.h>

int main(void) {
    int a, b;
    scanf("%d %d", &a, &b);
    printf("%d\n", a + b);
    return 0;
}
```

**2.**

```c
#include <stdio.h>

int main(void) {
    double price;
    int qty;
    scanf("%lf %d", &price, &qty);
    printf("%d x %.2f = %.2f\n", qty, price, qty * price);
    return 0;
}
```

**3.**

```c
#include <stdio.h>

int main(void) {
    double c;
    if (scanf("%lf", &c) != 1) {
        printf("Please enter a number.\n");
        return 1;
    }
    printf("%.1f F\n", c * 9.0 / 5.0 + 32.0);
    return 0;
}
```

<!-- lesson: constants-casting -->
Some values should never change, like the number of days in a week. Other times you need to turn one type into another, like an integer into a decimal. This lesson covers both.

**Real-life analogy:** a constant is a value carved in stone. Casting is like pouring water from a big jug into a small glass: it works, but whatever doesn't fit (the decimal part) spills away.

## Constants

```c
#define DAYS_IN_WEEK 7          /* replaced by the preprocessor */
const double GST_RATE = 0.18;   /* a read-only variable */
```

- `#define` is a text replacement done before compiling. It has no type.
- `const` creates a typed variable you can't change. Trying `GST_RATE = 0.2;` is a compile error.
- Write constant names in CAPITALS so readers spot them.

## Literals

A **literal** is a value written directly in the code.

| Literal | Type | Note |
| --- | --- | --- |
| `42` | `int` | decimal |
| `0x2A` | `int` | hexadecimal, equals 42 |
| `052` | `int` | octal! A leading 0 changes the base; equals 42 |
| `42LL` | `long long` | |
| `3.5` | `double` | decimals default to double |
| `3.5f` | `float` | |
| `'A'` | `char` (stored as 65) | |

## Example 1: integer division surprise

```c
#include <stdio.h>

int main(void) {
    int total = 7, count = 2;
    printf("%d\n", total / count);             /* 3: decimals dropped */
    printf("%.2f\n", total / 2.0);             /* 3.50: 2.0 is a double */
    printf("%.2f\n", (double)total / count);   /* 3.50: cast first */
    return 0;
}
```

Output:

```
3
3.50
3.50
```

When both operands are integers, C does integer division and throws away the remainder. If either side is a `double`, the other is converted automatically and you get a decimal result.

## Example 2: casting

A **cast** converts a value on purpose. Write the target type in brackets:

```c
#include <stdio.h>

int main(void) {
    double price = 99.99;
    int rupees = (int)price;      /* 99: the fraction is dropped, not rounded */
    char letter = (char)66;       /* 'B' */
    printf("%d %c\n", rupees, letter);
    return 0;
}
```

Output:

```
99 B
```

To round instead of truncating, add 0.5 before casting (for positive numbers), or use `round()` from `<math.h>`.

## Example 3: GST calculator

```c
#include <stdio.h>

#define GST_PERCENT 18

int main(void) {
    int base = 499;
    double gst = base * GST_PERCENT / 100.0;
    printf("Base: %d, GST: %.2f, Total: %.2f\n", base, gst, base + gst);
    return 0;
}
```

Output:

```
Base: 499, GST: 89.82, Total: 588.82
```

## Common mistakes

- **Expecting `7 / 2` to be 3.5.** It's 3. Make one side a double.
- **Casting too late:** `(double)(7 / 2)` is `3.0`, because the division already happened in integers.
- **Leading zeros:** `int pin = 0123;` is octal 83, not 123.
- **A semicolon in `#define`:** `#define MAX 10;` pastes `10;` everywhere and causes strange errors.

## Key points

- Use `const` or `#define` for values that never change.
- Integer divided by integer gives an integer.
- Cast one operand before dividing: `(double)a / b`.
- Casting a double to int truncates toward zero.

## Interview corner

**Q: What is the difference between `#define` and `const`?**
`#define` is text replacement by the preprocessor, with no type or scope. `const` is a real typed variable checked by the compiler and visible in a debugger. Prefer `const` for typed values.

**Q: What does `(int)-3.7` give?**
`-3`. Casting truncates toward zero, so it doesn't round down to `-4`.

## Practice

1. **Easy:** Read marks in 3 subjects as integers and print the average with 2 decimal places.
2. **Medium:** Read a number of seconds and print it as hours, minutes and seconds, like `3725` → `1h 2m 5s`.
3. **Hard:** Read a price in rupees with paise, like `149.75`, and print the whole rupees and the paise separately: `149 rupees 75 paise`.

## Solutions

**1.**

```c
#include <stdio.h>

int main(void) {
    int a, b, c;
    scanf("%d %d %d", &a, &b, &c);
    printf("%.2f\n", (a + b + c) / 3.0);
    return 0;
}
```

**2.**

```c
#include <stdio.h>

int main(void) {
    int s;
    scanf("%d", &s);
    printf("%dh %dm %ds\n", s / 3600, (s % 3600) / 60, s % 60);
    return 0;
}
```

**3.** Converting to whole paise first avoids floating-point surprises such as 74.999.

```c
#include <stdio.h>

int main(void) {
    double price;
    scanf("%lf", &price);
    int total_paise = (int)(price * 100 + 0.5);
    printf("%d rupees %d paise\n", total_paise / 100, total_paise % 100);
    return 0;
}
```

<!-- lesson: foundations-quiz -->
Check what you've learned in Module 1. Try each question on paper first, then read the answers and explanations at the bottom.

## Questions

1. Which stage reports `undefined reference to 'calculate'`: the compiler or the linker?
2. What does `return 0;` at the end of `main` tell the operating system?
3. What does this print? `printf("%d", 7 / 2);`
4. What does this print? `printf("%.1f", 7 / 2.0);`
5. Which specifier reads a `double` with `scanf`?
6. What is wrong with `scanf("%d", age);`?
7. What does `sizeof(char)` always equal?
8. What is the value of the literal `010`?
9. What does `(int)9.99` evaluate to?
10. What does this print? `printf("[%4d]", 7);`
11. Why is `scanf("%s", name);` risky, and how do you fix it?
12. What's the problem with `#define MAX 100;`?

## Answers

1. **The linker.** The code compiled, but the definition of `calculate` was never found when joining the pieces.
2. **Success.** Non-zero values mean something went wrong.
3. **`3`.** Both operands are integers, so the remainder is discarded.
4. **`3.5`.** `2.0` is a double, so the division is done with decimals.
5. **`%lf`.** (`%f` is for `float` in scanf.)
6. **Missing `&`.** scanf needs the address: `scanf("%d", &age);`.
7. **`1`**, by definition of the language.
8. **`8`.** A leading zero means octal (base 8).
9. **`9`.** Casting truncates; it doesn't round.
10. **`[   7]`** — the number is right-aligned in a field 4 characters wide.
11. Long input can overflow the array. **Limit the width**, for example `scanf("%19s", name);` for `char name[20]`.
12. The semicolon becomes part of the replacement, so `int a[MAX];` turns into `int a[100;];`, a syntax error.

## How did you do?

- **10–12 correct:** excellent. Move on to Module 2.
- **7–9 correct:** good. Re-read the lessons for the questions you missed.
- **0–6 correct:** revisit the lessons and try their practice problems before continuing.
