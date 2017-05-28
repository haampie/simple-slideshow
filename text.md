# Parallel programming

Today we're gonna talk about parallel programming and how it can speed up your code. First I will say a few words about programming in general, but mostly we will focus on three examples:

1. The first is meant to demystify parallel programming and to convince you it can be easy
2. The second deals with how to assess the costs of a parallel program
3. The last example is meant to show that parallel programming can come at a cost.

---

Have you ever felt like it is not really necessary to upgrade your computer or laptop? That's probably because development has begun to slow. Parallel programming has become a necessity in high-performance computation, simply because clock speed does not increase that much anymore. 

<!--For now, think about parallel programming just as completing a task with multiple people. For instance sorting a deck of cards. How do you keep everyone busy? You can imagine that at some point one person will assemble the whole pile, while other just watch from the side line (that is "starvation"). Or you can imagine it takes time to distribute the cards among everyone (latency). And you can imagine there is some additional management and organizational work necessary (overhead). Lastly, it could be that people fight over a certain card (waiting for contention). In this talk I will focus mostly on the SLO of the SLOW mnemonic. Also, we're gonna see if parallel programming is messy.-->

But first let me say a few words about the relation between programming and mathematics. This is a subject where almost no time is devoted too during our studies, so it's good to take a step back and think about programming itself. 

I'm going to assume most of you are familiar with either Matlab or Python, right? These are typically the starter languages, because they are high-level scripting language. Just write something and press the play button. How many of you are experienced in C / Fortran? These languages are a thin abstraction layer over the assembly code; close to the metal so to say. Since they give fine-grained control over memory usage and stuff like that, they are typically used in numerical mathematics where you really need to squeeze every bit of performance out of a computer.

The languages I've mentioned so far are imperative: you tell the computer how to do what it has to do. On the other hand there are functional languages which are way more descriptive: only tell the computer what to do, not how to do it. Functional programming is probably the weapon of choice for mathematicians: it abstracts details about the computer away and adheres best to the mathematical metaphore with functions and variables.

What do I mean by this mathematical metaphore? Take Fortran, One of the oldest languages around, whose name literally means Formula Translator. It was revolutionary because it allowed for the first time to write equations more or less literally. Not only that, it also had variables and functions.

Let's look at this C example: the `rand` function takes no arguments and returns a random integer. Is that a function? A mapping between sets? Can we define a function whose domain is an empty set? [...] Yes, it's a bluff function: provide me with an element from the empty set and I'll map it somewhere... You can define a function like that, but you can never apply it. In C you can, apparently.

Speaking about function application, in imperative programming it is a physical action. It requires time and work. Of course mathematics requires mental work, but function application itself is not concerned with that at all. And the most pronounced difference is that function applications can have real world side effects. Consider this Python function.

So far the mathematical metaphore for imperative languages. 

Lastly, let's compare the factorial implementation in Haskell and C++. Haskell is declarative indeed, it's nothing more than a mathematical definition. In C++ however, we see a loop where a variable `f` is initialized with `1` and then multiplied by `2, 3, 4, ... n`. Is that `f` really a variable then? Well, probably not. A variable is "variable" in the sense that is a fixed placeholder for an element from a set. But in our case we are mutating it; updating it in-place.

The take-away is that imperative programming cannot do without space and time, concepts which have no correspondence in mathematics. Functional languages such as Haskell do a way better job: you can't have side effects, you can't mutate variables after declaration, et cetera; but this is at the penalty of not being able to fine-tune performance.

---

Now that that's settled, let's continu with a parallel programming example. Do you all know the worst way ever to compute pi by uniformly randomly throwing darts at a dart board? In the image you see the first quadrant of a unit circle, which covers pi / 4 of a unit square. The chance of hitting the dart board is hence pi / 4. Let's implement random throwing in Julia. The rand function generates a random floating point between 0 and 1, and rand(2) gives a pair of them. Taking the norm we have the distance to the origin, which should be less than 1 for a hit. Now we define a hits function as follows, which takes the number of arrows as argument and counts the hits. Lastly we should be able to approximate pi by multiplying the hit ratio with 4. Let's see how we do. Now let's time the execution on a single processor. Next I specify I want to use 2 processors. Let's see how we do now. Almost twice as fast, but not precisely. There is some cost to it apparently.

