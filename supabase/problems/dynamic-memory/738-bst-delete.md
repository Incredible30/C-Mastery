---
title: Binary Search Tree With Delete
difficulty: hard
topic: Trees
xp: 50
plan: pro
---
Maintain a binary search tree of distinct integers with these commands:

- `ins x`: insert (ignore if present)
- `del x`: delete (ignore if absent)
- `has x`: print `YES` or `NO`
- `print`: print the in-order traversal, or `EMPTY`

Deleting a node with two children replaces its value with its **in-order successor** (the smallest value in its right subtree) and deletes that successor instead. Free every removed node.

**Input:** `q`, then `q` commands.

**Output:** one line per `has` and `print`.

**Constraints:** 1 ≤ q ≤ 5000, |x| ≤ 10^9

## Hints

1. Write `struct Node *delete(struct Node *root, int x)` that returns the new root of the subtree, so the parent's pointer is updated automatically: `root->left = delete(root->left, x);`.
2. Three cases at the target: no children (free, return `NULL`), one child (free, return that child), two children (copy the successor's value, then delete it from the right subtree).

```c starter
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Node { int val; struct Node *left, *right; };

int main(void) {
    struct Node *root = NULL;
    int q;
    char cmd[8];
    scanf("%d", &q);
    while (q--) {
        scanf("%7s", cmd);
        /* handle command */
    }
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Node { int val; struct Node *left, *right; };

static int first;

static struct Node *insert(struct Node *r, int x) {
    if (!r) {
        struct Node *n = malloc(sizeof *n);
        if (!n) exit(1);
        n->val = x;
        n->left = n->right = NULL;
        return n;
    }
    if (x < r->val) r->left = insert(r->left, x);
    else if (x > r->val) r->right = insert(r->right, x);
    return r;
}

static struct Node *delete(struct Node *r, int x) {
    if (!r) return NULL;
    if (x < r->val) r->left = delete(r->left, x);
    else if (x > r->val) r->right = delete(r->right, x);
    else if (r->left && r->right) {
        struct Node *s = r->right;
        while (s->left) s = s->left;
        r->val = s->val;
        r->right = delete(r->right, s->val);
    } else {
        struct Node *child = r->left ? r->left : r->right;
        free(r);
        return child;
    }
    return r;
}

static int has(const struct Node *r, int x) {
    while (r && r->val != x) r = x < r->val ? r->left : r->right;
    return r != NULL;
}

static void inorder(const struct Node *r) {
    if (!r) return;
    inorder(r->left);
    printf(first ? "%d" : " %d", r->val);
    first = 0;
    inorder(r->right);
}

static void destroy(struct Node *r) { if (r) { destroy(r->left); destroy(r->right); free(r); } }

int main(void) {
    struct Node *root = NULL;
    int q;
    char cmd[8];
    if (scanf("%d", &q) != 1) return 1;
    while (q--) {
        if (scanf("%7s", cmd) != 1) return 1;
        if (strcmp(cmd, "print") == 0) {
            if (!root) printf("EMPTY\n");
            else { first = 1; inorder(root); printf("\n"); }
            continue;
        }
        int x;
        if (scanf("%d", &x) != 1) return 1;
        if (strcmp(cmd, "ins") == 0) root = insert(root, x);
        else if (strcmp(cmd, "del") == 0) root = delete(root, x);
        else printf("%s\n", has(root, x) ? "YES" : "NO");
    }
    destroy(root);
    return 0;
}
```

```test sample
11
ins 50
ins 30
ins 70
ins 60
ins 80
print
del 50
has 50
print
del 99
print
---
30 50 60 70 80
NO
30 60 70 80
30 60 70 80
```

```test hidden
4
print
ins 1
del 1
print
---
EMPTY
EMPTY
```

```test hidden
8
ins 5
ins 3
ins 8
ins 7
del 3
del 8
has 7
print
---
YES
5 7
```
