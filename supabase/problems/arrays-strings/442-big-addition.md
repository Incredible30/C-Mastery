---
title: Add Huge Numbers
difficulty: hard
topic: Strings
xp: 45
plan: pro
---
Add two non-negative integers that can have up to 1000 digits each, far beyond any built-in type. Treat them as strings and add digit by digit, like on paper.

**Input:** two numbers, one per line.

**Output:** their sum, without leading zeros.

**Constraints:** each number has 1 to 1000 digits and no leading zeros (except the number 0).

## Hints

1. Start from the last digit of each string, add the two digits plus the carry, write `sum % 10` and carry `sum / 10`.
2. The digits come out in reverse order; store them in an array, then print it backwards. Don't forget a final carry.

```c starter
#include <stdio.h>
#include <string.h>

int main(void) {
    char a[1001], b[1001];
    scanf("%1000s %1000s", a, b);
    /* add digit by digit */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <string.h>

int main(void) {
    char a[1001], b[1001], r[1002];
    if (scanf("%1000s %1000s", a, b) != 2) return 1;
    int i = (int)strlen(a) - 1, j = (int)strlen(b) - 1, k = 0, carry = 0;
    while (i >= 0 || j >= 0 || carry) {
        int s = carry + (i >= 0 ? a[i--] - '0' : 0) + (j >= 0 ? b[j--] - '0' : 0);
        r[k++] = (char)('0' + s % 10);
        carry = s / 10;
    }
    while (k > 1 && r[k - 1] == '0') k--;
    for (int t = k - 1; t >= 0; t--) putchar(r[t]);
    putchar('\n');
    return 0;
}
```

```test sample
99999999999999999999
1
---
100000000000000000000
```

```test hidden
0
0
---
0
```

```test hidden
123456789123456789123456789
987654321987654321987654321
---
1111111111111111111111111110
```

```test hidden
5
995
---
1000
```
