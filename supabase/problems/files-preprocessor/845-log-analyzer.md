---
title: Log Analyzer
difficulty: hard
topic: Text Parsing
xp: 50
plan: pro
time_limit_ms: 1000
---
Each line of a server log looks like `HH:MM:SS LEVEL message`, where `LEVEL` is one of `ERROR`, `WARN`, `INFO` or `DEBUG` and the message is the rest of the line. The lines are in time order. Print this report:

```
ERROR <count>
WARN <count>
INFO <count>
DEBUG <count>
span: <first timestamp> - <last timestamp>
busiest minute: HH:MM (<n> lines)
top error: <message> (<n>)
```

The busiest minute is the `HH:MM` with the most lines (the earliest one on a tie). The top error is the most frequent `ERROR` message (the alphabetically smallest on a tie). If there are no errors, print `top error: none`.

**Input:** at least one log line.

**Output:** the report.

**Constraints:** at most 10^5 lines, messages up to 100 characters, at most 1000 distinct error messages

## Hints

1. `sscanf(buf, "%d:%d:%d %7s %n", &h, &m, &s, level, &used)` parses the fixed part, and `buf + used` is the message.
2. An array of 24 × 60 counters makes the busiest minute easy to find.

```c starter
#include <stdio.h>
#include <string.h>

static int per_minute[24 * 60];

int main(void) {
    char buf[256];
    /* parse each line and build the report */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <string.h>

static int per_minute[24 * 60];
static char errors[1000][104];
static int error_count[1000];

int main(void) {
    static const char *levels[] = {"ERROR", "WARN", "INFO", "DEBUG"};
    int counts[4] = {0}, nerr = 0;
    char buf[256], level[8], first[9] = "", last[9] = "";
    while (fgets(buf, sizeof buf, stdin)) {
        int h, m, s, used = -1;
        buf[strcspn(buf, "\r\n")] = '\0';
        if (sscanf(buf, "%d:%d:%d %7s %n", &h, &m, &s, level, &used) != 4 || used < 0) continue;
        if (h < 0 || h > 23 || m < 0 || m > 59) continue;
        if (!first[0]) snprintf(first, sizeof first, "%02d:%02d:%02d", h, m, s);
        snprintf(last, sizeof last, "%02d:%02d:%02d", h, m, s);
        per_minute[h * 60 + m]++;
        for (int i = 0; i < 4; i++)
            if (strcmp(level, levels[i]) == 0) counts[i]++;
        if (strcmp(level, "ERROR") == 0) {
            const char *msg = buf + used;
            int i = 0;
            while (i < nerr && strcmp(errors[i], msg) != 0) i++;
            if (i == nerr) {
                if (nerr == 1000) continue;
                snprintf(errors[nerr++], sizeof errors[0], "%s", msg);
            }
            error_count[i]++;
        }
    }
    for (int i = 0; i < 4; i++) printf("%s %d\n", levels[i], counts[i]);
    printf("span: %s - %s\n", first, last);
    int best = 0;
    for (int i = 1; i < 24 * 60; i++)
        if (per_minute[i] > per_minute[best]) best = i;
    printf("busiest minute: %02d:%02d (%d lines)\n", best / 60, best % 60, per_minute[best]);
    if (nerr == 0) { puts("top error: none"); return 0; }
    int top = 0;
    for (int i = 1; i < nerr; i++)
        if (error_count[i] > error_count[top] ||
            (error_count[i] == error_count[top] && strcmp(errors[i], errors[top]) < 0))
            top = i;
    printf("top error: %s (%d)\n", errors[top], error_count[top]);
    return 0;
}
```

```test sample
09:00:01 INFO server started
09:01:15 WARN high memory
09:01:20 ERROR disk full
09:01:59 INFO retrying
09:02:03 ERROR timeout
09:14:59 ERROR disk full
---
ERROR 3
WARN 1
INFO 2
DEBUG 0
span: 09:00:01 - 09:14:59
busiest minute: 09:01 (3 lines)
top error: disk full (2)
```

```test hidden
23:59:59 DEBUG tick
---
ERROR 0
WARN 0
INFO 0
DEBUG 1
span: 23:59:59 - 23:59:59
busiest minute: 23:59 (1 lines)
top error: none
```

```test hidden
10:00:00 ERROR b failed
10:00:30 ERROR a failed
10:05:00 INFO ok
10:05:10 INFO ok
10:05:20 ERROR b failed
10:06:00 ERROR a failed
---
ERROR 4
WARN 0
INFO 2
DEBUG 0
span: 10:00:00 - 10:06:00
busiest minute: 10:05 (3 lines)
top error: a failed (2)
```
