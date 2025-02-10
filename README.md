# KafkaJS Consumer Lag Test

Testing https://github.com/tulios/kafkajs/issues/1613

## Test

`consumer.js` has an artificial processing delay which causes message processing to slow down hard.

On each test, I downed the Kafka server with volumes to ensure clean state.

```console
$ docker compose down -v
$ docker compose up -d
$ node producer.js
$ node consumer.js
```

## Observations

Benching things is not my strong suit, but what I observed: 

- Using promises inside the message handler e.g. with our artifical handler causes the consumption to slow down hard
- Checking docker memory stats, it looks to me like there is a memory leak. It kept rising.