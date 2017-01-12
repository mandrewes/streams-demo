# streams-demo
This is a demo and template project to demonstrate basic client/server interaction using streams-comet.

Using only event based interactions all the way from client to server can really simplify and accelerate application development in applications
where there is complex event based activity happening on the server.


How do I run this (demo)?
=========================

In your IDE run the following main class and arguments
```
tech.rsqn.streamsdemo.server.ServerMain --env=LOCAL
```

or run the maven goal

```
mvn clean install
mvn exec:java
```

In your browser
```
http://localhost:8080
```




What does this do?
==================

_The Server_
- Starts embedded Jetty on _http://localhost:8080/_
 - _tech.rsqn.streamsdemo.server.ServerMain_ starts up spring/startup-ctx.xml
- Jetty via _web.xml_ initialises 
 - Services such as Comet dependencies and SampleService via _app-ctx.xml_
 - CometD 
 - Javascript and CSS Aggregation filters from https://github.com/rsqn/jjst
 
 
_The Client_ 
- index.jsp loads up aggregated Javascript from _/js/index.js_
 - which Starts up tech.rsqn.streamsdemo.StreamApp
- StreamApp 
 - Connects to comet via the _tech.rsqn.streams.Stream_ abstraction
 - Initializes EchoWidget
- EchoWidget
 - Subscribes to the stream /service/sample/echo-response
 - On subscription requests SampleService to send some data by publishing a request to _/service/sample/multi-echo_
 - Logs the responses (to console)
