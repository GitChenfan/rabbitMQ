/**
 * 对RabbitMQ的封装
 */
import { connect } from 'amqplib'
const queueName = 'testqueue';
const queueName1 = 'testqueue1';
async function start() {
    let conn = await connect('amqp://guest:guest@localhost');
    let channel = await conn.createChannel();
    let ok = await channel.assertQueue(queueName, { durable: true });
    ok = await channel.assertQueue(queueName1, { durable: true });
    if (ok) {
        channel.consume(queueName, function (msg) {
            if (msg !== null) {
                let data = msg.content.toString();
                console.log(data);
                console.log("_____________________________");
                // channel.ack(msg);
                // let datas = await channel.sendToQueue(queueName, new Buffer(data), {
                //     persistent: true
                // });
            }
        }, { noAck: true })
        channel.consume(queueName1, function (msg) {
            if (msg !== null) {
                let data = msg.content.toString();
                console.log(data);
                console.log("_____________________________");
                // channel.ack(msg);
                // let datas = await channel.sendToQueue(queueName, new Buffer(data), {
                //     persistent: true
                // });
            }
        }, { noAck: true })
    }
}

start();