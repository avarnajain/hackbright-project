"use strict";

ReactDOM.render(

    //What you want to render + a comma
    <div id="language-headlines">
        <h1> NEWS BY CHOSEN WRITING STYLE </h1>
        <News fetch_url='/headlines-by-language.json'/>
    </div>,
    //where you want to render it + a comma
    document.getElementById("root"),
);