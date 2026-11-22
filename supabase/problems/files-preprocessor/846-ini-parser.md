---
title: INI File Parser
difficulty: hard
topic: Text Parsing
xp: 50
plan: pro
time_limit_ms: 1000
---
Parse an INI file and answer lookups. In the file:

- `[name]` starts a section. Keys before any section belong to the section `global`.
- `key = value` sets a key in the current section. Spaces around keys and values are trimmed, and a later value for the same key in the same section replaces the earlier one.
- Blank lines and lines starting with `;` or `#` (after leading spaces) are ignored, and so are lines without `=`.

After a line `====`, each line is a query `section.key` (section names contain no dots). Print the value, or `(missing)`.

**Input:** the INI file, `====`, queries.

**Output:** one line per query.

**Constraints:** at most 500 keys in total, names up to 60 characters, values up to 200 characters

## Hints

1. Store entries as `struct { char section[64], key[64], val[256]; }` and look up the (section, key) pair.
2. For a query, `strchr(q, '.')` splits it into a section and a key.

```c starter
#include <ctype.h>
#include <stdio.h>
#include <string.h>

struct entry { char section[64], key[64], val[256]; };

static struct entry entries[500];
static int count;

int main(void) {
    char buf[512], section[64] = "global";
    /* parse, then answer queries */
    return 0;
}
```

```c solution
#include <ctype.h>
#include <stdio.h>
#include <string.h>

struct entry { char section[64], key[64], val[256]; };

static struct entry entries[500];
static int count;

static char *trim(char *s) {
    while (isspace((unsigned char)*s)) s++;
    size_t n = strlen(s);
    while (n > 0 && isspace((unsigned char)s[n - 1])) s[--n] = '\0';
    return s;
}

static int find(const char *section, const char *key) {
    for (int i = 0; i < count; i++)
        if (strcmp(entries[i].section, section) == 0 && strcmp(entries[i].key, key) == 0)
            return i;
    return -1;
}

int main(void) {
    char buf[512], section[64] = "global";
    while (fgets(buf, sizeof buf, stdin)) {
        char *line = trim(buf);
        if (strcmp(line, "====") == 0) break;
        if (*line == '\0' || *line == ';' || *line == '#') continue;
        size_t len = strlen(line);
        if (line[0] == '[' && line[len - 1] == ']') {
            line[len - 1] = '\0';
            snprintf(section, sizeof section, "%s", trim(line + 1));
            continue;
        }
        char *eq = strchr(line, '=');
        if (!eq) continue;
        *eq = '\0';
        char *key = trim(line), *val = trim(eq + 1);
        int i = find(section, key);
        if (i < 0) {
            if (count == 500) continue;
            i = count++;
            snprintf(entries[i].section, sizeof entries[i].section, "%s", section);
            snprintf(entries[i].key, sizeof entries[i].key, "%s", key);
        }
        snprintf(entries[i].val, sizeof entries[i].val, "%s", val);
    }
    while (fgets(buf, sizeof buf, stdin)) {
        char *q = trim(buf);
        if (*q == '\0') continue;
        char *dot = strchr(q, '.');
        int i = -1;
        if (dot) { *dot = '\0'; i = find(q, dot + 1); }
        puts(i < 0 ? "(missing)" : entries[i].val);
    }
    return 0;
}
```

```test sample
app_name = C Mastery
; database settings
[database]
host = localhost
port = 5432

[server]
port = 8080
host=0.0.0.0
====
database.port
server.port
global.app_name
server.user
---
5432
8080
C Mastery
(missing)
```

```test hidden
[ a ]
x = 1
[b]
x = 2
  # comment
[a]
x = 3
====
a.x
b.x
c.x
x
---
3
2
(missing)
(missing)
```

```test hidden
k = v = w
[empty]
====
global.k
empty.k
---
v = w
(missing)
```
