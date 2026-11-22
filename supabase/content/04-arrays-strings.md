<!-- lesson: arrays -->
An **array** stores many values of the same type, side by side in memory, under one name. Instead of 50 separate variables for 50 students' marks, you use one array.

**Real-life analogy:** an array is a row of numbered lockers. All lockers are the same size, they sit next to each other, and you open one by its number. In C, the numbering starts at **0**.

## Example 1: declare, fill and read

```c
#include <stdio.h>

int main(void) {
    int marks[5] = {72, 85, 91, 64, 78};

    for (int i = 0; i < 5; i++) {
        printf("marks[%d] = %d\n", i, marks[i]);
    }
    return 0;
}
```

Output:

```
marks[0] = 72
marks[1] = 85
marks[2] = 91
marks[3] = 64
marks[4] = 78
```

New words:
- **Element:** one value in the array.
- **Index:** an element's position, from `0` to `length - 1`.

## Ways to initialise

```c
int a[5] = {1, 2};       /* {1, 2, 0, 0, 0}: the rest become 0 */
int zeros[100] = {0};    /* all 100 elements are 0 */
int b[] = {4, 5, 6};     /* size counted for you: 3 */
int c[5];                /* garbage until you assign values */
```

## Example 2: length, total, largest

```c
#include <stdio.h>

int main(void) {
    int marks[] = {72, 85, 91, 64, 78};
    int n = sizeof marks / sizeof marks[0];   /* total bytes / bytes per element */

    int total = 0, max = marks[0];
    for (int i = 0; i < n; i++) {
        total += marks[i];
        if (marks[i] > max) max = marks[i];
    }
    printf("count=%d total=%d max=%d avg=%.1f\n", n, total, max, (double)total / n);
    return 0;
}
```

Output:

```
count=5 total=390 max=91 avg=78.0
```

The `sizeof` trick only works where the array is declared. Inside a function that received the array, it gives the size of an address instead.

## Example 3: reading into an array

```c
#include <stdio.h>

int main(void) {
    int n;
    printf("How many numbers (max 100)? ");
    scanf("%d", &n);
    if (n < 1 || n > 100) return 1;

    int nums[100];
    for (int i = 0; i < n; i++) {
        scanf("%d", &nums[i]);
    }
    for (int i = n - 1; i >= 0; i--) {   /* print in reverse */
        printf("%d ", nums[i]);
    }
    printf("\n");
    return 0;
}
```

Input `4` then `10 20 30 40` gives:

```
40 30 20 10
```

## Common mistakes

- **Going past the end:** `marks[5]` in a 5-element array. C doesn't check, so you read or overwrite other memory. This is the most common cause of crashes.
- **`<=` in the loop condition:** `for (i = 0; i <= n; i++)` runs one time too many.
- **Assigning whole arrays:** `a = b;` doesn't compile. Copy element by element, or with `memcpy`.
- **Not checking input size** before reading into a fixed-size array.

## Key points

- Indexes go from 0 to length − 1.
- C never checks array bounds for you.
- `sizeof arr / sizeof arr[0]` gives the length, only where the array was declared.

## Interview corner

**Q: Why do arrays start at index 0?**
The index is an offset from the start of the array. The first element is 0 elements away from the start, so its index is 0.

**Q: What happens if you access `a[10]` in an array of 10?**
Undefined behaviour. It might print garbage, corrupt another variable or crash. Tools like AddressSanitizer (`-fsanitize=address`) detect it.

## Practice

1. **Easy:** Read 5 integers into an array and print how many are even.
2. **Medium:** Read `n` integers and print the second largest distinct value, or `-1` if there isn't one.
3. **Hard:** Read `n` integers and print them with duplicates removed, keeping the first occurrence of each.

## Solutions

**1.**

```c
#include <stdio.h>

int main(void) {
    int a[5], even = 0;
    for (int i = 0; i < 5; i++) {
        scanf("%d", &a[i]);
        if (a[i] % 2 == 0) even++;
    }
    printf("%d\n", even);
    return 0;
}
```

**2.**

```c
#include <stdio.h>
#include <limits.h>

int main(void) {
    int n, x;
    int first = INT_MIN, second = INT_MIN;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &x);
        if (x > first) {
            second = first;
            first = x;
        } else if (x > second && x != first) {
            second = x;
        }
    }
    printf("%d\n", second == INT_MIN ? -1 : second);
    return 0;
}
```

