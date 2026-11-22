---
title: LRU Cache
difficulty: hard
topic: Arrays of Structures
xp: 50
plan: pro
time_limit_ms: 1000
---
Build a cache of key–value pairs with capacity `k`. When it is full and a new key arrives, it evicts the **least recently used** key, meaning the one that was read or written longest ago.

- `put key value`: insert or update, and mark as most recently used.
- `get key`: print the value (and mark as used), or `-1` if absent.

**Input:** `k` and `q`, then `q` commands.

**Output:** one line per `get`.

**Constraints:** 1 ≤ k ≤ 1000, 1 ≤ q ≤ 20000, keys and values fit in `int`.

## Hints

1. `struct Entry { int key, value; long long last_used; };` and a global counter that increases on every command.
2. On `put` of a new key when full, replace the entry with the smallest `last_used`. With these limits a linear scan per command is fast enough.

```c starter
#include <stdio.h>
#include <string.h>

struct Entry { int key, value; long long last_used; };

struct Entry cache[1000];
int used, cap;

int main(void) {
    int q;
    char cmd[4];
    scanf("%d %d", &cap, &q);
    while (q--) {
        scanf("%3s", cmd);
        /* put or get */
    }
    return 0;
}
```

```c solution
#include <stdio.h>
#include <string.h>

struct Entry { int key, value; long long last_used; };

struct Entry cache[1000];
int used, cap;
long long clock_now;

static struct Entry *find(int key) {
    for (int i = 0; i < used; i++) if (cache[i].key == key) return &cache[i];
    return NULL;
}

int main(void) {
    int q;
    char cmd[4];
    if (scanf("%d %d", &cap, &q) != 2) return 1;
    while (q--) {
        int key;
        if (scanf("%3s %d", cmd, &key) != 2) return 1;
        clock_now++;
        struct Entry *e = find(key);
        if (strcmp(cmd, "get") == 0) {
            if (e) { e->last_used = clock_now; printf("%d\n", e->value); }
            else printf("-1\n");
            continue;
        }
        int value;
        if (scanf("%d", &value) != 1) return 1;
        if (!e) {
            if (used < cap) e = &cache[used++];
            else {
                e = &cache[0];
                for (int i = 1; i < used; i++) if (cache[i].last_used < e->last_used) e = &cache[i];
            }
            e->key = key;
        }
        e->value = value;
        e->last_used = clock_now;
    }
    return 0;
}
```

```test sample
2 9
put 1 1
put 2 2
get 1
put 3 3
get 2
put 4 4
get 1
get 3
get 4
---
1
-1
-1
3
4
```

```test hidden
1 4
put 5 50
put 5 55
get 5
get 6
---
55
-1
```

```test hidden
2 6
put 1 10
put 2 20
put 1 11
put 3 30
get 2
get 1
---
-1
11
```
