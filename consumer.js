const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-consumer',
  brokers: ["localhost:9092"]
});

const consumer = kafka.consumer({ groupId: 'test-group' });

async function consume() {
  await consumer.connect();
  console.log("Consumer connected.");
  
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });
  
  let processed = 0;
  
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      // simulate processing delay
      // this causes way slower message processing
      // try uncommenting this line => consumer catches up and is on par with producer
      // introducing even a 1ms delay => consumer slows down hard
      await new Promise(resolve => setTimeout(resolve, 1));
      
      processed++;
      if (processed % 1000 === 0) {
        console.log(`Processed ${processed} messages.`);
      }
    }
  });
}

consume().catch(e => console.error(`[consumer] ${e.message}`, e));
