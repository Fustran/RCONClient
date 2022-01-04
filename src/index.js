require('dotenv').config();
const Rcon = require('rcon');

const main = async () => {
    let hasEnvEntries = true;
    let commandLineMode = false;

    if (!process.env.RCON_HOST) { console.error('no RCON_HOST in .env file.'); hasEnvEntries = false; }
    if (!process.env.RCON_PASSWORD) { console.error('no RCON_PASSWORD in .env file.'); hasEnvEntries = false; }
    if (!process.env.RCON_PORT) { console.error('no RCON_PORT in .env file.'); hasEnvEntries = false; }

    if (!hasEnvEntries) { return; }

    const conn = new Rcon(
        process.env.RCON_HOST,
        process.env.RCON_PORT,
        process.env.RCON_PASSWORD
    );

    conn.on('err', err => {
        console.error(err);
    });

    conn.on('response', response => {
        console.log(response);
        if (commandLineMode) { 
            getCommandAndSend(); 
        } else {
            process.exit(0);
        }
    });

    conn.on('auth', () => {
        console.log('Authenticated!');

        const args = process.argv.slice(2);
        //if run with arguments, execute the command. if there's no arugments, run a continuous command line
        if (args.length > 0) {
            const command = args.join(' ');
            conn.send(command);
        } else {
            commandLineMode = true;
            getCommandAndSend();
        }
    });

    console.log('connecting...');
    conn.connect();

    const getCommandAndSend = async () => {
        const command = await getUserCommand();
        conn.send(command);
    }
}

const getUserCommand = () => {
    return new Promise(resolve => {
        const rl = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.on('SIGINT', () => process.exit(0));

        rl.question(`[${process.env.RCON_HOST}]$ `, command => {
            rl.close();
            resolve(command);
        });
    });
}

main();