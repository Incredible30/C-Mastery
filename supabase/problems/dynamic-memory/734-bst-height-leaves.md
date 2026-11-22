---
title: Tree Height and Leaves
difficulty: medium
topic: Trees
xp: 30
plan: free
---
Build a binary search tree from the input (ignore duplicates) and report its **height** (the number of nodes on the longest path from the root down to a leaf) and its number of **leaves** (nodes with no children).

**Input:** `n`, then `n` integers.

**Output:** the height and the number of leaves.

**Constraints:** 1 ≤ n ≤ 5000

## Hints

1. `height(NULL) = 0`, otherwise `1 + max(height(left), height(right))`.
2. A node is a leaf when both children are `NULL`; count leaves recursively the same way.

```c starter
#include <stdio.h>
#include <stdlib.h>

struct Node { int val; struct Node *left, *right; };

int main(void) {
    int n;
    struct Node *root = NULL;
    scanf("%d", &n);
    /* build, measure, free */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>

struct Node { int val; struct Node *left, *right; };

static struct Node *insert(struct Node *root, int x) {
    if (!root) {
        struct Node *n = malloc(sizeof *n);
        if (!n) exit(1);
        n->val = x;
        n->left = n->right = NULL;
        return n;
    }
    if (x < root->val) root->left = insert(root->left, x);
    else if (x > root->val) root->right = insert(root->right, x);
    return root;
}

static int height(const struct Node *r) {
    if (!r) return 0;
    int a = height(r->left), b = height(r->right);
    return 1 + (a > b ? a : b);
}

static int leaves(const struct Node *r) {
    if (!r) return 0;
    if (!r->left && !r->right) return 1;
    return leaves(r->left) + leaves(r->right);
}

static void destroy(struct Node *r) { if (r) { destroy(r->left); destroy(r->right); free(r); } }

int main(void) {
    int n;
    struct Node *root = NULL;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) { int x; if (scanf("%d", &x) != 1) return 1; root = insert(root, x); }
    printf("%d %d\n", height(root), leaves(root));
    destroy(root);
    return 0;
}
```

```test sample
7
50 30 70 20 40 60 80
---
3 4
```

```test hidden
5
1 2 3 4 5
---
5 1
```

```test hidden
1
42
---
1 1
```
