---
title: Binary Search Tree Traversals
difficulty: medium
topic: Trees
xp: 30
plan: free
---
Insert values into a **binary search tree** (smaller values to the left, larger to the right; ignore duplicates), allocating each node with `malloc`. Then print its in-order traversal (which comes out sorted) and its pre-order traversal.

**Input:** `n`, then `n` integers.

**Output:** line 1: in-order; line 2: pre-order.

**Constraints:** 1 ≤ n ≤ 5000

## Hints

1. Recursive insert: `if (!root) return new_node(x); if (x < root->val) root->left = insert(root->left, x); ...; return root;`
2. In-order visits left, node, right; pre-order visits node, left, right. Free the tree with a post-order walk (children first).

```c starter
#include <stdio.h>
#include <stdlib.h>

struct Node { int val; struct Node *left, *right; };

int main(void) {
    int n;
    struct Node *root = NULL;
    scanf("%d", &n);
    /* insert, traverse, free */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <stdlib.h>

struct Node { int val; struct Node *left, *right; };

static int first;

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

static void out(int v) { printf(first ? "%d" : " %d", v); first = 0; }
static void inorder(const struct Node *r) { if (r) { inorder(r->left); out(r->val); inorder(r->right); } }
static void preorder(const struct Node *r) { if (r) { out(r->val); preorder(r->left); preorder(r->right); } }
static void destroy(struct Node *r) { if (r) { destroy(r->left); destroy(r->right); free(r); } }

int main(void) {
    int n;
    struct Node *root = NULL;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) { int x; if (scanf("%d", &x) != 1) return 1; root = insert(root, x); }
    first = 1; inorder(root); printf("\n");
    first = 1; preorder(root); printf("\n");
    destroy(root);
    return 0;
}
```

```test sample
7
50 30 70 20 40 60 80
---
20 30 40 50 60 70 80
50 30 20 40 70 60 80
```

```test hidden
1
5
---
5
5
```

```test hidden
6
3 1 3 2 5 4
---
1 2 3 4 5
3 1 2 5 4
```
