ns("tech.rsqn.streamsdemo");


tech.rsqn.streamsdemo.EchoWidget = function () {
};

tech.rsqn.streamsdemo.EchoWidget.prototype.init = function (stream, parentElement) {
    var self = this;
    self.stream = stream;
    self.parentElement = parentElement;
    self.myElement = $("<div></div>");

    var echoListener = function (msg) {
        console.log("Echo Received " + JSON.stringify(msg));
    };

    var onSubscribeListener = function (subscriptionData) {
        self.echoSubscription = subscriptionData;
        console.log("self.echoSubscription = " + JSON.stringify(self.echoSubscription));

        self.stream.publish("/service/sample/multi-echo", {
                returnChannel: "/service/sample/echo-response",
                count: 100,
                rateMs: 1000
            }
        );
    };

    self.echoSubscription = self.stream.subscribe("/service/sample/echo-response", echoListener, onSubscribeListener);

};
