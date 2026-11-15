-- C MASTERY seed data: the C programming course with 8 modules.
-- Runs after migrations on `supabase db reset`. Safe to re-run: it upserts by slug.

insert into public.courses (slug, title, description, status, position)
values ('c-programming', 'C Programming Mastery',
        'From your first printf to pointers, dynamic memory and file I/O. Eight modules, each ending with a checkpoint quiz.',
        'published', 1)
on conflict (slug) do update set title = excluded.title, description = excluded.description, status = excluded.status;

with c as (select id from public.courses where slug = 'c-programming'),
m(slug, title, summary, level, position, hours, outcomes, plan) as (values
  ('foundations', 'C Foundations', 'How a C program is built and run: the toolchain, main(), variables, data types and formatted I/O.', 'beginner', 1, 4.0,
     array['Compile and run programs with gcc', 'Choose the right data type and format specifier', 'Read input safely with scanf'], 'free'),
  ('control-flow', 'Operators & Control Flow', 'Arithmetic, logical and bitwise operators, decisions with if/switch, and every kind of loop.', 'beginner', 2, 5.0,
     array['Predict operator precedence', 'Write loops without off-by-one errors', 'Use bitwise operators for flags'], 'free'),
  ('functions', 'Functions & Recursion', 'Declaring and defining functions, pass-by-value, scope and storage classes, and thinking recursively.', 'beginner', 3, 5.0,
     array['Split programs into functions with prototypes', 'Explain static, extern and auto', 'Trace a recursive call stack'], 'free'),
  ('arrays-strings', 'Arrays & Strings', 'One- and two-dimensional arrays, C strings and the null terminator, and string.h.', 'intermediate', 4, 6.0,
     array['Traverse and search arrays', 'Handle strings without overflowing buffers', 'Use strlen, strcpy and strcmp correctly'], 'pro'),
  ('pointers', 'Pointers', 'Addresses, dereferencing, pointer arithmetic, pointers with arrays and functions, and pointer-to-pointer.', 'intermediate', 5, 7.0,
     array['Read and write pointer declarations fluently', 'Use pointers to modify caller variables', 'Explain the array-pointer relationship'], 'pro'),
  ('structures', 'Structures, Unions & Enums', 'Grouping data with struct, memory layout and padding, unions, enums and typedef.', 'intermediate', 6, 5.0,
     array['Model records with structs', 'Explain struct padding', 'Build a linked list node'], 'pro'),
  ('dynamic-memory', 'Dynamic Memory', 'The heap, malloc/calloc/realloc/free, leaks, dangling pointers and dynamic data structures.', 'advanced', 7, 6.0,
     array['Allocate and free memory correctly', 'Find leaks and use-after-free bugs', 'Implement a linked list and dynamic array'], 'pro'),
  ('files-preprocessor', 'Files, Preprocessor & Beyond', 'File I/O with FILE*, command-line arguments, macros, function pointers and a capstone project.', 'advanced', 8, 6.0,
     array['Read and write text and binary files', 'Write safe macros', 'Ship a complete multi-file C project'], 'pro')
)
insert into public.modules (course_id, slug, title, summary, level, position, estimated_hours, outcomes, required_plan, status)
select c.id, m.slug, m.title, m.summary, m.level::public.difficulty, m.position, m.hours, m.outcomes, m.plan::public.plan_tier, 'published'
from c, m
on conflict (course_id, slug) do update set title = excluded.title, summary = excluded.summary, level = excluded.level,
  position = excluded.position, estimated_hours = excluded.estimated_hours, outcomes = excluded.outcomes,
  required_plan = excluded.required_plan, status = excluded.status;

