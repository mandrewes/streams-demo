# streams-demo
This is a demo and template project to demonstrate basic client/server interaction using streams-comet.

Using only event based interactions all the way from client to server can really simplify and accelerate application development in applications
where there is complex event based activity happening on the server.

What does this do?
==================

- Fires up a Embedded Jetty using 
 - tech.rsqn.streamsdemo.server.ServerMain : spring/startup-ctx.xml
 - web.xml 
 
- Brings up 



Why would I want this?
======================

Compiling and then caching aggregated content at runtime means you can

- Have exactly the same process run during development as you have in TEST and PROD
- Can inject information (such as variables and constants) at runtime in each environment
- Can dynamically enable or disable features using a pragma style profiles
- Using bare bones simple #includes you can aggregate all your dependencies javascript or css together
 - Which is easy for anyone to understand
 - Easily controls dependency and execution order
- Don't need any special "file system watcher" in your build system
 - Everything works the same way in every environment
- Can cache the result for performance in PROD environments

Is there a working sample project that uses this?
==============
on the way

How do I use this?
==================

### Add this dependency
```
 <dependency>
            <groupId>com.rsqn.utils</groupId>
            <artifactId>jjst</artifactId>
            <version>1.0.3</version>
 </dependency>
```

### Add these servlets to your web xml.
````
 <servlet>
        <servlet-name>jsAggregation</servlet-name>
        <servlet-class>tech.rsqn.utils.jjst.servlets.JavascriptAggregationServlet</servlet-class>
        <async-supported>false</async-supported>
        <init-param>
            <param-name>baseProfiles</param-name>
            <param-value>nocache,nocompile</param-value>
        </init-param>
    </servlet>
    <servlet-mapping>
        <servlet-name>jsAggregation</servlet-name>
        <url-pattern>/js/*</url-pattern>
    </servlet-mapping>

    <servlet>
        <servlet-name>cssAggregation</servlet-name>
        <servlet-class>tech.rsqn.utils.jjst.servlets.CssAggregationServlet</servlet-class>
        <async-supported>false</async-supported>
        <init-param>
            <param-name>baseProfiles</param-name>
            <param-value>nocache,nocompile</param-value>
        </init-param>
    </servlet>
    <servlet-mapping>
        <servlet-name>cssAggregation</servlet-name>
        <url-pattern>/css/*</url-pattern>
    </servlet-mapping>
```

### Create a javascript file under /js/ in the root of your webapp
```
    console.log('hello');
```

### Add your script tag relative to the root of your webapp
```
    <script src="/js/index.js?profiles=this_is_an_example"></script>
```


How do I?
==============

#### Aggregate multiple javascript files ?
```
index.js ->

#include libs/mylib.js
#include apps/myapp.js
```

#### Use profiles ?
```
    <script src="/js/index.js?profiles=say_hello"></script>   
```
```
    console.log('one');
    #ifprofile sayhello
      console.log('hello');  // its better to actually do an #include here
    #endif
    console.log('two');
```

#### Prevent Caching and or Compilation ?
```
    <script src="/js/index.js?profiles=nocache,nocompile"></script>   
```

#### Include environment variables in the output ?
```
    var myConstant ='${SOME_ENV_VAR}';
    console.log('myVar is ' + myConstant );
```


Whats in here?
==============

N/A