**3.**

```c
#include <stdio.h>

int main(void) {
    int n, a[100], out[100], count = 0;
    scanf("%d", &n);
    if (n < 0 || n > 100) return 1;
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);

    for (int i = 0; i < n; i++) {
        int seen = 0;
        for (int j = 0; j < count; j++) {
            if (out[j] == a[i]) { seen = 1; break; }
        }
        if (!seen) out[count++] = a[i];
    }
    for (int i = 0; i < count; i++) printf("%d ", out[i]);
    printf("\n");
    return 0;
}
```

<!-- lesson: multi-dimensional -->
Some data comes in a grid: a timetable, a chessboard, a spreadsheet, a matrix in maths. A **two-dimensional array** stores it in rows and columns.

**Real-life analogy:** a cinema hall. Every seat has a row number and a seat number. `seat[2][5]` is row 2, seat 5.

## Example 1: declare and print a grid

```c
#include <stdio.h>

int main(void) {
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
    return 0;
}
```

Output:

```
1 2 3
4 5 6
```

`int m[2][3]` means 2 rows, each with 3 columns. The first index is the row, the second is the column.

## How it sits in memory

C stores 2D arrays **row by row** ("row-major order"). In memory, `m` is simply `1 2 3 4 5 6`. Looping row by row, as above, reads memory in order, which is the fastest way.

## Example 2: row totals of a marks sheet

```c
#include <stdio.h>

int main(void) {
    /* 3 students x 4 subjects */
    int marks[3][4] = {
        {72, 85, 90, 66},
        {58, 74, 81, 69},
        {91, 88, 95, 87}
    };

    for (int s = 0; s < 3; s++) {
        int total = 0;
        for (int sub = 0; sub < 4; sub++) {
            total += marks[s][sub];
        }
        printf("Student %d: total %d, average %.2f\n", s + 1, total, total / 4.0);
    }
    return 0;
}
```

Output:

```
Student 1: total 313, average 78.25
Student 2: total 282, average 70.50
Student 3: total 361, average 90.25
```

## Example 3: passing a 2D array to a function

Every size except the first must be written in the parameter:

```c
#include <stdio.h>

void print_matrix(int rows, int m[][3]) {
    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < 3; c++) printf("%3d", m[r][c]);
        printf("\n");
    }
}

int main(void) {
    int id[3][3] = {{1, 0, 0}, {0, 1, 0}, {0, 0, 1}};
    print_matrix(3, id);
    return 0;
}
```

Output:

```
  1  0  0
  0  1  0
  0  0  1
```

## Common mistakes

- **Swapping row and column:** `m[c][r]` instead of `m[r][c]` reads the wrong element, or goes out of bounds.
- **Leaving out the column size** in a function parameter: `int m[][]` doesn't compile.
- **Writing `m[1, 2]`:** that's the comma operator, not a 2D index. Write `m[1][2]`.

## Key points

- `type name[rows][cols]`; access with `name[r][c]`.
- Stored row by row in memory.
- Function parameters need every size except the first.

## Interview corner

**Q: How is a 2D array stored in C?**
In row-major order: all elements of row 0, then row 1, and so on, in one continuous block.

**Q: How do you find the address of `m[i][j]` in an `int m[R][C]`?**
It's `i * C + j` elements from the start, so `base + (i * C + j) * sizeof(int)` bytes.

## Practice

1. **Easy:** Read a 3×3 matrix and print the sum of its main diagonal.
2. **Medium:** Read a 3×3 matrix and print its transpose (rows become columns).
3. **Hard:** Multiply a 2×3 matrix by a 3×2 matrix and print the 2×2 result.

## Solutions

**1.**

```c
#include <stdio.h>

int main(void) {
    int m[3][3], sum = 0;
    for (int r = 0; r < 3; r++)
        for (int c = 0; c < 3; c++)
            scanf("%d", &m[r][c]);
    for (int i = 0; i < 3; i++) sum += m[i][i];
    printf("%d\n", sum);
    return 0;
}
```

**2.**