---

In our second example we will try to quantify what happens. Suppose we want to compute an inner product in parallel of vectors of length 10 using 3 processors / people. The vectors are layed out suggestively at the bottom of the slide. First we must distribute work among processors. I've colored them to make clear which processor is responsible for which index. Now that we have distributed the work, each processor can compute the smaller sub-problem; just taking an inner product with fewer elements. Next, we need to assemble the total inner product; this requires communication between the parties. 

There are two ways to proceed. Your first intuition is probably: let all processors send their result to (for instance) the green processor, and let him assemble the result. But typically the other processors need to know the result as well to continue the computation. That would require sending the result back again. Turns out you can send and receive at the same time, so a better thing to do is to let every processor broadcast its local inner product to every other processor. Then each processor can assemble the final result, and no further communication is necessary. Overhead vs latency.

Now let's go over the computation costs and measure them in floating point operations. In the worst case, a processor receives n / p rounded above numbers; the local inner product requires n / p multiplications and n / p additions. This is the T1. Next, there is some communication: each processor sends and receives p - 1 numbers. That constitutes T2: the g here means "the number of flops you could have done in the same time you sent just one number" and is typically a large constant. Then there is some additional work of summation in T3. Lastly, something I haven't mentioned is that at a few points all processors must synchronize: before they send stuff, at the end of the parallel routine, etc and there is a fixed cost l to it, also constant and dependent on your computer architecture.

Let's take a step back again: the T1 are the unavoidable pieces of computation. The T2, T3 and T4 on the other hand are overhead and latency. Typically you get linear reduction of computation in the number of processors, modulo some costs of communication.

---

Now we come at the third and last example, which deals with the sieve of Eratosthenes. I assume everyone knows this extremely old algorithm, but just in case, here is a visualization of it. It marks composite numbers, and non-composite numbers are found to be prime at the end.

Already when you see this, it does not seem completely trivial how to do it in parallel. Let person 1 cross off multiples of 2, person 2 multiples of 3, person 3 multiples of 4? Or should he wait for person 1 to notify him that it is useless? That would be quite some management. Anyways, let's look at the sequential algorithm first.

Our goal in this example is to compute the prime counting function using the sieve of Eratosthenes. This function simply counts the number of primes below n, and we take n to be 10 billion. Just for the fun of it, in how much time do you think a modern computer would do this computation? (Not parallel)

Here is an implementation in C++. You directly see what I mean with "imperative" and close to the metal. The code consists of three parts, where a long list of booleans is set to true (we assume all numbers are prime), next we cross off composite numbers (setting them to false), lastly we count the prime numbers. 

Note that we start crossing off composites by the square of a prime number. If we go back, take for instance 11, its first multiple not crossed off yet it 11 * 11, all smaller multiples are already captured by 2, 3, 5 and 7.

Another thing to note: we use for simplicity an array of 8 bit integers rather than 1 bit booleans, does anyone know why that is? All in all we need 10 GB of memory.

How long would it take to count the number of primes less than 10 billion? 1 second? 5 seconds? 1 minute? 5 minutes? half an hour? Turns out, about 100 seconds.

Now, let's go back to the sieve and see how we can improve. Suggestions? Yeah! Why would we spend half of our time crossing off even numbers? It's a pain to see that happening. There are two ways to implement this, the first being to simply skip these multiples of two like this. We loop over k = 3, 5, 7, ..., and also skip the even multiples while crossing off numbers. Lastly, we can also skip stuff when counting primes. End result: 56 seconds! Not exactly halved the time, but close. The other way to go is to use half of the memory, literally storing odd numbers only and reindexing them. So k = 3 would correspond to the number 7, etc. You will have some trouble with squares and multiples, and I'm not showing how I came up with this, but this is another way to go. Turns out this is 10s faster! But we do the exact same work, right? How come this is faster? Could be multiple things: we initialize half the memory, some loops are maybe optimized, but in the end we do more computation per step! So it must have to do with memory access and latency.

With this in mind, we can rethink our problem. 