with l(module_slug, slug, title, kind, minutes, position, preview) as (values
  ('foundations', 'how-c-compiles', 'How C programs compile: preprocess, compile, link', 'lesson', 12, 1, false),
  ('foundations', 'first-program', 'Your first program and main()', 'lesson', 10, 2, false),
  ('foundations', 'variables-types', 'Variables, data types and sizeof', 'lesson', 16, 3, false),
  ('foundations', 'printf-scanf', 'printf and scanf format specifiers', 'lesson', 14, 4, false),
  ('foundations', 'constants-casting', 'Constants, literals and type casting', 'lesson', 12, 5, false),
  ('foundations', 'foundations-quiz', 'Checkpoint quiz: Foundations', 'quiz', 10, 6, false),
  ('control-flow', 'operators', 'Arithmetic, relational and logical operators', 'lesson', 14, 1, false),
  ('control-flow', 'bitwise', 'Bitwise operators and masks', 'lesson', 18, 2, false),
  ('control-flow', 'if-else', 'if, else-if and the ternary operator', 'lesson', 12, 3, false),
  ('control-flow', 'switch', 'switch statements and fall-through', 'lesson', 12, 4, false),
  ('control-flow', 'loops', 'for, while and do-while loops', 'lesson', 16, 5, false),
  ('control-flow', 'control-quiz', 'Checkpoint quiz: Control flow', 'quiz', 10, 6, false),
  ('functions', 'prototypes', 'Function prototypes and definitions', 'lesson', 12, 1, false),
  ('functions', 'pass-by-value', 'Pass by value and return values', 'lesson', 12, 2, false),
  ('functions', 'scope-storage', 'Scope, lifetime and storage classes', 'lesson', 16, 3, false),
  ('functions', 'recursion', 'Recursion and the call stack', 'lesson', 18, 4, false),
  ('functions', 'functions-quiz', 'Checkpoint quiz: Functions', 'quiz', 10, 5, false),
  ('arrays-strings', 'arrays', 'Declaring and traversing arrays', 'lesson', 12, 1, true),
  ('arrays-strings', 'multi-dimensional', 'Multi-dimensional arrays', 'lesson', 14, 2, false),
  ('arrays-strings', 'strings', 'Strings and the null terminator', 'lesson', 14, 3, false),
  ('arrays-strings', 'string-h', 'string.h: strlen, strcpy, strcmp, strcat', 'lesson', 16, 4, false),
  ('arrays-strings', 'arrays-quiz', 'Checkpoint quiz: Arrays & strings', 'quiz', 10, 5, false),
  ('pointers', 'addresses', 'Addresses and the & operator', 'lesson', 12, 1, true),
  ('pointers', 'dereferencing', 'Declaring and dereferencing pointers', 'lesson', 14, 2, false),
  ('pointers', 'pointer-arithmetic', 'Pointer arithmetic', 'lesson', 16, 3, false),
  ('pointers', 'pointers-arrays', 'Pointers and arrays', 'lesson', 16, 4, false),
  ('pointers', 'pointers-functions', 'Passing pointers to functions', 'lesson', 14, 5, false),
  ('pointers', 'pointers-quiz', 'Checkpoint quiz: Pointers', 'quiz', 12, 6, false),
  ('structures', 'structs', 'Defining and using structures', 'lesson', 14, 1, false),
  ('structures', 'struct-pointers', 'Pointers to structures and ->', 'lesson', 14, 2, false),
  ('structures', 'unions-enums', 'Unions, enums and typedef', 'lesson', 14, 3, false),
  ('structures', 'padding', 'Memory layout and padding', 'lesson', 16, 4, false),
  ('dynamic-memory', 'stack-heap', 'Stack vs heap memory', 'lesson', 12, 1, false),
  ('dynamic-memory', 'malloc-free', 'malloc, calloc and free', 'lesson', 16, 2, false),
  ('dynamic-memory', 'realloc', 'realloc and growing arrays', 'lesson', 14, 3, false),
  ('dynamic-memory', 'leaks', 'Memory leaks and dangling pointers', 'lesson', 16, 4, false),
  ('dynamic-memory', 'linked-list', 'Building a singly linked list', 'lesson', 22, 5, false),
  ('files-preprocessor', 'file-io', 'File I/O: fopen, fprintf, fgets, fclose', 'lesson', 16, 1, false),
  ('files-preprocessor', 'argc-argv', 'Command-line arguments: argc and argv', 'lesson', 12, 2, false),
  ('files-preprocessor', 'macros', 'Macros and conditional compilation', 'lesson', 16, 3, false),
  ('files-preprocessor', 'function-pointers', 'Function pointers and callbacks', 'lesson', 18, 4, false),
  ('files-preprocessor', 'capstone', 'Capstone: Student record manager', 'project', 60, 5, false)
)
insert into public.lessons (module_id, slug, title, kind, estimated_minutes, position, is_free_preview, status)
select mo.id, l.slug, l.title, l.kind::public.lesson_kind, l.minutes, l.position, l.preview, 'published'
from l join public.modules mo on mo.slug = l.module_slug
  join public.courses c on c.id = mo.course_id and c.slug = 'c-programming'
on conflict (module_id, slug) do update set title = excluded.title, kind = excluded.kind,
  estimated_minutes = excluded.estimated_minutes, position = excluded.position,
  is_free_preview = excluded.is_free_preview, status = excluded.status;

-- Every lesson gets a starter body; selected lessons get full content below.
insert into public.lesson_contents (lesson_id, body_md)
select l.id, '## ' || l.title || E'\n\nThis lesson is part of **' || m.title || E'**.\n\n' || m.summary ||
       E'\n\nCompile every example with:\n\n```bash\ngcc -Wall -Wextra -std=c11 main.c -o main\n```\n'
from public.lessons l join public.modules m on m.id = l.module_id
on conflict (lesson_id) do nothing;

