# Hello world!

---

A function taking **no arguments** returning **random integers**.

```c
// Definition
int rand(void);

// Usage
int number = rand();
```

---

## FORTRAN

```fortran
X1 = -B + SQRT(B**2 - 4*A*C) / (2 * A);
X2 = -B - SQRT(B**2 - 4*A*C) / (2 * A);
```

## Julia

```julia
x₁ = -b + √(b^2 - 4a * c) / 2a
x₂ = -b + √(b^2 - 4a * c) / 2a
```

---

```python
def square(n):
    print "Sue me!"
    return n * n
```

---

<iframe src="https://gcc.godbolt.org/e#g:!((g:!((g:!((h:codeEditor,i:(fontScale:1.8575209267199997,j:1,source:'int+sum(int+n)%0A%7B%0A++int+total+%3D+0%3B%0A++%0A++for+(int+i+%3D+0%3B+i+%3C+n%3B+i%2B%2B)%0A++++total+%2B%3D+i%3B%0A++%0A++return+total%3B%0A%7D'),l:'5',n:'0',o:'C%2B%2B+source+%231',t:'0')),k:50.7175440874439,l:'4',n:'0',o:'',s:0,t:'0'),(g:!((h:compiler,i:(compiler:clang400,filters:(b:'0',commentOnly:'0',directives:'0',intel:'0'),fontScale:1.8575209267199997,options:'-O3+-std%3Dc%2B%2B14+-march%3Dnative',source:1),l:'5',n:'0',o:'x86-64+clang+4.0.0+(Editor+%231,+Compiler+%231)',t:'0')),k:49.2824559125561,l:'4',n:'0',o:'',s:0,t:'0')),l:'2',n:'0',o:'',t:'0')),version:4"></iframe>

---

<style>
.my-table td {
    min-width: 60px;
    line-height: 60px;
    padding: 0;
    text-align: center;
}
</style>
<table class="my-table">
<tr><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td></tr>
</table>

$\quad\cdot$

<table class="my-table">
<tr><td>5</td><td>2</td><td>1</td><td>6</td><td>4</td><td>8</td><td>4</td><td>0</td><td>1</td><td>3</td></tr>
</table>

---


# :baby: Version 1 

```c++
uint64_t count(uint64_t n)
{
  uint64_t primes = 0;

  vector<uint8_t> is_prime(n, true);

  // Sieve
  for (uint64_t k = 2; k * k < n; ++k)
    if (is_prime[k])
      for (uint64_t m = k * k; m < n; m += k)
        is_prime[m] = false;

  // Count
  for (uint64_t k = 2; k < n; ++k)
    if (is_prime[k])
      ++primes;

  return primes;
}
```

---

# :fire: Version 2 

```c++
uint64_t count(uint64_t n)
{
  uint64_t primes = 1;

  vector<uint8_t> is_prime(n, true);

  // Sieve
  for (uint64_t k = 3; k * k < n; k += 2)
    if (is_prime[k])
      for (uint64_t m = k * k; m < n; m += 2 * k)
        is_prime[m] = false;

  // Count
  for (uint64_t k = 3; k < n; k += 2)
    if (is_prime[k])
      ++primes;

  return primes;
}
```

---

> Why not store odd numbers only?

<div style="height:50px;"></div>

| `k` | `0` | `1` | `2` | `3` | `4` | `5` |  $\cdots$ |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| $n$ | 1 | 3 | 5 | 7 | 9 | 11 | $\cdots$ |

---

# :boom: Version ~~2.0~~ 2.1 

```c++
uint64_t count(uint64_t n) // assume n > 1, even.
{
  uint64_t half = n / 2;
  uint64_t primes = 1;  

  vector<uint8_t> is_prime(half, true);

  // Sieve
  for (uint64_t k = 1; 2 * k * (k + 1) < half; ++k)
    if (is_prime[k])
      for (uint64_t m = 2 * k * (k + 1); m < half; m += 2 * k + 1)
        is_prime[m] = false;

  // Count
  for (uint64_t k = 1; k < half; ++k)
    if (is_prime[k])
      ++primes;

  return primes;
}
```

---

# :rocket: Version 3

```c++
uint64_t count(uint64_t n)
{
  // many more lines of code
}
```

---

# Computing $\pi(10^{10})$

<img src="graph2.svg" width="100%">

