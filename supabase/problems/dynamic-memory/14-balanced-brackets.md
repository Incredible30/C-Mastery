---
title: Balanced Brackets
difficulty: medium
topic: Stacks
module: dynamic-memory
xp: 40
plan: pro
---
A string of brackets is **balanced** when every opening bracket `(`, `[` or `{` is closed by the matching closing bracket, in the right order.

For each of `t` strings, print `YES` if it is balanced, otherwise `NO`.

`{[()]}` and `()[]` are balanced. `([)]`, `((` and `)(` are not.

**Input:** the first line has `t`. Each of the next `t` lines has one string made only of `()[]{}`.

**Output:** `t` lines, each `YES` or `NO`.

**Constraints:** 1 ≤ t ≤ 10, 1 ≤ string length ≤ 100000

## Hints

1. Use an array as a stack, with a `top` index.
2. Push every opening bracket. When you see a closing bracket, the stack must not be empty and its top must be the matching opener; pop it.
3. At the end, the string is balanced only if the stack is empty.

```c starter
#include <stdio.h>

char s[100001], stack[100001];

int main(void) {
    int t;
    scanf("%d", &t);
    while (t--) {
        scanf("%100000s", s);
        /* print YES or NO */
    }
    return 0;
}
```

```c solution
#include <stdio.h>

char s[100001], stack[100001];

int balanced(const char *str) {
    int top = 0;
    for (int i = 0; str[i] != '\0'; i++) {
        char c = str[i];
        if (c == '(' || c == '[' || c == '{') {
            stack[top++] = c;
        } else {
            char want = c == ')' ? '(' : c == ']' ? '[' : '{';
            if (top == 0 || stack[top - 1] != want) return 0;
            top--;
        }
    }
    return top == 0;
}

int main(void) {
    int t;
    if (scanf("%d", &t) != 1) return 1;
    while (t--) {
        if (scanf("%100000s", s) != 1) return 1;
        printf("%s\n", balanced(s) ? "YES" : "NO");
    }
    return 0;
}
```

```test sample
4
{[()]}
([)]
((
()[]
---
YES
NO
NO
YES
```

```test hidden
3
)(
{{{{}}}}
[
---
NO
YES
NO
```

```test hidden
2
({[]})[]{}
}
---
YES
NO
```
