package com.rsqn.streamsdemo.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.support.GenericXmlApplicationContext;

import java.util.Arrays;

/**
 * Created by mandrewes on 25/06/14.
 */
public class ServerMain {
    static final Logger log = LoggerFactory.getLogger(ServerMain.class);

    public static void main(String[] args) {
        try {
            ServerMain m = new ServerMain();
            m.launch(args);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public String[] getApplicationContextLocations() {
        return new String[]{"spring/startup-ctx.xml"};
    }

    public void launch(String[] args) {
        log.info("Launching ApplicationContext " + Arrays.toString(getApplicationContextLocations()));

        try {
            GenericXmlApplicationContext ctx = new GenericXmlApplicationContext(getApplicationContextLocations());
            log.info("Launching ApplicationContext " + Arrays.toString(getApplicationContextLocations()));
            ctx.getBean("jetty");
//            ctx.registerShutdownHook();
            log.info("Graceful exit");
        } finally {
            log.info("Exiting");
        }

    }
}