```c
#include <stdio.h>

int main(void) {
    int m[3][3];
    for (int r = 0; r < 3; r++)
        for (int c = 0; c < 3; c++)
            scanf("%d", &m[r][c]);
    for (int c = 0; c < 3; c++) {
        for (int r = 0; r < 3; r++) printf("%d ", m[r][c]);
        printf("\n");
    }
    return 0;
}
```

**3.** Each result cell is a row of `a` multiplied element by element with a column of `b`, then added up.

```c
#include <stdio.h>

int main(void) {
    int a[2][3] = {{1, 2, 3}, {4, 5, 6}};
    int b[3][2] = {{7, 8}, {9, 10}, {11, 12}};
    int c[2][2] = {{0}};

    for (int i = 0; i < 2; i++)
        for (int j = 0; j < 2; j++)
            for (int k = 0; k < 3; k++)
                c[i][j] += a[i][k] * b[k][j];

    for (int i = 0; i < 2; i++) {
        printf("%d %d\n", c[i][0], c[i][1]);   /* 58 64 / 139 154 */
    }
    return 0;
}
```

<!-- lesson: strings -->
C has no special "string" type. A string is simply an array of `char` that ends with a special character, the **null terminator** `'\0'`. Every string function relies on that end marker.

**Real-life analogy:** a string is a sentence written on squared paper, one letter per square, with a full stop at the end. Readers keep reading until they hit the full stop. If you forget it, they keep reading into whatever is written next.

## Example 1: what a string looks like in memory

```c
#include <stdio.h>

int main(void) {
    char name[] = "Priya";   /* stored as P r i y a \0 */
    printf("%s uses %zu bytes\n", name, sizeof name);
    for (int i = 0; name[i] != '\0'; i++) {
        printf("[%c]", name[i]);
    }
    printf("\n");
    return 0;
}
```

Output:

```
Priya uses 6 bytes
[P][r][i][y][a]
```

Five letters plus `'\0'` makes 6 bytes. Always leave room for the terminator: storing a 20-letter name needs `char name[21]`.

## Example 2: reading a whole line with fgets

`scanf("%s")` stops at the first space. `fgets` reads a whole line and never writes past the array:

```c
#include <stdio.h>
#include <string.h>

int main(void) {
    char line[100];
    printf("Your full name: ");
    if (fgets(line, sizeof line, stdin) != NULL) {
        line[strcspn(line, "\n")] = '\0';   /* remove the Enter key */
        printf("Hello, %s!\n", line);
    }
    return 0;
}
```

Input `Arjun Mehta` gives:

```
Hello, Arjun Mehta!
```

`fgets` keeps the newline character; the `strcspn` line finds it and replaces it with `'\0'`.

## Example 3: changing characters

```c
#include <stdio.h>
#include <ctype.h>

int main(void) {
    char s[] = "learn c programming";
    for (int i = 0; s[i] != '\0'; i++) {
        if (i == 0 || s[i - 1] == ' ') {
            s[i] = (char)toupper((unsigned char)s[i]);
        }
    }
    printf("%s\n", s);
    return 0;
}
```

Output:

```
Learn C Programming
```

`<ctype.h>` provides helpers like `toupper`, `tolower`, `isdigit`, `isalpha` and `isspace`.

## String literals are read-only

```c
char s[] = "hello";   /* your own copy in an array: you may change it */
char *p  = "hello";   /* points at a read-only literal: don't change it */
s[0] = 'H';           /* fine */
/* p[0] = 'H';  undefined behaviour, often a crash */
```

## Common mistakes

- **No room for `'\0'`:** `char code[3] = "ABC";` leaves no space for the terminator.
- **Using `gets`:** it can't limit input length and was removed from C. Use `fgets`.
- **Comparing with `==`:** `if (s == "yes")` compares addresses. Use `strcmp` (next lesson).
- **Forgetting to strip the newline** from `fgets` input.

## Key points

- A string is a `char` array ending in `'\0'`.
- Size the array for the text plus one.
- Read lines with `fgets`, never `gets`.

## Interview corner

**Q: What is the difference between `char s[] = "hi";` and `char *s = "hi";`?**
The first creates a 3-byte array that you own and can modify. The second is a pointer to a string literal in read-only memory; modifying it is undefined behaviour.

**Q: Why is `gets` dangerous?**
It reads until the end of the line with no limit, so long input overflows the buffer. It was removed in C11.

