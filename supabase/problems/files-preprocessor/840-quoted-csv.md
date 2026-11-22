---
title: Quoted CSV Fields
difficulty: hard
topic: Text Parsing
xp: 50
plan: pro
time_limit_ms: 1000
---
Real CSV allows commas inside fields. A field may be wrapped in double quotes, and inside quotes a doubled quote `""` stands for one `"` character. Parse each line into its fields and print `n: [field1] [field2] ...`, where `n` is the number of fields.

Unquoted fields are taken exactly as written, spaces included. An empty line has one empty field. A trailing comma means one more empty field.

**Input:** CSV lines.

**Output:** one line per input line.

**Constraints:** lines up to 1000 characters, quotes are always balanced

## Hints

1. Parse one field at a time. If it starts with `"`, read until a `"` that isn't followed by another `"`. Otherwise read up to the next comma.
2. After a field, a comma means another field follows, even if it's empty.

```c starter
#include <stdio.h>
#include <string.h>

int main(void) {
    char line[1002];
    while (fgets(line, sizeof line, stdin)) {
        line[strcspn(line, "\r\n")] = '\0';
        /* parse fields and print */
    }
    return 0;
}
```

```c solution
#include <stdio.h>
#include <string.h>

static char fields[600][1002];

int main(void) {
    char line[1002];
    while (fgets(line, sizeof line, stdin)) {
        line[strcspn(line, "\r\n")] = '\0';
        const char *p = line;
        int n = 0;
        for (;;) {
            char *f = fields[n];
            size_t k = 0;
            if (*p == '"') {
                p++;
                while (*p) {
                    if (*p == '"') {
                        if (p[1] == '"') { f[k++] = '"'; p += 2; }
                        else { p++; break; }
                    } else {
                        f[k++] = *p++;
                    }
                }
                while (*p && *p != ',') f[k++] = *p++;
            } else {
                while (*p && *p != ',') f[k++] = *p++;
            }
            f[k] = '\0';
            n++;
            if (*p == ',' && n < 600) p++;
            else break;
        }
        printf("%d:", n);
        for (int i = 0; i < n; i++) printf(" [%s]", fields[i]);
        printf("\n");
    }
    return 0;
}
```

```test sample
name,city,quote
"Lee, Ann",Pune,"She said ""hi"""
a,,c,
---
3: [name] [city] [quote]
3: [Lee, Ann] [Pune] [She said "hi"]
4: [a] [] [c] []
```

```test hidden
single
"","x"
 spaced , out
---
1: [single]
2: [] [x]
2: [ spaced ] [ out]
```

```test hidden
"a,b,c"
1,"two ""2""",3
---
1: [a,b,c]
3: [1] [two "2"] [3]
```
