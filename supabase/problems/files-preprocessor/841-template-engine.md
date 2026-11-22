---
title: Template Engine
difficulty: hard
topic: Text Processing
xp: 50
plan: pro
time_limit_ms: 1000
---
Fill in a text template. The input starts with template lines, then a line `%%`, then variable lines `key=value` (the value is everything after the first `=`, spaces included).

Replace each placeholder `{{key}}` in the template with its value. Values are inserted as they are and are never expanded again. A placeholder whose key has no value stays exactly as written, and so does a `{{` that has no closing `}}`. After the template, print `unresolved: N`, the number of placeholders left unreplaced.

**Input:** template, `%%`, variables.

**Output:** the rendered template, then the count.

**Constraints:** at most 200 template lines and 100 variables, lines up to 1000 characters, keys up to 60 characters

## Hints

1. Store the template first, because you can't render it until you've read the variables.
2. At each `{{`, use `strstr(p + 2, "}}")` to find the end. Copy the key out, look it up, then continue after the `}}`.

```c starter
#include <stdio.h>
#include <string.h>

static char tmpl[200][1002];
static char keys[100][64], vals[100][1002];

int main(void) {
    int nt = 0, nv = 0;
    /* read template until "%%", then the variables, then render */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <string.h>

static char tmpl[200][1002];
static char keys[100][64], vals[100][1002];

int main(void) {
    char buf[1002];
    int nt = 0, nv = 0, unresolved = 0;
    while (fgets(buf, sizeof buf, stdin)) {
        buf[strcspn(buf, "\r\n")] = '\0';
        if (strcmp(buf, "%%") == 0) break;
        if (nt < 200) strcpy(tmpl[nt++], buf);
    }
    while (nv < 100 && fgets(buf, sizeof buf, stdin)) {
        buf[strcspn(buf, "\r\n")] = '\0';
        char *eq = strchr(buf, '=');
        if (!eq || eq - buf > 63) continue;
        *eq = '\0';
        int i = 0;
        while (i < nv && strcmp(keys[i], buf) != 0) i++;
        if (i == nv) strcpy(keys[nv++], buf);
        strcpy(vals[i], eq + 1);
    }
    for (int t = 0; t < nt; t++) {
        const char *p = tmpl[t];
        while (*p) {
            const char *end;
            if (p[0] == '{' && p[1] == '{' && (end = strstr(p + 2, "}}")) != NULL) {
                size_t len = (size_t)(end - (p + 2));
                int found = -1;
                if (len < 64) {
                    char key[64];
                    memcpy(key, p + 2, len);
                    key[len] = '\0';
                    for (int i = 0; i < nv; i++)
                        if (strcmp(keys[i], key) == 0) { found = i; break; }
                }
                if (found >= 0) fputs(vals[found], stdout);
                else { fwrite(p, 1, len + 4, stdout); unresolved++; }
                p = end + 2;
            } else {
                putchar(*p++);
            }
        }
        putchar('\n');
    }
    printf("unresolved: %d\n", unresolved);
    return 0;
}
```

```test sample
Dear {{name}},
Your order #{{order}} ships on {{date}}.
Regards, {{sender}}
%%
name=Asha Rao
order=4471
date=Monday
---
Dear Asha Rao,
Your order #4471 ships on Monday.
Regards, {{sender}}
unresolved: 1
```

```test hidden
{{a}}{{b}}{{a}} and {{ broken
%%
a=1
b={{a}}
---
1{{a}}1 and {{ broken
unresolved: 0
```

```test hidden
no placeholders here
%%
x=unused
---
no placeholders here
unresolved: 0
```
