import numpy as np
import matplotlib.pyplot as plt

plt.xkcd()
plt.xticks([])
plt.yticks([])

ax = plt.axes()

plt.annotate('C\nFortran\nC++', xy = (-0.5, 0.5), horizontalalignment='center', verticalalignment='center', linespacing=2)
plt.annotate('Matlab\nJulia\nPython', xy = (-0.5, -0.5), horizontalalignment='center', verticalalignment='center', linespacing=2)
plt.annotate('Haskell', xy = (0.5, 0.5), horizontalalignment='center', verticalalignment='center', linespacing=2)
plt.annotate('Lisp', xy = (0.5, -0.5), horizontalalignment='center', verticalalignment='center', linespacing=2)

# ax.text(0.05, 1.1, "fear that\nthere's\nsomething\nbehind me")

# ax.text(0.25, 0.8, "forward\nspeed")
# ax.plot([0.32, 0.35], [0.75, 0.35], '-k', lw=0.5)

# ax.text(0.9, 0.4, "embarrassment")
# ax.plot([1.0, 0.8], [0.55, 1.05], '-k', lw=0.5)

ax.set_title("Programming languages")
# ax.axis('off')
ax.set_xlim(-1, 1)
ax.set_ylim(-1, 1)

plt.annotate(s='', xy=(-1, 0), xytext=(1,0), arrowprops=dict(arrowstyle='<->'))
plt.annotate(s='', xy=(0, 1), xytext=(0,-1), arrowprops=dict(arrowstyle='<->'))
ax.text(-0.65, 0, "Imperative", horizontalalignment='center', verticalalignment='center', fontstyle='italic')
ax.text(0.65, 0, "Functional", horizontalalignment='center', verticalalignment='center', fontstyle='italic')
ax.text(0, 0.65, "Static", horizontalalignment='center', verticalalignment='center', fontstyle='italic')
ax.text(0, -0.65, "Dynamic", horizontalalignment='center', verticalalignment='center', fontstyle='italic')
# arrowed_spines(plt.gcf(), ax)
plt.show()