// ==UserScript==
// @name        Hide Show
// @include     http://myshows.me/profile/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.js
// @require     http://yastatic.net/underscore/1.6.0/underscore-min.js
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

_.each($('.showHeader'), function(x) {
    // Make our virtul toggle link visable
    $(x).hover(
        function() {
            $(this).css('border-bottom-color', 'black').css('cursor', 'pointer');
        }
      , function() {
            $(this).css('border-bottom-color', '#ccc').css('cursor', 'auto');
        }
    );
    var attr = $(x).attr('id').slice(1);
    var is_visable = GM_getValue(attr, true); // was that show visable last visit?

    var selector = 'div[id^="m-' + attr + '-"]';
    var seasons = $(selector);

    // restore show visibility
    _.each($.merge($('p.show' + attr), seasons), function(i) {
        $(i).css('display', is_visable ? 'block' : 'none');
    });

    // set onClick handler, that will toggle visibility and store status to GM storage
    $(x).click(function() {
        _.each($.merge($('p.show' + attr), seasons), function(i) {
            $(i).toggle();
        });
        var is_visable = $(seasons[0]).css('display') == 'block';
        GM_setValue(attr, is_visable);
    });
});
