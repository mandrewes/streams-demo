package com.rsqn.streamsdemo.services;


import com.rsqn.streams.server.comet.services.AbstractService;
import com.rsqn.streamsdemo.model.EchoRequest;
import com.rsqn.streamsdemo.model.EchoResponse;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.cometd.annotation.Listener;
import org.cometd.annotation.Service;
import org.cometd.bayeux.server.BayeuxServer;
import org.cometd.bayeux.server.ServerMessage;
import org.cometd.bayeux.server.ServerSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.inject.Named;
import javax.inject.Singleton;

@Named
@Singleton
@Service("sampleService")
public class SampleService extends AbstractService {
    private static final Logger log = LoggerFactory.getLogger(SampleService.class);

    @Inject
    private BayeuxServer bayeux;

//    @Session
//    private ServerSession serverSession;

    @PostConstruct
    public void init() {

    }

    private void sendEnoughEchos(EchoRequest echoReq, ServerSession ssn) {
        // would be nice to decouple the ssn;

        Thread t = new Thread() {
            @Override
            public void run() {
                try {
                    for (int i = 0; i < echoReq.getCount(); i++) {
                        EchoResponse resp = new EchoResponse();
                        resp.setCode(echoReq.getReturnChannel());
                        resp.setMax(echoReq.getCount());
                        resp.setSeq(i);

                        System.out.println("SEND " + ToStringBuilder.reflectionToString(resp));
//                        Map<String, Object> output = new HashMap<>();
//                        output.put("data", resp);
                        ssn.deliver(ssn, echoReq.getReturnChannel(), resp);
                        Thread.sleep(echoReq.getRateMs());
                    }
                } catch (Exception ex) {
                    log.warn(ex.getMessage(), ex);
                }
            }
        };

        t.start();
    }

    @Listener("/service/sample/multi-echo")
    public void processRequest(ServerSession remote, ServerMessage message) {
        EchoRequest req = parseObj(EchoRequest.class, message);

        sendEnoughEchos(req, remote);
    }

}
