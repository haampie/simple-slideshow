  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Parallel Programming</title>
    <link rel="stylesheet" href="./style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css">
  </head>
  <body class="markdown-body">
    <div id="slide-wrap">
        <div class="slide" id="0"><h1>Parallel programming</h1>
<h3>How to write performant code <img class="emoji" draggable="false" alt="🚀" src="https://twemoji.maxcdn.com/2/svg/1f680.svg"></h3>
<p>By Harmen Stoppels</p>
</div>
        <div class="slide" id="1"><h1>Contents</h1>
<ul>
<li>Programming &amp; mathematics</li>
<li>What makes a program fast?</li>
<li>Prime counting example</li>
<li>Conclusions.</li>
</ul>
</div>
        <div class="slide" id="2"><h1>Programming &amp; math</h1>
</div>
        <div class="slide" id="3"><img src="languages.svg" width="100%">
</div>
        <div class="slide" id="4"><h2>FORTRAN</h2>
<pre><code class="language-fortran">X1 = -B + <span class="hljs-built_in">SQRT</span>(B**<span class="hljs-number">2</span> - <span class="hljs-number">4</span>*A*C) / (<span class="hljs-number">2</span> * A);
X2 = -B - <span class="hljs-built_in">SQRT</span>(B**<span class="hljs-number">2</span> - <span class="hljs-number">4</span>*A*C) / (<span class="hljs-number">2</span> * A);
</code></pre>
<h2>Julia</h2>
<pre><code class="language-julia">x₁ = -b + √(b^<span class="hljs-number">2</span> - <span class="hljs-number">4</span>a * c) / <span class="hljs-number">2</span>a
x₂ = -b + √(b^<span class="hljs-number">2</span> - <span class="hljs-number">4</span>a * c) / <span class="hljs-number">2</span>a
</code></pre>
</div>
        <div class="slide" id="5"><p>A function taking <strong>no arguments</strong> returning <strong>random integers</strong>.</p>
<pre><code class="language-c"><span class="hljs-comment">// Definition</span>
<span class="hljs-function"><span class="hljs-keyword">int</span> <span class="hljs-title">rand</span><span class="hljs-params">(<span class="hljs-keyword">void</span>)</span></span>;

<span class="hljs-comment">// Usage</span>
<span class="hljs-keyword">int</span> number = rand();
</code></pre>
</div>
        <div class="slide" id="6"><pre><code class="language-python"><span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">square</span><span class="hljs-params">(n)</span>:</span>
    <span class="hljs-keyword">print</span> <span class="hljs-string">"Sue me!"</span>
    <span class="hljs-keyword">return</span> n * n
</code></pre>
</div>
        <div class="slide" id="7"><!-- <iframe src="https://gcc.godbolt.org/e#g:!((g:!((g:!((h:codeEditor,i:(fontScale:1.8575209267199997,j:1,source:'int+sum(int+n)%0A%7B%0A++int+total+%3D+0%3B%0A++%0A++for+(int+i+%3D+0%3B+i+%3C+n%3B+i%2B%2B)%0A++++total+%2B%3D+i%3B%0A++%0A++return+total%3B%0A%7D'),l:'5',n:'0',o:'C%2B%2B+source+%231',t:'0')),k:50.7175440874439,l:'4',n:'0',o:'',s:0,t:'0'),(g:!((h:compiler,i:(compiler:clang400,filters:(b:'0',commentOnly:'0',directives:'0',intel:'0'),fontScale:1.8575209267199997,options:'-O3+-std%3Dc%2B%2B14+-march%3Dnative',source:1),l:'5',n:'0',o:'x86-64+clang+4.0.0+(Editor+%231,+Compiler+%231)',t:'0')),k:49.2824559125561,l:'4',n:'0',o:'',s:0,t:'0')),l:'2',n:'0',o:'',t:'0')),version:4"></iframe> -->
</div>
        <div class="slide" id="8"><h1>Parallel inner product</h1>
