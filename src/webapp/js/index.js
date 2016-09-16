

#include /js/jjs/index.js


#include vendor/_index.js
#include tools/_index.js
#include stream/_index.js
#include StreamApp.js


var _streamConfig = {
    url : location.protocol + "//" + location.host + "/cometd"
};

// var _streamConfig = {
//     url : "http://kong:8000/cometd"
// };

$(document).ready(function() {
    var app = new com.rsqn.streamsdemo.StreamApp();
    app.init($(".mainApp"))
});
console.log("/index.js ran");