## Practice

1. **Easy:** Read a word and print its length without using `strlen`.
2. **Medium:** Read a line and count its vowels.
3. **Hard:** Read a word and reverse it in place, then print it.

## Solutions

**1.**

```c
#include <stdio.h>

int main(void) {
    char w[100];
    scanf("%99s", w);
    int len = 0;
    while (w[len] != '\0') len++;
    printf("%d\n", len);
    return 0;
}
```

**2.**

```c
#include <stdio.h>
#include <ctype.h>

int main(void) {
    char line[200];
    int vowels = 0;
    if (fgets(line, sizeof line, stdin) == NULL) return 1;
    for (int i = 0; line[i] != '\0'; i++) {
        char c = (char)tolower((unsigned char)line[i]);
        if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') vowels++;
    }
    printf("%d\n", vowels);
    return 0;
}
```

**3.**

```c
#include <stdio.h>
#include <string.h>

int main(void) {
    char s[101];
    scanf("%100s", s);
    int i = 0, j = (int)strlen(s) - 1;
    while (i < j) {
        char t = s[i];
        s[i] = s[j];
        s[j] = t;
        i++;
        j--;
    }
    printf("%s\n", s);   /* pointer -> retniop */
    return 0;
}
```

<!-- lesson: string-h -->
The header `<string.h>` gives you ready-made functions for the common string jobs: measuring, copying, joining, comparing and searching. Each one relies on the `'\0'` terminator.

**Real-life analogy:** `<string.h>` is a toolbox. You could build a hammer yourself, but using the one in the box is faster and less error-prone, as long as you use it correctly.

## The main functions

| Function | What it does | Returns |
| --- | --- | --- |
| `strlen(s)` | counts characters before `'\0'` | length as `size_t` |
| `strcpy(dst, src)` | copies `src` into `dst` | `dst` |
| `strcat(dst, src)` | appends `src` to the end of `dst` | `dst` |
| `strcmp(a, b)` | compares alphabetically | 0 if equal, negative if `a` < `b`, positive if `a` > `b` |
| `strncmp(a, b, n)` | compares the first `n` characters | as above |
| `strchr(s, c)` | finds the first character `c` | pointer to it, or `NULL` |
| `strstr(s, sub)` | finds the first occurrence of `sub` | pointer to it, or `NULL` |

## Example 1: length, copy and join

```c
#include <stdio.h>
#include <string.h>

int main(void) {
    char first[20] = "Priya";
    char full[40];

    strcpy(full, first);       /* full = "Priya" */
    strcat(full, " Sharma");   /* full = "Priya Sharma" */
    printf("%s has %zu characters\n", full, strlen(full));
    return 0;
}
```

Output:

```
Priya Sharma has 12 characters
```

`strlen` doesn't count the `'\0'`, but the array must still have room for it.

## Example 2: comparing strings

```c
#include <stdio.h>
#include <string.h>

int main(void) {
    char answer[10];
    printf("Continue? (yes/no): ");
    scanf("%9s", answer);
    if (strcmp(answer, "yes") == 0) {
        printf("Continuing...\n");
    } else {
        printf("Stopped.\n");
    }
    printf("%d\n", strcmp("apple", "banana") < 0);   /* 1: apple comes first */
    return 0;
}
```

`==` would compare the arrays' addresses, which are never equal. Always use `strcmp` and check for `== 0`.

## Example 3: safe copying with snprintf

`strcpy` and `strcat` don't know how big the destination is. If the source is longer, they write past the end: a **buffer overflow**, one of the most common security bugs in C programs.

```c
#include <stdio.h>

int main(void) {
    char user[8];
    const char *input = "arjun_mehta_2026";
    snprintf(user, sizeof user, "%s", input);   /* copies at most 7 chars + '\0' */
    printf("[%s]\n", user);
    return 0;
}
```

Output:

```
[arjun_m]
```

`snprintf` always respects the size and always adds `'\0'`. Be careful with `strncpy`: when the source is too long, it does **not** add the terminator.

## Common mistakes

- **Destination too small** for `strcpy` or `strcat`.
- **Treating `strcmp`'s result as true/false:** `if (strcmp(a, b))` is true when the strings are **different**.
- **Calling `strlen` in a loop condition:** `for (i = 0; i < strlen(s); i++)` recounts on every round. Store the length once.
- **Forgetting `#include <string.h>`.**