<ul>
<li><span class="katex"><span class="katex-mathml"><math><semantics><mrow><mi>n</mi><mo>=</mo><mn>1</mn><mn>0</mn></mrow><annotation encoding="application/x-tex">n = 10</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="strut" style="height:0.64444em;"></span><span class="strut bottom" style="height:0.64444em;vertical-align:0em;"></span><span class="base textstyle uncramped"><span class="mord mathit">n</span><span class="mrel">=</span><span class="mord mathrm">1</span><span class="mord mathrm">0</span></span></span></span> elements and <span class="katex"><span class="katex-mathml"><math><semantics><mrow><mi>P</mi><mo>=</mo><mn>3</mn></mrow><annotation encoding="application/x-tex">P = 3</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="strut" style="height:0.68333em;"></span><span class="strut bottom" style="height:0.68333em;vertical-align:0em;"></span><span class="base textstyle uncramped"><span class="mord mathit" style="margin-right:0.13889em;">P</span><span class="mrel">=</span><span class="mord mathrm">3</span></span></span></span> processors</li>
</ul>
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
</div>
        <div class="slide" id="9"><h1>Cyclic distribution</h1>
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
<p>Local subproblems:</p>
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
<p>Evaluate inner product.</p>
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
</div>
        <div class="slide" id="10"><h1>Communication</h1>
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
<p>Each processor sends its local solution to the others.</p>
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
<p>Done after one last summation.</p>
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
</div>
        <div class="slide" id="11"><h1>Sieve of Eratosthenes</h1>
<div class="columns">
  <table id="simple-sieve" class="prime-table"> <tr> <td class="not-prime">0</td><td class="not-prime">1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td></tr><tr> <td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td></tr><tr> <td>20</td><td>21</td><td>22</td><td>23</td><td>24</td><td>25</td><td>26</td><td>27</td><td>28</td><td>29</td></tr><tr> <td>30</td><td>31</td><td>32</td><td>33</td><td>34</td><td>35</td><td>36</td><td>37</td><td>38</td><td>39</td></tr><tr> <td>40</td><td>41</td><td>42</td><td>43</td><td>44</td><td>45</td><td>46</td><td>47</td><td>48</td><td>49</td></tr><tr> <td>50</td><td>51</td><td>52</td><td>53</td><td>54</td><td>55</td><td>56</td><td>57</td><td>58</td><td>59</td></tr><tr> <td>60</td><td>61</td><td>62</td><td>63</td><td>64</td><td>65</td><td>66</td><td>67</td><td>68</td><td>69</td></tr><tr> <td>70</td><td>71</td><td>72</td><td>73</td><td>74</td><td>75</td><td>76</td><td>77</td><td>78</td><td>79</td></tr><tr> <td>80</td><td>81</td><td>82</td><td>83</td><td>84</td><td>85</td><td>86</td><td>87</td><td>88</td><td>89</td></tr><tr> <td>90</td><td>91</td><td>92</td><td>93</td><td>94</td><td>95</td><td>96</td><td>97</td><td>98</td><td>99</td></tr></table>
  <div class="snd-col">
    <button id="start-1" class="btn">go</button>
  </div>
</div>
</div>
        <div class="slide" id="12"><h1><img class="emoji" draggable="false" alt="👶" src="https://twemoji.maxcdn.com/2/svg/1f476.svg"> Version 1</h1>
<pre><code class="language-c++"><span class="hljs-keyword">uint64_t</span> count(<span class="hljs-keyword">uint64_t</span> n)
{
  <span class="hljs-keyword">uint64_t</span> primes = <span class="hljs-number">0</span>;

  <span class="hljs-built_in">vector</span>&lt;<span class="hljs-keyword">uint8_t</span>&gt; is_prime(n, <span class="hljs-literal">true</span>);

  <span class="hljs-comment">// Sieve</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">uint64_t</span> k = <span class="hljs-number">2</span>; k * k &lt; n; ++k)
    <span class="hljs-keyword">if</span> (is_prime[k])
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">uint64_t</span> m = k * k; m &lt; n; m += k)
        is_prime[m] = <span class="hljs-literal">false</span>;

  <span class="hljs-comment">// Count</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">uint64_t</span> k = <span class="hljs-number">2</span>; k &lt; n; ++k)
    <span class="hljs-keyword">if</span> (is_prime[k])
      ++primes;

  <span class="hljs-keyword">return</span> primes;
}
</code></pre>
</div>
        <div class="slide" id="13"><h1><img class="emoji" draggable="false" alt="🕐" src="https://twemoji.maxcdn.com/2/svg/1f550.svg"> <span class="nice">96.9</span> seconds.</h1>
</div>
        <div class="slide" id="14"><h1><img class="emoji" draggable="false" alt="🔥" src="https://twemoji.maxcdn.com/2/svg/1f525.svg"> Version 2</h1>
