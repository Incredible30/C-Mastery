---
title: Prefix Counting With a Trie
difficulty: hard
topic: Trees
xp: 50
plan: pro
time_limit_ms: 1000
---
Insert `n` words into a **trie** (a tree where each edge is a letter), then answer queries: how many of the inserted words start with a given prefix? Duplicate words count each time they are inserted.

**Input:** `n`, then `n` words; `q`, then `q` prefixes.

**Output:** the count for each prefix.

**Constraints:** 1 ≤ n, q ≤ 10^5, total length of all words ≤ 10^6, lowercase letters only.

## Hints

1. `struct Trie { struct Trie *child[26]; int pass; };`. `pass` counts how many inserted words go through this node. Allocate nodes with `calloc` so the children start as `NULL`.
2. Inserting walks down, creating missing children and incrementing `pass` on every node visited. A query walks the prefix and returns the last node's `pass`, or 0 if a letter is missing.

```c starter
#include <stdio.h>
#include <stdlib.h>

struct Trie { struct Trie *child[26]; int pass; };

static char w[1000001];

int main(void) {
    int n, q;
    struct Trie *root = calloc(1, sizeof *root);
    scanf("%d", &n);
    /* insert words, then answer prefixes */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>

struct Trie { struct Trie *child[26]; int pass; };

static char w[1000001];

static void destroy(struct Trie *t) {
    if (!t) return;
    for (int i = 0; i < 26; i++) destroy(t->child[i]);
    free(t);
}

int main(void) {
    int n, q;
    struct Trie *root = calloc(1, sizeof *root);
    if (!root || scanf("%d", &n) != 1) return 1;
    while (n--) {
        if (scanf("%1000000s", w) != 1) return 1;
        struct Trie *t = root;
        for (const char *p = w; *p; p++) {
            int c = *p - 'a';
            if (!t->child[c] && !(t->child[c] = calloc(1, sizeof *t))) return 1;
            t = t->child[c];
            t->pass++;
        }
    }
    if (scanf("%d", &q) != 1) return 1;
    while (q--) {
        if (scanf("%1000000s", w) != 1) return 1;
        const struct Trie *t = root;
        for (const char *p = w; *p && t; p++) t = t->child[*p - 'a'];
        printf("%d\n", t ? t->pass : 0);
    }
    destroy(root);
    return 0;
}
```

```test sample
6
apple app application banana band apple
4
app
ban
c
apple
---
4
2
0
2
```

```test hidden
1
a
2
a
aa
---
1
0
```

```test hidden
3
xyz
xyz
xy
2
x
xyz
---
3
2
```
