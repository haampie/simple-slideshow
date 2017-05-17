import numpy as np
import matplotlib.pyplot as plt

plt.xkcd()

ax = plt.axes()
ax.add_artist(plt.Circle((0, 0), 1, color='b'))
ax.set_xlim(0, 1)
ax.set_ylim(0, 1)
ax.set_aspect('equal')

plt.show()