---
title: Filter CSV Rows
difficulty: medium
topic: Text Parsing
xp: 35
plan: free
---
The first line names a city. The second line is a CSV header `name,city,age`, and every line after it is a row in that format. Print the name and age of every person who lives in the chosen city, in input order, as `name (age)`. If nobody matches, print `none`.

**Input:** a city, a header line, then rows `name,city,age`.

**Output:** one `name (age)` line per match, or `none`.

**Constraints:** at most 1000 rows, names and cities have at most 40 characters and contain no commas

## Hints

1. `sscanf(buf, "%40[^,],%40[^,],%d", name, city, &age) == 3` splits a row: `%[^,]` reads up to the next comma.
2. Remember to skip the header line, and strip the newline from the city before comparing.

```c starter
#include <stdio.h>
#include <string.h>

int main(void) {
    char want[64], buf[256];
    if (!fgets(want, sizeof want, stdin)) return 1;
    want[strcspn(want, "\r\n")] = '\0';
    /* skip the header, then filter the rows */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <string.h>

int main(void) {
    char want[64], buf[256], name[41], city[41];
    int age, found = 0;
    if (!fgets(want, sizeof want, stdin)) return 1;
    want[strcspn(want, "\r\n")] = '\0';
    if (!fgets(buf, sizeof buf, stdin)) { puts("none"); return 0; }
    while (fgets(buf, sizeof buf, stdin)) {
        if (sscanf(buf, "%40[^,],%40[^,],%d", name, city, &age) != 3) continue;
        if (strcmp(city, want) == 0) {
            printf("%s (%d)\n", name, age);
            found = 1;
        }
    }
    if (!found) puts("none");
    return 0;
}
```

```test sample
Pune
name,city,age
Asha,Pune,24
Ravi,Delhi,31
Meera,Pune,29
John,Mumbai,40
---
Asha (24)
Meera (29)
```

```test hidden
Chennai
name,city,age
Asha,Pune,24
Ravi,Delhi,31
---
none
```

```test hidden
New York
name,city,age
Ann Lee,New York,52
Bob,York,19
Cara,New York,7
---
Ann Lee (52)
Cara (7)
```
