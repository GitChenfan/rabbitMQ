import { connect, Channel } from 'amqplib'


export class Rabbitmq {

    constructor(user, pass, host) {
        this.user = user;
        this.pass = pass;
        this.host = host;
    }

    private async getUrl(): Promise<string> {
        return `amqp://${this.user}:${this.pass}@${this.host}`
    }

    public static async connect(url, queueName): Promise<Channel> {
        let con = await connect(url);
        let channel = await con.createChannel();
        let ok = await channel.assertQueue(queueName);
        if (!ok) return null;
        return channel;
    }

    public static async sendToQueue(channel, queueName, data): Promise<boolean> {
        return await channel.sendToQueue(queueName, new Buffer(data), { persistent: true });
    }

    public static async consume(channel, queueName, callback) {
        channel.consume(queueName, function (msg) {
            if (msg !== null) {
                let data = msg.content.toString();
                callback(data);
                channel.ack(msg);
            }
        })
    }


    private user: string;
    private pass: string;
    private host: string;
}