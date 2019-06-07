"use strict";
import React, {Component} from "react";
import ReactDOM from 'react-dom';
import App from './homepage.jsx';
import News from "./news.jsx";
import Heading from './heading.jsx';
import DropdownMenu from './dropdownMenu.jsx';
import '../css/headlines.css';
import PopoverButton from './popover_button.jsx'
import CircleButton from './circle_button_list.jsx';
import {POPOVER_BODY} from './constants.jsx';

const content = (
    <div className="container-fluid">
        <div className="row">
            <div className="col" id="disappear-second"/>
            <div className="col" id="disappear-fourth"/>
            <div className="col" id='bubble-tone'>
                <PopoverButton
                    session='/session-language.json' 
                    tone='Anger'
                    type='emotion'
                    body={POPOVER_BODY['anger']}/>
            </div>
            <div className="col"id='bubble-tone'>
                <PopoverButton
                    session='/session-language.json' 
                    tone='Fear'
                    type='emotion'
                    body={POPOVER_BODY['fear']}/>
            </div>
            <div className="col"id='bubble-tone'>
                <PopoverButton 
                    session='/session-language.json' 
                    tone='Joy'
                    type='emotion'
                    body={POPOVER_BODY['joy']}/>
            </div>
            <div className="col"id='bubble-tone'>
                <PopoverButton 
                    session='/session-language.json' 
                    tone='Sadness'
                    type='emotion'
                    body={POPOVER_BODY['sadness']}/>
            </div>
            <div className="col"id='bubble-tone'>
                <PopoverButton 
                    session='/session-language.json' 
                    tone='Analytical'
                    type='language'
                    body={POPOVER_BODY['analytical']}/>
            </div>
            <div className="col"id='bubble-tone'>
                <PopoverButton 
                    session='/session-language.json' 
                    tone='Confident'
                    type='language'
                    body={POPOVER_BODY['confident']}/>
            </div>
            <div className="col"id='bubble-tone'>
                <PopoverButton 
                    session='/session-language.json' 
                    tone='Tentative'
                    type='language'
                    body={POPOVER_BODY['tentative']}/>
            </div>
            <div className="col" id="disappear-fifth"/>
            <div className="col" id="disappear-third"/>
            <div className="col" id="disappear-first"/>
        </div>
        <div className="row">
            <div className="col">
                <div className='heading'>
                    <Heading heading='/session-language.json'
                            size='h2'
                            filter='language'/>
                </div>
            </div>
            <div className="col">
                <div className="row">
                    <div className="col">
                        <DropdownMenu fetch_url='/get-category-dropdown-list.json'
                                post_url='/get-chosen-category-from-dropdown'
                                filter_by='Filter by Category'/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Heading heading='/session-tone-category.json'
                            size='h5'
                            filter='category-filter'/>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <div id="language-headlines">
                    <News fetch_url='/headlines-by-language.json'/>
                </div>
            </div>
        </div>
    </div>
);

ReactDOM.render(
  
    <div id="homepage">
        <App content={content}/>
    </div>,
  document.getElementById('root')
);