## Key points

- Compare strings with `strcmp(a, b) == 0`, never `==`.
- Make sure the destination has room for the result plus `'\0'`.
- Prefer `snprintf` for safe copying and building strings.

## Interview corner

**Q: Write your own `strlen`.**
Walk the string until `'\0'`: `size_t n = 0; while (s[n]) n++; return n;`

**Q: What's the problem with `strncpy`?**
If the source is at least `n` characters long, it doesn't write a terminating `'\0'`, leaving an unterminated string. It also pads short strings with zeros, which wastes time.

## Practice

1. **Easy:** Read two words and print which comes first alphabetically.
2. **Medium:** Read a sentence and print how many times the word "the" appears, using `strstr`.
3. **Hard:** Write `int my_strcmp(const char *a, const char *b)` without `<string.h>`, and test it against the real `strcmp`.

## Solutions

**1.**

```c
#include <stdio.h>
#include <string.h>

int main(void) {
    char a[50], b[50];
    scanf("%49s %49s", a, b);
    int r = strcmp(a, b);
    if (r < 0) printf("%s\n", a);
    else if (r > 0) printf("%s\n", b);
    else printf("same word\n");
    return 0;
}
```

**2.**

```c
#include <stdio.h>
#include <string.h>

int main(void) {
    char line[300];
    if (fgets(line, sizeof line, stdin) == NULL) return 1;
    int count = 0;
    const char *p = line;
    while ((p = strstr(p, "the")) != NULL) {
        count++;
        p += 3;   /* continue searching after this match */
    }
    printf("%d\n", count);
    return 0;
}
```

**3.**

```c
#include <stdio.h>
#include <string.h>

int my_strcmp(const char *a, const char *b) {
    while (*a != '\0' && *a == *b) {
        a++;
        b++;
    }
    return (unsigned char)*a - (unsigned char)*b;
}

int main(void) {
    const char *pairs[][2] = {{"apple", "apple"}, {"apple", "apricot"}, {"zoo", "ant"}};
    for (int i = 0; i < 3; i++) {
        int mine = my_strcmp(pairs[i][0], pairs[i][1]);
        int real = strcmp(pairs[i][0], pairs[i][1]);
        printf("%s vs %s: same sign? %s\n", pairs[i][0], pairs[i][1],
               ((mine > 0) - (mine < 0)) == ((real > 0) - (real < 0)) ? "yes" : "no");
    }
    return 0;
}
```

<!-- lesson: arrays-quiz -->
Check what you've learned in Module 4. Answer each question, then compare with the explanations.

## Questions

1. What are the valid indexes of `int a[8]`?
2. What does `sizeof a / sizeof a[0]` give for `int a[8]`?
3. After `int a[5] = {1, 2};`, what is `a[4]`?
4. In what order is `int m[2][3]` stored in memory?
5. How many bytes does `char s[] = "C99";` use?
6. What is `strlen("hello")`?
7. Why is `if (s == "yes")` wrong?
8. What does `strcmp("cat", "car")` return: zero, negative or positive?
9. What's the risk with `strcpy(buf, input)`?
10. Why should you never use `gets`?
11. What does `fgets` keep at the end of the line that you usually remove?
12. Can you change `p[0]` after `char *p = "hello";`?

## Answers

1. **0 to 7.**
2. **`8`**, the number of elements.
3. **`0`.** Missing initialisers become zero.
4. **Row by row:** all of row 0, then all of row 1.
5. **4 bytes:** three characters plus `'\0'`.
6. **`5`.** The terminator isn't counted.
7. **It compares addresses,** not contents. Use `strcmp(s, "yes") == 0`.
8. **Positive,** because `'t'` comes after `'r'`.
9. **Buffer overflow:** if `input` is longer than `buf`, strcpy writes past the end.
10. **It can't limit input length,** so it always risks overflow. It was removed in C11.
11. **The newline character `'\n'`.**
12. **No.** It points to a read-only string literal; changing it is undefined behaviour.

## How did you do?

- **10–12 correct:** excellent. On to Module 5: Pointers.
- **7–9 correct:** good. Review what you missed.
- **0–6 correct:** redo this module's practice problems first.
