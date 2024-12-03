const fs = require('fs').promises;
const { exec } = require('child_process');

// Configuration variables
const CONFIG = {
    customText: 'Bismillah Mati',
    urlsFile: 'urls.txt',
    requestDelayMs: 100,
    maxRetries: 3,
    retryDelayMs: 500,
};

class MessageSender {
    constructor() {
        this.totalMessagesSent = 0;
    }

    async sendRequest(url, index) {
        const encodedText = encodeURIComponent(CONFIG.customText);
        const fullUrl = `${url}${encodedText}`;

        for (let attempt = 1; attempt <= CONFIG.maxRetries; attempt++) {
            try {
                const response = await require('axios').get(fullUrl);
                if (response.status === 200) {
                    return `Link ${index + 1}: OK`;
                } else {
                    return `Link ${index + 1}: Unexpected status code: ${response.status}`;
                }
            } catch (error) {
                if (attempt === CONFIG.maxRetries) {
                    return `Link ${index + 1}: API down!: ${error.message}`;
                } else {
                    console.warn(`Link ${index + 1}: Retry ${attempt}/${CONFIG.maxRetries} after error: ${error.message}`);
                    await this.delay(CONFIG.retryDelayMs);
                }
            }
        }
    }

    async sendMessages(urls) {
        console.log(`Sending: "${CONFIG.customText}"`);
        const requests = urls.map((url, index) => this.sendRequest(url, index));
        const results = await Promise.allSettled(requests);

        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                console.log(result.value);
            } else {
                console.error(`Error with Link ${index + 1}: ${result.reason}`);
            }
        });

        this.totalMessagesSent++;
        console.log(`Total messages sent: ${this.totalMessagesSent}`);
        console.log('='.repeat(30));
    }

    async readUrlsFromFile() {
        try {
            const data = await fs.readFile(CONFIG.urlsFile, 'utf8');
            return data.trim().split('\n').filter(Boolean);
        } catch (error) {
            throw new Error(`Failed to read URLs from file: ${error.message}`);
        }
    }

    async delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async start() {
        try {
            const urls = await this.readUrlsFromFile();
            while (true) {
                await this.sendMessages(urls);
                await this.delay(CONFIG.requestDelayMs);
            }
        } catch (error) {
            console.error(`Error: ${error.message}`);
        }
    }
}

(async () => {
    function startApplication() {
        const sender = new MessageSender();
        sender.start();

        // Handle graceful shutdown on CTRL+C or CTRL+Z
        process.once('SIGINT', () => {
            console.log('Gracefully shutting down...');
            process.exit();
        });

        process.once('SIGTSTP', () => {
            console.log('Gracefully shutting down...');
            process.exit();
        });
    }

    try {
        // Check if axios is installed, if not install it
        require.resolve('axios');
        startApplication();
    } catch (e) {
        console.log('Axios is not installed. Installing...');
        exec('npm install axios', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error installing axios: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`Error installing axios: ${stderr}`);
                return;
            }
            console.log(`Axios installed: ${stdout}`);
            startApplication();
        });
    }
})();
