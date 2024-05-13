const fs = require('fs').promises;
const axios = require('axios');

const customText = 'Bismillah Mati'; // Custom text

class MessageSender {
  constructor() {
    this.totalMessagesSent = 0;
  }

  async sendMessages(urls) {
    try {
      console.log(`Sending: "${customText}"`);
      const requests = urls.map(async (url, index) => {
        try {
          const response = await axios.get(`${url}${encodeURIComponent(customText)}`);
          if (response.status === 200) {
            return `Link ${index + 1}: OK`;
          } else {
            return `Link ${index + 1}: Unexpected status code: ${response.status}`;
          }
        } catch (error) {
          return `Link ${index + 1}: API down!: ${error.message}`;
        }
      });
      const results = await Promise.allSettled(requests);
      results.forEach((result) => {
        console.log(result.value);
      });
      this.totalMessagesSent++;
      console.log(`Total messages sent: ${this.totalMessagesSent}`);
      console.log('='.repeat(30));
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  async start() {
    try {
      const urls = (await fs.readFile('urls.txt', 'utf8')).trim().split('\n');
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      while (true) {
        await this.sendMessages(urls);
        await delay(100); // Adjust delay as needed (0 = means faster)
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
}

async function main() {
  const sender = new MessageSender();
  await sender.start();
}

main();
