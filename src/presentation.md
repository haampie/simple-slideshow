# Parallel programming

### How to write performant code :rocket:

By Harmen Stoppels

---

# Contents

- Programming & mathematics
- Parallellism by example
- Conclusions.

---

# Programming & math

---

<img src="languages.svg" width="100%">

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


A function taking **no arguments** returning **random integers**.

```c
// Definition
int rand(void);

// Usage
int number = rand();
```

---
```python
def square(n):
    print "Sue me!"
    return n * n
```

---

## Haskell

```haskell
factorial 0 = 1
factorial n = n * factorial (n - 1)
```

## C++

```c++
function factorial(uint64_t n) {
  uint64_t f = 1;
  for (uint64_t i = 1; i <= n; ++i) {
      f *= i;
  }
  return f;
}
```

---

# Approximating $\pi$ the hard way

<img src="./pi.svg" width="100%">

---

# Why parallellism is necessary
- Hardware development is beginning to slow
- Power consumption grows faster than clock speed

---

# :school_satchel: No free lunch

- **S**tarvation
- **L**atency
- **O**verhead
- ~~**W**aiting for contention~~

and ...

- messy code?

---

# Example 1: parallel inner product

---

# Parallel inner product

- $z = \sum_{i = 1}^{n} x_i y_i$
- $n = 10$ elements and $p = 3$ processors

<table class="my-table">
  <tr>
    <td>1</td>
    <td>2</td>
    <td>3</td>
    <td>4</td>
    <td>5</td>
    <td>6</td>
    <td>7</td>
    <td>8</td>
    <td>9</td>
    <td>10</td>
  </tr>
</table>

<table class="my-table">
  <tr>
    <td>5</td>
    <td>2</td>
    <td>1</td>
    <td>6</td>
    <td>4</td>
    <td>8</td>
    <td>4</td>
    <td>0</td>
    <td>1</td>
    <td>3</td>
  </tr>
</table>

---

# Cyclic distribution

<table class="my-table distributed">
  <tr>
    <td>1</td>
    <td>2</td>
    <td>3</td>
    <td>4</td>
    <td>5</td>
    <td>6</td>
    <td>7</td>
    <td>8</td>
    <td>9</td>
    <td>10</td>
  </tr>
</table>

<table class="my-table distributed">
  <tr>
    <td>5</td>
    <td>2</td>
    <td>1</td>
    <td>6</td>
    <td>4</td>
    <td>8</td>
    <td>4</td>
    <td>0</td>
    <td>1</td>
    <td>3</td>
  </tr>
</table>

<hr>

Local subproblems:

<div class="columns">
  <div style="flex: 1; padding: 0 1em;">
    <table class="my-table proc-1">
      <tr>
        <td>1</td>
        <td>4</td>
        <td>7</td>
        <td>10</td>
      </tr>
    </table>
    <table class="my-table proc-1">
      <tr>
      <td>5</td>
      <td>6</td>
      <td>4</td>
      <td>3</td>
      </tr>
    </table>
  </div>
  <div style="flex: 1; padding: 0 1em;">
    <table class="my-table proc-2">
      <tr>
        <td>2</td>
        <td>5</td>
        <td>8</td>
      </tr>
    </table>
    <table class="my-table proc-2">
      <tr>
        <td>2</td>
        <td>4</td>
        <td>0</td>
      </tr>
    </table>
  </div>
  <div style="flex: 1;padding: 0 1em;">
    <table class="my-table proc-3">
      <tr>
        <td>3</td>
        <td>6</td>
        <td>9</td>
      </tr>
    </table>
    <table class="my-table proc-3">
      <tr>
        <td>1</td>
        <td>8</td>
        <td>1</td>
      </tr>
    </table>
  </div>
</div>

<hr>

Evaluate inner product.

<div class="columns">
  <div style="flex: 1; padding: 0 1em;">
    <table class="my-table proc-1 single-el">
      <tr>
        <td>87</td>
      </tr>
    </table>
  </div>
  <div style="flex: 1; padding: 0 1em;">
    <table class="my-table proc-2 single-el">
      <tr>
        <td>24</td>
      </tr>
    </table>
  </div>
  <div style="flex: 1;padding: 0 1em;">
    <table class="my-table proc-3 single-el">
      <tr>
        <td>60</td>
      </tr>
    </table>
  </div>
