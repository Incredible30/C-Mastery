---
title: Tower of Hanoi
difficulty: medium
topic: Recursion
xp: 30
plan: free
---
Move `n` discs from peg `A` to peg `C` using peg `B`, moving one disc at a time and never putting a larger disc on a smaller one. Print each move as `Move disc D from X to Y`, then the total number of moves.

**Input:** one integer `n`.

**Output:** one line per move, then `Total moves: M`.

**Constraints:** 1 ≤ n ≤ 10

## Hints

1. To move `n` discs from `from` to `to`: move `n − 1` discs from `from` to the spare peg, move disc `n` to `to`, then move the `n − 1` discs from the spare peg onto `to`.
2. Base case: with 0 discs there's nothing to do. The total is always 2^n − 1.

```c starter
#include <stdio.h>

void hanoi(int n, char from, char to, char via) {
    /* recursive moves */
}

int main(void) {
    int n;
    scanf("%d", &n);
    hanoi(n, 'A', 'C', 'B');
    return 0;
}
```

```c solution
#include <stdio.h>

static int moves = 0;

void hanoi(int n, char from, char to, char via) {
    if (n == 0) return;
    hanoi(n - 1, from, via, to);
    printf("Move disc %d from %c to %c\n", n, from, to);
    moves++;
    hanoi(n - 1, via, to, from);
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    hanoi(n, 'A', 'C', 'B');
    printf("Total moves: %d\n", moves);
    return 0;
}
```

```test sample
2
---
Move disc 1 from A to B
Move disc 2 from A to C
Move disc 1 from B to C
Total moves: 3
```

```test hidden
1
---
Move disc 1 from A to C
Total moves: 1
```

```test hidden
3
---
Move disc 1 from A to C
Move disc 2 from A to B
Move disc 1 from C to B
Move disc 3 from A to C
Move disc 1 from B to A
Move disc 2 from B to C
Move disc 1 from A to C
Total moves: 7
```

```test hidden
5
---
Move disc 1 from A to C
Move disc 2 from A to B
Move disc 1 from C to B
Move disc 3 from A to C
Move disc 1 from B to A
Move disc 2 from B to C
Move disc 1 from A to C
Move disc 4 from A to B
Move disc 1 from C to B
Move disc 2 from C to A
Move disc 1 from B to A
Move disc 3 from C to B
Move disc 1 from A to C
Move disc 2 from A to B
Move disc 1 from C to B
Move disc 5 from A to C
Move disc 1 from B to A
Move disc 2 from B to C
Move disc 1 from A to C
Move disc 3 from B to A
Move disc 1 from C to B
Move disc 2 from C to A
Move disc 1 from B to A
Move disc 4 from B to C
Move disc 1 from A to C
Move disc 2 from A to B
Move disc 1 from C to B
Move disc 3 from A to C
Move disc 1 from B to A
Move disc 2 from B to C
Move disc 1 from A to C
Total moves: 31
```
