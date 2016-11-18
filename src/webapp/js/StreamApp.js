ns("tech.rsqn.streamsdemo");

#include EchoWidget.js


tech.rsqn.streamsdemo.StreamApp = function () {
    this.myElement = this.parentContainer;
    this.stream = new tech.rsqn.streams.Stream();

    // this.stream.logger = function (s) {
    //     $("#log").append("<span class=\"log-entry\">" + (ctr++) + ":<span class=\"log-text\">" + s + "</span></span><br/>");
    // };

    this.credentials = "";
};

tech.rsqn.streamsdemo.StreamApp.prototype.init = function (parentElement) {
    var self = this;
    self.parentElement = parentElement;
    self.myElement = self.parentElement;

    self.stream.addConnectionEstablisedListener(function () {
        try {
            self.hasInitialized = true;
            console.log("StreamApp Connection Established");
        } catch (err) {
            console.log(err);
        }
    });

    self.stream.init(_streamConfig.url,self.credentials);

    var div = self.myElement.find(".echo-container");
    new tech.rsqn.streamsdemo.EchoWidget().init(self.stream,div);
};