</div>

---

# Communication


<div class="columns">
  <div style="flex: 1; padding: 0 1em;">
    <table class="my-table proc-1 single-el">
      <tr>
        <td>87</td>
      </tr>
    </table>
  </div>
  <div style="flex: 1; padding: 0 1em;">
    <table class="my-table proc-2 single-el">
      <tr>
        <td>24</td>
      </tr>
    </table>
  </div>
  <div style="flex: 1;padding: 0 1em;">
    <table class="my-table proc-3 single-el">
      <tr>
        <td>60</td>
      </tr>
    </table>
  </div>
</div>

<hr>

Each processor sends its local solution to the others.

<div class="columns">
  <div style="flex: 1; padding: 0 1em;">
    <table class="my-table distributed">
      <tr>
        <td>87</td>
        <td>24</td>
        <td>60</td>
      </tr>
    </table>
  </div>
  <div style="flex: 1; padding: 0 1em;">
    <table class="my-table distributed">
      <tr>
        <td>87</td>
        <td>24</td>
        <td>60</td>
      </tr>
    </table>
  </div>
  <div style="flex: 1;padding: 0 1em;">
    <table class="my-table distributed">
      <tr>
        <td>87</td>
        <td>24</td>
        <td>60</td>
      </tr>
    </table>
  </div>
</div>

<hr>

Done after one last summation.

<div class="columns">
  <div style="flex: 1; padding: 0 1em;">
    <table class="my-table proc-1 single-el">
      <tr>
        <td>171</td>
      </tr>
    </table>
  </div>
  <div style="flex: 1; padding: 0 1em;">
    <table class="my-table proc-2 single-el">
      <tr>
        <td>171</td>
      </tr>
    </table>
  </div>
  <div style="flex: 1;padding: 0 1em;">
    <table class="my-table proc-3 single-el">
      <tr>
        <td>171</td>
      </tr>
    </table>
  </div>
</div>

---

# A measure of costs

- Components:
$$\begin{aligned}C_1 &= 2\left\lceil \frac{n}{p} \right\rceil - 1 & \text{(local inner product)}\\
~ \\
C_2 &= (p - 1)g & \text{(communication)}\\
~ \\
C_3 &= p - 1 & \text{(local sum)}\end{aligned}$$

- In total (including 3 synchronizations)
$$C = \left(2\left\lceil \frac{n}{p} \right\rceil + p - 2\right) + (p - 1)g + 3\ell$$

---

# Example 2: sieve of Eratosthenes

---

# Sieve of Eratosthenes

<div class="columns">
  <table id="simple-sieve" class="prime-table"> <tr> <td class="not-prime">0</td><td class="not-prime">1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td></tr><tr> <td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td></tr><tr> <td>20</td><td>21</td><td>22</td><td>23</td><td>24</td><td>25</td><td>26</td><td>27</td><td>28</td><td>29</td></tr><tr> <td>30</td><td>31</td><td>32</td><td>33</td><td>34</td><td>35</td><td>36</td><td>37</td><td>38</td><td>39</td></tr><tr> <td>40</td><td>41</td><td>42</td><td>43</td><td>44</td><td>45</td><td>46</td><td>47</td><td>48</td><td>49</td></tr><tr> <td>50</td><td>51</td><td>52</td><td>53</td><td>54</td><td>55</td><td>56</td><td>57</td><td>58</td><td>59</td></tr><tr> <td>60</td><td>61</td><td>62</td><td>63</td><td>64</td><td>65</td><td>66</td><td>67</td><td>68</td><td>69</td></tr><tr> <td>70</td><td>71</td><td>72</td><td>73</td><td>74</td><td>75</td><td>76</td><td>77</td><td>78</td><td>79</td></tr><tr> <td>80</td><td>81</td><td>82</td><td>83</td><td>84</td><td>85</td><td>86</td><td>87</td><td>88</td><td>89</td></tr><tr> <td>90</td><td>91</td><td>92</td><td>93</td><td>94</td><td>95</td><td>96</td><td>97</td><td>98</td><td>99</td></tr></table>

  <div class="snd-col">
    <button id="start-1" class="btn">go</button>
  </div>
