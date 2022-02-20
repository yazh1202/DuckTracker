from flask import Blueprint, render_template,request,flash

views = Blueprint('views',__name__)
@views.route('/')
def home():
    v = 0
    for c in range(1,100):
        v=c
    return render_template("home.html")