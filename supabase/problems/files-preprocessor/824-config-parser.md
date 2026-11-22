---
title: Config File Parser
difficulty: medium
topic: Text Parsing
xp: 40
plan: free
---
Parse a config file made of `key = value` lines. Spaces around the key and the value don't count. Blank lines and lines whose first non-space character is `#` are ignored, and so are lines without `=`. If a key appears twice, the later value wins.

After the config comes a line `====`, then one key per line to look up. For each, print its value, or `(missing)`.

**Input:** config lines, `====`, query lines.

**Output:** one value or `(missing)` per query.

**Constraints:** at most 200 distinct keys, keys up to 60 characters, values up to 200 characters

## Hints

1. Write a `trim` helper that skips leading spaces and cuts trailing ones, and returns a pointer into the same buffer.
2. `strchr(line, '=')` finds the separator. Write `'\0'` there to split the line into two strings.

```c starter
#include <ctype.h>
#include <stdio.h>
#include <string.h>

struct entry { char key[64]; char val[256]; };

static struct entry table[200];
static int count;

static char *trim(char *s) {
    /* return s without leading/trailing whitespace */
    return s;
}

int main(void) {
    char buf[512];
    /* parse until "====", then answer queries */
    return 0;
}
```

```c solution
#include <ctype.h>
#include <stdio.h>
#include <string.h>

struct entry { char key[64]; char val[256]; };

static struct entry table[200];
static int count;

static char *trim(char *s) {
    while (isspace((unsigned char)*s)) s++;
    size_t n = strlen(s);
    while (n > 0 && isspace((unsigned char)s[n - 1])) s[--n] = '\0';
    return s;
}

static int find(const char *key) {
    for (int i = 0; i < count; i++)
        if (strcmp(table[i].key, key) == 0) return i;
    return -1;
}

int main(void) {
    char buf[512];
    while (fgets(buf, sizeof buf, stdin)) {
        char *line = trim(buf);
        if (strcmp(line, "====") == 0) break;
        if (*line == '\0' || *line == '#') continue;
        char *eq = strchr(line, '=');
        if (!eq) continue;
        *eq = '\0';
        char *key = trim(line), *val = trim(eq + 1);
        int i = find(key);
        if (i < 0) {
            if (count == 200) continue;
            i = count++;
            snprintf(table[i].key, sizeof table[i].key, "%s", key);
        }
        snprintf(table[i].val, sizeof table[i].val, "%s", val);
    }
    while (fgets(buf, sizeof buf, stdin)) {
        char *key = trim(buf);
        if (*key == '\0') continue;
        int i = find(key);
        puts(i < 0 ? "(missing)" : table[i].val);
    }
    return 0;
}
```

```test sample
# server settings
host = example.com
port=8080

  timeout   =   30 seconds
port = 9090
====
host
port
timeout
user
---
example.com
9090
30 seconds
(missing)
```

```test hidden
name = C Mastery
this line has no equals sign
   # indented comment
level = beginner
====
level
name
---
beginner
C Mastery
```

```test hidden
a=1
b = 2 + 3 = 5
====
b
a
c
---
2 + 3 = 5
1
(missing)
```
