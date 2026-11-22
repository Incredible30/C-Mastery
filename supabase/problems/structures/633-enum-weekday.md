---
title: Day of the Week With enum
difficulty: medium
topic: Enums
xp: 25
plan: free
---
Use `enum Day { MON, TUE, WED, THU, FRI, SAT, SUN };` and a parallel array of names. Given a starting day and an offset in days (possibly negative or huge), print the resulting day.

**Input:** a day name (`Monday` … `Sunday`) and an integer `n`.

**Output:** the day name `n` days later.

**Constraints:** |n| ≤ 10^12

## Hints

1. Find the enum value by comparing the name with each entry of `const char *names[7]`.
2. The answer is `((start + n) % 7 + 7) % 7`. The extra `+ 7` fixes C's negative remainders.

```c starter
#include <stdio.h>
#include <string.h>

enum Day { MON, TUE, WED, THU, FRI, SAT, SUN };
const char *names[7] = {"Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"};

int main(void) {
    char s[16];
    long long n;
    scanf("%15s %lld", s, &n);
    /* find start, move n days */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <string.h>

enum Day { MON, TUE, WED, THU, FRI, SAT, SUN };
const char *names[7] = {"Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"};

int main(void) {
    char s[16];
    long long n;
    if (scanf("%15s %lld", s, &n) != 2) return 1;
    enum Day start = MON;
    for (int i = MON; i <= SUN; i++) if (strcmp(s, names[i]) == 0) start = (enum Day)i;
    long long r = ((start + n) % 7 + 7) % 7;
    printf("%s\n", names[r]);
    return 0;
}
```

```test sample
Friday 3
---
Monday
```

```test hidden
Monday -1
---
Sunday
```

```test hidden
Sunday 0
---
Sunday
```

```test hidden
Wednesday 1000000000000
---
Thursday
```
