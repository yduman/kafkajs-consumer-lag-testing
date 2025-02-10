# KafkaJS Consumer Lag Test

Testing https://github.com/tulios/kafkajs/issues/1613

## Test

`consumer.js` has an artificial processing delay of 1ms which causes message processing to slow down hard.

```console
$ docker-compose up -d
$ node producer.js
$ node consumer.js
```