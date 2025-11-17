import turtle
import math
from turtle import *
def hearta(x):
    return 15*math.sin(x)**3
def heartb(x):
    return 12*math.cos(x)-5*\
    math.cos(2*x)-2*\
    math.cos(3*x)-\
    math.cos(4*x)
speed (0)
bgcolor("black")
color("red")
ht()
up()
goto(-30,200)
write("B+S", font=("arial",24,"normal"))
for i in range(6000):
    goto(hearta(i)*20,heartb(i)*20)
    down()
    goto(0,0)