update public.lesson_contents lc set body_md = $md$
A C program goes through four stages before it runs. Knowing them explains most confusing compiler and linker errors.

## 1. Preprocessing

Lines starting with `#` are handled first. `#include <stdio.h>` pastes the header in, and `#define` macros are expanded.

```bash
gcc -E main.c -o main.i
```

## 2. Compilation

The compiler turns the preprocessed C into assembly and reports syntax and type errors.

## 3. Assembly

The assembler turns assembly into an object file (`main.o`) of machine code.

## 4. Linking

The linker joins your object files with the C library. An `undefined reference to 'foo'` error comes from this stage, not the compiler.

```bash
gcc -Wall -Wextra -std=c11 main.c -o main
./main
```

**Key takeaway:** compiler errors point at a line of your code; linker errors mean a function was declared but never defined or linked.
$md$
from public.lessons l join public.modules m on m.id = l.module_id
where lc.lesson_id = l.id and m.slug = 'foundations' and l.slug = 'how-c-compiles';

update public.lesson_contents lc set body_md = $md$
A pointer stores an address. Adding an integer to a pointer moves it by that many **elements**, not bytes.

```c
#include <stdio.h>

int main(void) {
    int marks[4] = {72, 85, 91, 64};
    int *p = marks;          // points to marks[0]

    printf("%d\n", *p);       // 72
    printf("%d\n", *(p + 2)); // 91
    return 0;
}
```

## Walking an array

```c
int sum = 0;
for (int *q = marks; q < marks + 4; q++) {
    sum += *q;
}
printf("Total: %d\n", sum);   // Total: 312
```

## Subtracting pointers

Subtracting two pointers into the same array gives the number of elements between them, as a `ptrdiff_t`.

- `p + n` moves `n` elements, not `n` bytes.
- Only compare or subtract pointers within the same array.
- One-past-the-end is a valid comparison target but must never be dereferenced.
$md$
from public.lessons l join public.modules m on m.id = l.module_id
where lc.lesson_id = l.id and m.slug = 'pointers' and l.slug = 'pointer-arithmetic';

-- Practice problems with public samples and hidden judge tests (used from milestone 3).
insert into public.problems (slug, title, difficulty, topic, statement_md, starter_code, hints, xp, status, required_plan)
values
  ('reverse-string', 'Reverse a String', 'easy', 'Strings',
   'Read one word (no spaces, at most 100 characters) and print it reversed, in place.',
   E'#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char s[101];\n    scanf("%100s", s);\n    // TODO: reverse s in place\n    printf("%s\\n", s);\n    return 0;\n}\n',
   array['Use one index at each end.', 'Swap s[i] and s[j], then move them inwards.', 'Stop when i >= j.'], 20, 'published', 'free'),
  ('check-prime', 'Check Prime', 'easy', 'Math',
   'Print YES if n is prime, otherwise NO. 1 ≤ n ≤ 10^9.',
   E'#include <stdio.h>\n\nint main(void) {\n    long n;\n    scanf("%ld", &n);\n    // TODO\n    return 0;\n}\n',
   array['Numbers below 2 are not prime.', 'Only test divisors up to the square root of n.', 'Loop while i * i <= n.'], 20, 'published', 'free'),
  ('second-largest', 'Second Largest in Array', 'medium', 'Arrays',
   'Given n integers, print the second largest distinct value, or -1 if it does not exist.',
   E'#include <stdio.h>\n#include <limits.h>\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    // TODO\n    return 0;\n}\n',
   array['Track the largest and second largest.', 'A new maximum pushes the old one to second.', 'Ignore values equal to the maximum.'], 35, 'published', 'pro')
on conflict (slug) do nothing;

insert into public.test_cases (problem_id, input, expected_output, is_hidden, position)
select p.id, t.input, t.expected, t.hidden, t.position
from (values
  ('reverse-string', 'pointer', 'retniop', false, 1),
  ('reverse-string', 'C', 'C', false, 2),
  ('reverse-string', 'racecar', 'racecar', true, 3),
  ('reverse-string', 'abcdefghijklmnopqrstuvwxyz', 'zyxwvutsrqponmlkjihgfedcba', true, 4),
  ('check-prime', '29', 'YES', false, 1),
  ('check-prime', '1', 'NO', false, 2),
  ('check-prime', '999999937', 'YES', true, 3),
  ('check-prime', '1000000000', 'NO', true, 4),
  ('second-largest', E'5\n12 35 1 10 34', '34', false, 1),
  ('second-largest', E'3\n7 7 7', '-1', true, 2),
  ('second-largest', E'4\n10 10 9 8', '9', true, 3)
) as t(slug, input, expected, hidden, position)
join public.problems p on p.slug = t.slug
where not exists (select 1 from public.test_cases tc where tc.problem_id = p.id);
