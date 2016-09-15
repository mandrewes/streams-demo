ns("com.rsqn.streams");

com.rsqn.streams.Stream = function () {
    this.cometd = $.cometd;
    this._connected = false;
    this.sessionToken = "none";
    this.connectionEstablishedListeners = {};
    this.connectionBrokenListeners = {};
    this._connectionEstablishedFlag = false;
};

com.rsqn.streams.Stream.prototype.logger = function (s) {
    console.log(s)
};

com.rsqn.streams.Stream.prototype.isConnected = function () {
    return this._connectionEstablishedFlag;
};

com.rsqn.streams.Stream.prototype.removeConnectionBrokenListener = function (handle) {
    delete this.connectionBrokenListeners[handle.listenerId];
};

com.rsqn.streams.Stream.prototype.removeConnectionEstablishedListener = function (handle) {
    delete this.connectionEstablishedListeners[handle.listenerId];
};

com.rsqn.streams.Stream.prototype.connectionClosed = function () {
    this._connectionEstablishedFlag = false;
};

com.rsqn.streams.Stream.prototype._ready = function (handshake) {
    this.ready(handshake);
};

com.rsqn.streams.Stream.prototype.batch = function (fn) {
    this.cometd.batch(fn);
};


com.rsqn.streams.Stream.prototype.subscribe = function (channel, cb, subCb) {
    console.log("subscribe on (" + channel + ")");
    // channel, scope, callback, subscribeProps, subscribeCallback
    this.cometd.subscribe(channel, null, function (message) {
            try {
                cb(message);
            } catch (err) {
                console.log(err);
            }
        }
        , null
        , function (dat) {
            console.log("subscribe callback for (" + channel + ") fired with " + JSON.stringify(dat));
            subCb(dat);
        });
};


com.rsqn.streams.Stream.prototype.unsubscribe = function (subscription) {
    var self = this;
    if (subscription) {
        console.log("Unsubscribe on (" + subscription + ")");
        self.cometd.unsubscribe(subscription);
    }
};

com.rsqn.streams.Stream.prototype.publish = function (channel, obj) {
    var self = this;
    this.cometd.publish(channel, obj, {
        ext: {
            session: self.sessionToken
        }
    });
};

com.rsqn.streams.Stream.prototype.init = function (url, credentials) {
    var self = this;
    var cometURL = url;
    self.logger("Connecting to " + cometURL);

    self.cometd.configure({
        url: cometURL,
        logLevel: 'info',
        backoffIncrement: 100,
        maxBackoff: 5000,
        stickyReconnect: "false"
    });

    this.cometd.addListener('/meta/handshake', createDelegate(this, this._metaHandshake));
    this.cometd.addListener('/meta/connect', createDelegate(this, this._metaConnect));

    this.cometd.handshake({
        ext: {
            credentials: credentials
        }
    });
};

com.rsqn.streams.Stream.prototype._connectionBroken = function () {
    this.logger('Connection Broken');
    this.tmpConnectionIsEstablished = false;
    for (var key in this.connectionBrokenListeners) {
        var fn = this.connectionBrokenListeners[key];
        if (fn && fn != null) {
            fn();
        }
    }
};

com.rsqn.streams.Stream.prototype._connectionClosed = function () {
    this.logger('Connection Closed');
    this.connectionClosed();
};

com.rsqn.streams.Stream.prototype._metaConnect = function (message) {
    var self = this;
    if (this.cometd.isDisconnected()) {
        this._connected = false;
        this._connectionClosed();
        return;
    }

    var wasConnected = this._connected;
    this._connected = message.successful === true;

    if (!wasConnected && this._connected) {
        this._connectionEstablished();
    }

    else if (wasConnected && !this._connected) {
        this._connectionBroken();
    }
};

com.rsqn.streams.Stream.prototype._metaHandshake = function (handshake) {
    if (handshake.successful === true) {
        if (handshake["session"]) {
            this.sessionId = handshake["sessionId"];
        }
        this.logger("Meta handshake success");

        this._ready(handshake);
    } else {
        this.logger("Meta handshake failed");
    }
};


com.rsqn.streams.Stream.prototype.addConnectionEstablisedListener = function (f) {
    var ret = {
        listenerId: randomString(32),
        fn: f
    };
    this.connectionEstablishedListeners[ret.listenerId] = f;
    if (this.isConnected()) {
        f();
    }
};

com.rsqn.streams.Stream.prototype.addConnectionBrokenListener = function (f) {
    var ret = {
        listenerId: randomString(24),
        fn: f
    };
    this.connectionBrokenListeners[ret.listenerId] = f;
    return ret;
};


com.rsqn.streams.Stream.prototype._connectionEstablished = function () {
    this.logger('Connection Established');
    this._connectionEstablishedFlag = true;
    for (var key in this.connectionEstablishedListeners) {
        var fn = this.connectionEstablishedListeners[key];
        if (fn && fn != null) {
            fn();
        }
    }
};

