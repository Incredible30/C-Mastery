---
title: Game of Life
difficulty: hard
topic: 2D Arrays
xp: 50
plan: pro
---
In Conway's Game of Life, each cell of a grid is alive (`#`) or dead (`.`). Every generation, all cells update at once based on their 8 neighbours:

- A live cell with 2 or 3 live neighbours stays alive; otherwise it dies.
- A dead cell with exactly 3 live neighbours comes alive.

Cells outside the grid count as dead. Print the grid after `g` generations.

**Input:** `r c g`, then `r` lines of `c` characters.

**Output:** the grid after `g` generations.

**Constraints:** 1 ≤ r, c ≤ 50, 0 ≤ g ≤ 100

## Hints

1. Compute the next generation into a **second** grid, then copy it back. Updating in place would use already-changed neighbours.
2. For each cell, count live neighbours over the 8 offsets `(-1..1, -1..1)` except `(0, 0)`, skipping positions outside the grid.

```c starter
#include <stdio.h>

char grid[50][51], next[50][51];

int main(void) {
    int r, c, g;
    scanf("%d %d %d", &r, &c, &g);
    for (int i = 0; i < r; i++) scanf("%50s", grid[i]);
    /* simulate g generations */
    return 0;
}
```

```c solution
#include <stdio.h>
#include <string.h>

char grid[50][51], next[50][51];

int main(void) {
    int r, c, g;
    if (scanf("%d %d %d", &r, &c, &g) != 3) return 1;
    for (int i = 0; i < r; i++) if (scanf("%50s", grid[i]) != 1) return 1;
    while (g--) {
        for (int i = 0; i < r; i++) {
            for (int j = 0; j < c; j++) {
                int live = 0;
                for (int di = -1; di <= 1; di++)
                    for (int dj = -1; dj <= 1; dj++) {
                        if (!di && !dj) continue;
                        int y = i + di, x = j + dj;
                        if (y >= 0 && y < r && x >= 0 && x < c && grid[y][x] == '#') live++;
                    }
                next[i][j] = (grid[i][j] == '#') ? ((live == 2 || live == 3) ? '#' : '.') : (live == 3 ? '#' : '.');
            }
            next[i][c] = '\0';
        }
        memcpy(grid, next, sizeof grid);
    }
    for (int i = 0; i < r; i++) printf("%s\n", grid[i]);
    return 0;
}
```

```test sample
5 5 1
.....
..#..
..#..
..#..
.....
---
.....
.....
.###.
.....
.....
```

```test hidden
4 4 0
#..#
....
....
#..#
---
#..#
....
....
#..#
```

```test hidden
6 6 4
.#....
..#...
###...
......
......
......
---
......
..#...
...#..
.###..
......
......
```
