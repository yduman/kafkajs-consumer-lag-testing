const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-producer",
  brokers: ["localhost:9092"]
});

const producer = kafka.producer();

async function produce() {
  await producer.connect();
  console.log("Producer connected.");

  let counter = 0;
  while (true) {
    const messages = [];
    for (let j = 0; j < 100; j++) {
      messages.push({
        key: `key-${counter}`,
        value: JSON.stringify({ counter })
      });
      counter++;
    }
    try {
      await producer.send({
        topic: "test-topic",
        messages
      });
      console.log(`Sent batch of 100 messages. Total sent: ${counter}`);
    } catch (err) {
      console.error("Error sending messages", err);
    }
  }
}

produce().catch(e => console.error(`[producer] ${e.message}`, e));
