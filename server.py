# run this WITHOUT VAGRANT alongside server_react.py
# python server-override.py 5002
import os
import requests
from jinja2 import StrictUndefined
from flask import Flask, render_template, request, flash, redirect, jsonify, session
from flask_debugtoolbar import DebugToolbarExtension
from newsapi import NewsApiClient
import json
from article_scraper import *
from model import connect_to_db, db, Article, Tone, Score, Category
from news_api_functions import *
from tone_api_functions import *
from sqlalchemy import desc, func
from tone_filter import *
from source_stats import *

#Set up flask object
app = Flask(__name__)
app.secret_key = "SECRET"

# Normally, if you use an undefined variable in Jinja2, it fails
# silently. This is horrible. Fix this so that, instead, it raises an
# error.
app.jinja_env.undefined = StrictUndefined

@app.route('/')
def show_homepage():
    """homepage"""
    return render_template('homepage.html')

@app.route('/headlines-by-emotion')
def show_headlines_by_emotion():
    """Display headlines for chisen emotion"""
    return render_template('headlines_by_emotion.html')

@app.route('/headlines-by-language')
def show_headlines_by_language():
    """Display headlines for chosen emotion"""
    return render_template('headlines_by_language.html')
    
@app.route('/source-stats/<chosen_source>')
def show_chosen_source_stats(chosen_source):
    """Get stats for chosen source"""
    # session['selected_source'] = chosen_source
    # print('Selected source changed insode source-stats/<chosen_source>', session['chosen_source'])
    return render_template('source_stats.html')


########################################################################
#REACT ROUTES

@app.route('/get-chosen-emotion', methods=['POST'])
def get_chosen_emotion():
    """Get chosen emotion from form post"""
    session['selected_emotion'] = request.json['selected_tone']
    print("session['selected_emotion']", session['selected_emotion'])
    return redirect('/headlines-by-emotion')

@app.route('/get-chosen-language', methods=['POST'])
def get_chosen_language():
    """Get chosen emotion from form post"""
    session['selected_language'] = request.json['selected_tone']
    print("session['selected_language']", session['selected_language'])
    return redirect('/headlines-by-language')

@app.route('/get-chosen-source', methods=['POST'])
def get_chosen_source():
    """Get chosen source from homepage"""
    session['selected_source'] = request.json['selected_source']
    print("session['selected_source']", session['selected_source'])
    return redirect(('/source_stats/{}').format(session['selected_source']))

@app.route('/get-chosen-source/<chosen_source>')
def get_chosen_source_get(chosen_source):
    """Get chosen source through link on DOM"""
    print('CHOSEN SOURCE', chosen_source)
    session['selected_source'] = chosen_source
    print("session['selected_source'] changed from react headlines form", session['selected_source'])
    return redirect(('/source-stats/{}').format(session['selected_source']))

#JSON ROUTES
@app.route('/emotional-tones.json')
def get_all_emotional_tones():
    """get list of dicts of emotional tones"""
    emotional_dict = get_tones_dict_db('emotional')
    return jsonify(emotional_dict)

@app.route('/language-tones.json')
def get_all_language_tones():
    """get list of dicts of language tones"""
    language_dict = get_tones_dict_db('language')
    return jsonify(language_dict)

@app.route('/all-sources.json')
def get_all_sources():
    """get json of all sources"""
    sources_dict = get_sources_dict_db()
    return jsonify(sources_dict)

@app.route('/headlines-by-emotion.json')
def get_headlines_by_emotion():
    """Get articles with chosen tone"""
    emotional_articles_list = get_Articles_with_tone_dict(session['selected_emotion'], 'emotional')
    return jsonify(emotional_articles_list)

@app.route('/headlines-by-language.json')
def get_headlines_by_language():
    """Get articles with chosen tone"""
    language_articles_list = get_Articles_with_tone_dict(session['selected_language'], 'language')
    return jsonify(language_articles_list)

########################################################################
# SOURCE STATS JSON
@app.route('/all-source-stats.json')
def get_all_source_stats():
    """Get stats on chosen source"""
    # filter_ = request.args.get("filter")  # all, emotional, language, or None
    source_stats_list = get_chosen_source_stats(session['selected_source'])
    return jsonify(source_stats_list)

@app.route('/session-emotion.json')
def get_session_emotion():
    return jsonify(session['selected_emotion'].capitalize())

@app.route('/session-language.json')
def get_session_language():
    return jsonify(session['selected_language'].capitalize())

########################################################################
# API ROUTE

@app.route('/api-calls')
def api_calls():
    """Call news and tone api"""

    time_start = time.time()
    get_articles_add_to_db()
    time_end = time.time()
    print('Time taken to get news:', time_end - time_start)
    time_start = time.time()
    get_scores_add_to_db()
    time_end = time.time()
    print('Time taken to get tones:', time_end - time_start)

    return redirect('/')

if __name__ == "__main__":
     # As a convenience, if we run this module interactively, it will leave
    # you in a state of being able to work with the database directly.

    # app.debug = True
    # make sure templates, etc. are not cached in debug mode
    app.jinja_env.auto_reload = app.debug
    connect_to_db(app)
    # app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
    # DebugToolbarExtension(app)
    app.run(host="0.0.0.0")