<pre><code class="language-c++"><span class="hljs-keyword">uint64_t</span> count(<span class="hljs-keyword">uint64_t</span> n)
{
  <span class="hljs-keyword">uint64_t</span> primes = <span class="hljs-number">1</span>;

  <span class="hljs-built_in">vector</span>&lt;<span class="hljs-keyword">uint8_t</span>&gt; is_prime(n, <span class="hljs-literal">true</span>);

  <span class="hljs-comment">// Sieve</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">uint64_t</span> k = <span class="hljs-number">3</span>; k * k &lt; n; k += <span class="hljs-number">2</span>)
    <span class="hljs-keyword">if</span> (is_prime[k])
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">uint64_t</span> m = k * k; m &lt; n; m += <span class="hljs-number">2</span> * k)
        is_prime[m] = <span class="hljs-literal">false</span>;

  <span class="hljs-comment">// Count</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">uint64_t</span> k = <span class="hljs-number">3</span>; k &lt; n; k += <span class="hljs-number">2</span>)
    <span class="hljs-keyword">if</span> (is_prime[k])
      ++primes;

  <span class="hljs-keyword">return</span> primes;
}
</code></pre>
</div>
        <div class="slide" id="15"><h1><img class="emoji" draggable="false" alt="🕑" src="https://twemoji.maxcdn.com/2/svg/1f551.svg"> <s>96.9</s> <span class="nice">56.1</span> seconds.</h1>
</div>
        <div class="slide" id="16"><blockquote>
<p>Why not store odd numbers only?</p>
</blockquote>
<div style="height:50px;"></div>
<table>
<thead>
<tr>
<th style="text-align:center"><code>k</code></th>
<th style="text-align:center"><code>0</code></th>
<th style="text-align:center"><code>1</code></th>
<th style="text-align:center"><code>2</code></th>
<th style="text-align:center"><code>3</code></th>
<th style="text-align:center"><code>4</code></th>
<th style="text-align:center"><code>5</code></th>
<th style="text-align:center"><span class="katex"><span class="katex-mathml"><math><semantics><mrow><mo>⋯</mo></mrow><annotation encoding="application/x-tex">\cdots</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="strut" style="height:0.31em;"></span><span class="strut bottom" style="height:0.31em;vertical-align:0em;"></span><span class="base textstyle uncramped"><span class="minner">⋯</span></span></span></span></th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center"><span class="katex"><span class="katex-mathml"><math><semantics><mrow><mi>n</mi></mrow><annotation encoding="application/x-tex">n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="strut" style="height:0.43056em;"></span><span class="strut bottom" style="height:0.43056em;vertical-align:0em;"></span><span class="base textstyle uncramped"><span class="mord mathit">n</span></span></span></span></td>
<td style="text-align:center">1</td>
<td style="text-align:center">3</td>
<td style="text-align:center">5</td>
<td style="text-align:center">7</td>
<td style="text-align:center">9</td>
<td style="text-align:center">11</td>
<td style="text-align:center"><span class="katex"><span class="katex-mathml"><math><semantics><mrow><mo>⋯</mo></mrow><annotation encoding="application/x-tex">\cdots</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="strut" style="height:0.31em;"></span><span class="strut bottom" style="height:0.31em;vertical-align:0em;"></span><span class="base textstyle uncramped"><span class="minner">⋯</span></span></span></span></td>
</tr>
</tbody>
</table>
</div>
        <div class="slide" id="17"><h1><img class="emoji" draggable="false" alt="💥" src="https://twemoji.maxcdn.com/2/svg/1f4a5.svg"> Version <s>2.0</s> 2.1</h1>
<pre><code class="language-c++"><span class="hljs-keyword">uint64_t</span> count(<span class="hljs-keyword">uint64_t</span> n) <span class="hljs-comment">// assume n &gt; 1, even.</span>
{
  <span class="hljs-keyword">uint64_t</span> half = n / <span class="hljs-number">2</span>;
  <span class="hljs-keyword">uint64_t</span> primes = <span class="hljs-number">1</span>;  

  <span class="hljs-built_in">vector</span>&lt;<span class="hljs-keyword">uint8_t</span>&gt; is_prime(half, <span class="hljs-literal">true</span>);

  <span class="hljs-comment">// Sieve</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">uint64_t</span> k = <span class="hljs-number">1</span>; <span class="hljs-number">2</span> * k * (k + <span class="hljs-number">1</span>) &lt; half; ++k)
    <span class="hljs-keyword">if</span> (is_prime[k])
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">uint64_t</span> m = <span class="hljs-number">2</span> * k * (k + <span class="hljs-number">1</span>); m &lt; half; m += <span class="hljs-number">2</span> * k + <span class="hljs-number">1</span>)
        is_prime[m] = <span class="hljs-literal">false</span>;

  <span class="hljs-comment">// Count</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">uint64_t</span> k = <span class="hljs-number">1</span>; k &lt; half; ++k)
    <span class="hljs-keyword">if</span> (is_prime[k])
      ++primes;

  <span class="hljs-keyword">return</span> primes;
}
</code></pre>
</div>
        <div class="slide" id="18"><h1><img class="emoji" draggable="false" alt="🕒" src="https://twemoji.maxcdn.com/2/svg/1f552.svg"> <s>96.9</s> <s>56.1</s> <span class="nice">47.5</span> seconds.</h1>
