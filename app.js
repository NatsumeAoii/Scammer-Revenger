const fs = require('fs').promises;
const axios = require('axios');

const CUSTOM_TEXT = 'Bismillah Mati'; // Custom text
const URLS_FILE = 'urls.txt';
const REQUEST_DELAY_MS = 100; // Adjust delay as needed (0 = means faster)

class MessageSender {
  constructor() {
    this.totalMessagesSent = 0;
  }

  async sendRequest(url, index) {
    try {
      const response = await axios.get(`${url}${encodeURIComponent(CUSTOM_TEXT)}`);
      if (response.status === 200) {
        return `Link ${index + 1}: OK`;
      } else {
        return `Link ${index + 1}: Unexpected status code: ${response.status}`;
      }
    } catch (error) {
      return `Link ${index + 1}: API down!: ${error.message}`;
    }
  }

  async sendMessages(urls) {
    console.log(`Sending: "${CUSTOM_TEXT}"`);
    const requests = urls.map((url, index) => this.sendRequest(url, index));
    const results = await Promise.allSettled(requests);

    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        console.log(result.value);
      } else {
        console.error(`Error: ${result.reason}`);
      }
    });

    this.totalMessagesSent++;
    console.log(`Total messages sent: ${this.totalMessagesSent}`);
    console.log('='.repeat(30));
  }

  async readUrlsFromFile() {
    try {
      const data = await fs.readFile(URLS_FILE, 'utf8');
      return data.trim().split('\n');
    } catch (error) {
      throw new Error(`Failed to read URLs from file: ${error.message}`);
    }
  }

  async start() {
    try {
      const urls = await this.readUrlsFromFile();
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      
      while (true) {
        await this.sendMessages(urls);
        await delay(REQUEST_DELAY_MS);
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }
}

(async () => {
  const sender = new MessageSender();
  await sender.start();
})();
