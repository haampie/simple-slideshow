function fs()
{
  if (document.documentElement.requestFullscreen) { // W3C API
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.mozRequestFullScreen) { // Mozilla current API
    document.documentElement.mozRequestFullScreen();
  } else if (document.documentElement.webkitRequestFullScreen) { // Webkit current API
    document.documentElement.webkitRequestFullScreen();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  var num = parseInt(location.hash.slice(1), 10);
  var slide = num ? num : 0;
  var total = document.querySelectorAll('.slide').length;

  document.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
      case 37:
      case 38:
        slide = Math.max(0, slide - 1);
        location.hash = ['#', slide].join('');
        e.preventDefault();
      break;
      case 39:
      case 40:
        slide = Math.min(total - 1, slide + 1);
        location.hash = ['#', slide].join('');
        e.preventDefault();
      break;
      case 27:
        document.getElementById('slide-wrap').classList.toggle("overview");
      break;
      case 70:
        fs();
      break;
    }
  });

  document.getElementById('start-1').addEventListener('click', (e) => {
    var t = document.getElementById('simple-sieve');
    var cells = t.querySelectorAll('td');

    Array.from(cells).slice(2).forEach((el) => {
      el.classList.remove('active-prime', 'not-prime', 'is-prime');
    });

    var queue = [];

    var is_prime = Array(cells.length).fill(true); 

    for (let i = 2; i * i < is_prime.length; i++)
    {
      if (is_prime[i]) {
        
        queue.push(() => {
          cells[i].classList.add('active-prime');
        });

        for (let j = i * i; j < cells.length; j += i)
        {
          is_prime[j] = false;

          queue.push(() => {
            cells[j].classList.add('not-prime');
          });
        }

        queue.push(() => {
          cells[i].classList.remove('active-prime');
        });
      }
    }

    for (let i = 2; i < is_prime.length; i++) {
      if (is_prime[i]) {
        queue.push(() => {
          cells[i].classList.add('is-prime');
        });
      }
    }

    var worker = () => {
      if(queue.length > 0) {
        (queue.shift())();
        setTimeout(worker, 100);
      }
    };

    worker();
  });

  document.getElementById('start-2').addEventListener('click', (e) => {
    var t = document.getElementById('segmented-sieve');
    var cells = t.querySelectorAll('td');
    var rows = t.querySelectorAll('tr');

    Array.from(cells).slice(2).forEach((el) => {
      el.classList.remove('active-prime', 'not-prime', 'is-prime');
    });

    var queue = [];
    var is_prime = Array(cells.length).fill(true);
    var primes = [];

    for (let i = 2; i * i < Math.sqrt(is_prime.length); i++)
    {
      if (is_prime[i])
      {
        queue.push(() => {
          cells[i].classList.add('active-prime');
        });

        // let idx = i * i;

        for (let j = i * i; j < Math.sqrt(is_prime.length); j += i, idx = j)
        {
          is_prime[j] = false;
          queue.push(() => {
            cells[j].classList.add('not-prime');
          });
        }

        primes.push({number: i, idx: idx});

        // queue.push(() => {
        //   cells[idx].classList.add('active-prime');
        // });

        queue.push(() => {
          cells[i].classList.remove('active-prime');
        });
      }
    }

    var lastprime = primes[primes.length - 1].number;
    for (let i = 2; i < Math.sqrt(is_prime.length); i++)
    {
      if (is_prime[i])
      {
        queue.push(() => {
          cells[i].classList.add('is-prime');
        });

        if (i > lastprime)
        {
          primes.push({number: i, idx: i * i});
          // queue.push(() => {
          //   cells[i*i].classList.add('active-prime');
          // });
        }
      }
    }

    for (let row = 1; row < rows.length; row++)
    {
      let low = row * 10;
      let high = Math.min((row + 1) * 10, 100);

      queue.push(() => {
        rows[row].classList.add('active-row');
      });

      for (let p = 0; p < primes.length; p++)
      {
        let curr = primes[p].number;

        if (primes[p].idx > high)
          continue;

        queue.push(() => {
          cells[curr].classList.add('active-prime');
        });

        for (; primes[p].idx < high; primes[p].idx += primes[p].number)
        {
          let multiple = primes[p].idx;

          is_prime[multiple] = false;

          queue.push(() => {
            cells[multiple].classList.add('not-prime');
          });
        }

        queue.push(() => {
          cells[curr].classList.remove('active-prime');
        });
      }

      for (let i = low; i < high; i++)
      {
        if (is_prime[i])
        {
          queue.push(() => {
            cells[i].classList.add('is-prime');
          });
        }
      }

      queue.push(() => {
        rows[row].classList.remove('active-row');
      });
    }


    var worker = () => {
      if(queue.length > 0) {
        (queue.shift())();
        setTimeout(worker, 100);
      }
    };

    worker();
  });
});