</div>

---

# Goal

Compute the number of primes less than $10\,000\,000\,000$ i.e. evaluate 

$$\pi(10^{10})$$

---


# :baby: Version 1 

```c++
uint64_t count(uint64_t n)
{
  uint64_t primes = 0;

  vector<uint8_t> is_prime(n, true);           // Initialize

  for (uint64_t k = 2; k * k < n; ++k)         // Sieve
    if (is_prime[k])
      for (uint64_t m = k * k; m < n; m += k)
        is_prime[m] = false;

  for (uint64_t k = 2; k < n; ++k)             // Count
    if (is_prime[k])
      ++primes;

  return primes;
}
```

---

# :clock1: <span class="nice">96.9</span> seconds.

---

# :fire: Version 2 

```c++
uint64_t count(uint64_t n)
{
  uint64_t primes = 1;

  vector<uint8_t> is_prime(n, true);           // Initialize

  for (uint64_t k = 3; k * k < n; k += 2)      // Sieve
    if (is_prime[k])
      for (uint64_t m = k * k; m < n; m += 2 * k)
        is_prime[m] = false;

  for (uint64_t k = 3; k < n; k += 2)          // Count
    if (is_prime[k])
      ++primes;

  return primes;
}
```

---

# :clock2: ~~96.9~~ <span class="nice">56.1</span> seconds.

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

  vector<uint8_t> is_prime(half, true);              // Initialize

  for (uint64_t k = 1; 2 * k * (k + 1) < half; ++k)  // Sieve
    if (is_prime[k])
      for (uint64_t m = 2 * k * (k + 1); m < half; m += 2 * k + 1)
        is_prime[m] = false;

  for (uint64_t k = 1; k < half; ++k)                // Count
    if (is_prime[k])
      ++primes;

  return primes;
}
```
  
---

# :clock3: ~~96.9~~ ~~56.1~~ <span class="nice">47.5</span> seconds.

- Why is this faster?

---

# Segmented sieve

<div class="columns">
  <table id="segmented-sieve" class="prime-table"> <tr> <td class="not-prime">0</td><td class="not-prime">1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td></tr><tr> <td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td></tr><tr> <td>20</td><td>21</td><td>22</td><td>23</td><td>24</td><td>25</td><td>26</td><td>27</td><td>28</td><td>29</td></tr><tr> <td>30</td><td>31</td><td>32</td><td>33</td><td>34</td><td>35</td><td>36</td><td>37</td><td>38</td><td>39</td></tr><tr> <td>40</td><td>41</td><td>42</td><td>43</td><td>44</td><td>45</td><td>46</td><td>47</td><td>48</td><td>49</td></tr><tr> <td>50</td><td>51</td><td>52</td><td>53</td><td>54</td><td>55</td><td>56</td><td>57</td><td>58</td><td>59</td></tr><tr> <td>60</td><td>61</td><td>62</td><td>63</td><td>64</td><td>65</td><td>66</td><td>67</td><td>68</td><td>69</td></tr><tr> <td>70</td><td>71</td><td>72</td><td>73</td><td>74</td><td>75</td><td>76</td><td>77</td><td>78</td><td>79</td></tr><tr> <td>80</td><td>81</td><td>82</td><td>83</td><td>84</td><td>85</td><td>86</td><td>87</td><td>88</td><td>89</td></tr><tr> <td>90</td><td>91</td><td>92</td><td>93</td><td>94</td><td>95</td><td>96</td><td>97</td><td>98</td><td>99</td></tr></table>

  <div class="snd-col">
    <button id="start-2" class="btn">go</button>
  </div>
</div>

---

# :rocket: Version 3

```c++
uint64_t count(uint64_t n)
{
  // Too many lines of code
}
```

---

# :clock4: ~~96.9~~ ~~56.1~~ ~~47.5~~ <span class="nice">11.7</span> seconds.

<img src="graph2.svg">

---

# Conclusion
- Understand the architecture
- 9 women can't get 1 baby in a month
- Don't randomly access random access memory
- Use data that is physically nearby
- ...
