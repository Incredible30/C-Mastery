---
title: Word Frequency Hash Map
difficulty: hard
topic: Hash Tables
xp: 50
plan: pro
time_limit_ms: 1000
---
Count how often each word occurs in a text and print the `t` most frequent (ties alphabetical). Use a **hash map** from words to counts with separate chaining, and **resize** it (double the bucket array and re-insert every entry) whenever the number of entries exceeds the number of buckets.

**Input:** `t` on the first line, then the text (lowercase words separated by whitespace) until the end of input.

**Output:** up to `t` lines of `word count`.

**Constraints:** 1 ≤ t ≤ 100, at most 2 × 10^5 words, each 1 to 30 letters.

## Hints

1. A good string hash: `h = h * 31 + c` over the characters, kept in an `unsigned long`. The bucket is `h % nbuckets`.
2. When resizing, move each existing node into the new bucket array; you don't need to allocate new nodes. After counting, copy the entries into an array and sort it with `qsort`.

```c starter
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Entry { char *word; int count; struct Entry *next; };

int main(void) {
    int t;
    char w[31];
    scanf("%d", &t);
    while (scanf("%30s", w) == 1) {
        /* count w */
    }
    /* sort and print the top t */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Entry { char *word; int count; struct Entry *next; };

static struct Entry **buckets;
static size_t nbuckets = 8, entries;

static unsigned long hash(const char *s) {
    unsigned long h = 0;
    while (*s) h = h * 31 + (unsigned char)*s++;
    return h;
}

static void resize(void) {
    size_t nb = nbuckets * 2;
    struct Entry **nbk = calloc(nb, sizeof *nbk);
    if (!nbk) exit(1);
    for (size_t i = 0; i < nbuckets; i++)
        for (struct Entry *e = buckets[i], *next; e; e = next) {
            next = e->next;
            size_t b = hash(e->word) % nb;
            e->next = nbk[b];
            nbk[b] = e;
        }
    free(buckets);
    buckets = nbk;
    nbuckets = nb;
}

static void add(const char *w) {
    size_t b = hash(w) % nbuckets;
    for (struct Entry *e = buckets[b]; e; e = e->next)
        if (strcmp(e->word, w) == 0) { e->count++; return; }
    struct Entry *e = malloc(sizeof *e);
    if (!e) exit(1);
    e->word = malloc(strlen(w) + 1);
    if (!e->word) exit(1);
    strcpy(e->word, w);
    e->count = 1;
    e->next = buckets[b];
    buckets[b] = e;
    if (++entries > nbuckets) resize();
}

static int cmp(const void *a, const void *b) {
    const struct Entry *x = *(const struct Entry *const *)a, *y = *(const struct Entry *const *)b;
    if (x->count != y->count) return y->count - x->count;
    return strcmp(x->word, y->word);
}

int main(void) {
    int t;
    char w[31];
    if (scanf("%d", &t) != 1) return 1;
    buckets = calloc(nbuckets, sizeof *buckets);
    if (!buckets) return 1;
    while (scanf("%30s", w) == 1) add(w);
    struct Entry **all = malloc((entries ? entries : 1) * sizeof *all);
    if (!all) return 1;
    size_t k = 0;
    for (size_t i = 0; i < nbuckets; i++) for (struct Entry *e = buckets[i]; e; e = e->next) all[k++] = e;
    qsort(all, k, sizeof *all, cmp);
    for (size_t i = 0; i < k && i < (size_t)t; i++) printf("%s %d\n", all[i]->word, all[i]->count);
    for (size_t i = 0; i < k; i++) { free(all[i]->word); free(all[i]); }
    free(all);
    free(buckets);
    return 0;
}
```

```test sample
3
the cat and the hat and the bat
sat on the mat
---
the 4
and 2
bat 1
```

```test hidden
5
one
---
one 1
```

```test hidden
2
b a c b a c d
---
a 2
b 2
```
