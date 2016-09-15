
#include vendor/_index.js
#include tools/_index.js
#include stream/_index.js
#include StreamApp.js

$(document).ready(function() {
    var app = new com.rsqn.streamsdemo.StreamApp();

    app.init($(".mainApp"))
});
console.log("/index.js ran");