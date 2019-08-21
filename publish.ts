/**
 * 对RabbitMQ的封装
 */
import { connect } from 'amqplib'
const queueName = 'testqueue';
const queueName1 = 'testqueue1';
const msg = 'hello world';
let n = 0;
async function start() {
    let con = await connect('amqp://guest:guest@localhost');
    let channel = await con.createChannel();
    let ok = await channel.assertQueue(queueName);
    if (ok) {
        setInterval(async () => {
            n++;
            let data1 = await channel.sendToQueue(queueName, new Buffer(`n=${n} : ${msg}`), {
                persistent: true
            });
            let data2 = await channel.sendToQueue(queueName1, new Buffer(`n1=${n} : ${msg}`), {
                persistent: true
            });
            console.log(n)
            console.log(data2)
        }, 1000)
        // channel.close();

    }
}


start()