</div>
        <div class="slide" id="19"><h1>Segmented sieve</h1>
<div class="columns">
  <table id="segmented-sieve" class="prime-table"> <tr> <td class="not-prime">0</td><td class="not-prime">1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td></tr><tr> <td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td></tr><tr> <td>20</td><td>21</td><td>22</td><td>23</td><td>24</td><td>25</td><td>26</td><td>27</td><td>28</td><td>29</td></tr><tr> <td>30</td><td>31</td><td>32</td><td>33</td><td>34</td><td>35</td><td>36</td><td>37</td><td>38</td><td>39</td></tr><tr> <td>40</td><td>41</td><td>42</td><td>43</td><td>44</td><td>45</td><td>46</td><td>47</td><td>48</td><td>49</td></tr><tr> <td>50</td><td>51</td><td>52</td><td>53</td><td>54</td><td>55</td><td>56</td><td>57</td><td>58</td><td>59</td></tr><tr> <td>60</td><td>61</td><td>62</td><td>63</td><td>64</td><td>65</td><td>66</td><td>67</td><td>68</td><td>69</td></tr><tr> <td>70</td><td>71</td><td>72</td><td>73</td><td>74</td><td>75</td><td>76</td><td>77</td><td>78</td><td>79</td></tr><tr> <td>80</td><td>81</td><td>82</td><td>83</td><td>84</td><td>85</td><td>86</td><td>87</td><td>88</td><td>89</td></tr><tr> <td>90</td><td>91</td><td>92</td><td>93</td><td>94</td><td>95</td><td>96</td><td>97</td><td>98</td><td>99</td></tr></table>
  <div class="snd-col">
    <button id="start-2" class="btn">go</button>
  </div>
</div>
</div>
        <div class="slide" id="20"><h1><img class="emoji" draggable="false" alt="🚀" src="https://twemoji.maxcdn.com/2/svg/1f680.svg"> Version 3</h1>
<pre><code class="language-c++"><span class="hljs-keyword">uint64_t</span> count(<span class="hljs-keyword">uint64_t</span> n)
{
  <span class="hljs-comment">// Too many lines of code</span>
}
</code></pre>
</div>
        <div class="slide" id="21"><h1><img class="emoji" draggable="false" alt="🕓" src="https://twemoji.maxcdn.com/2/svg/1f553.svg"> <s>96.9</s> <s>56.1</s> <s>47.5</s> <span class="nice">11.7</span> seconds.</h1>
</div>
        <div class="slide" id="22"><h1>Computing <span class="katex"><span class="katex-mathml"><math><semantics><mrow><mi>π</mi><mo>(</mo><mn>1</mn><msup><mn>0</mn><mrow><mn>1</mn><mn>0</mn></mrow></msup><mo>)</mo></mrow><annotation encoding="application/x-tex">\pi(10^{10})</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="strut" style="height:0.8141079999999999em;"></span><span class="strut bottom" style="height:1.064108em;vertical-align:-0.25em;"></span><span class="base textstyle uncramped"><span class="mord mathit" style="margin-right:0.03588em;">π</span><span class="mopen">(</span><span class="mord mathrm">1</span><span class="mord"><span class="mord mathrm">0</span><span class="vlist"><span style="top:-0.363em;margin-right:0.05em;"><span class="fontsize-ensurer reset-size5 size5"><span style="font-size:0em;">​</span></span><span class="reset-textstyle scriptstyle uncramped"><span class="mord scriptstyle uncramped"><span class="mord mathrm">1</span><span class="mord mathrm">0</span></span></span></span><span class="baseline-fix"><span class="fontsize-ensurer reset-size5 size5"><span style="font-size:0em;">​</span></span>​</span></span></span><span class="mclose">)</span></span></span></span></h1>
<img src="graph2.svg">
</div>
        <div class="slide" id="23"><h1>Conclusion</h1>
<ul>
<li>Understand the architecture</li>
<li>Use data that is physically nearby</li>
<li>…</li>
</ul>
</div>
    </div>

    <script src="./script.js"></script>
  </body>
  </html>