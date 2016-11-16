package tech.rsqn.streamsdemo.model;

public class EchoRequest {
    private String returnChannel;
    private int count;
    private long rateMs;

    public String getReturnChannel() {
        return returnChannel;
    }

    public void setReturnChannel(String returnChannel) {
        this.returnChannel = returnChannel;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public long getRateMs() {
        return rateMs;
    }

    public void setRateMs(long rateMs) {
        this.rateMs = rateMs;
    }
}
