<h1 align="center">
   Scammer Revenger
</h1>

<p align="center">
  <img src="https://img.shields.io/github/forks/NatsumeAoii/Scammer-Revenger?style=flat-square">
  <img src="https://img.shields.io/github/license/NatsumeAoii/Scammer-Revenger?style=flat-square">
  <img src="https://img.shields.io/github/last-commit/NatsumeAoii/Scammer-Revenger?style=flat-square">
  <img src="https://img.shields.io/github/stars/NatsumeAoii/Scammer-Revenger?style=flat-square">
</p>

Scammer Revenger is a Node.js application designed to automate the process of sending messages to a list of URLs, typically used for disrupting scam operations or overwhelming scam communication channels. NOW BEGINNER's FRIENDLY!

## Installation

Before you begin the installation process for Scammer Revenger, ensure that you have Node.js and npm (Node Package Manager) installed on your system. These are essential for running the application and managing its dependencies.

### Prerequisites

- **Node.js**: Scammer Revenger is a Node.js application, so you must have Node.js installed. You can download and install Node.js from the official [Node.js](https://nodejs.org/) Website.
- **npm**: npm is distributed with Node.js, which means that when you download Node.js, you automatically get npm installed on your computer. npm is used to install the dependencies that Scammer Revenger requires.

<details>
  <summary><b>Step-by-Step Installation</b></summary>
  
  1. **Clone the Repository**: Use `git` to clone the Scammer Revenger repository to your local machine. If you don't have `git` installed, you can download it from [the Git website](https://git-scm.com/).
  
      Open your terminal (Command Prompt, PowerShell, Terminal, etc.) and run the following command:
  
      ```bash
      git clone https://github.com/NatsumeAoii/Scammer-Revenger.git
      ```
  
      This command creates a copy of the Scammer Revenger repository in a new folder called `Scammer-Revenger` on your computer.
  
  2. **Navigate to the Project Directory**: Change your current working directory to the `Scammer-Revenger` folder that was just created by the `git clone` command.
  
      ```bash
      cd Scammer-Revenger
      ```
  
  3. **Install Dependencies**: Run the `npm install` command to install all the necessary dependencies that are listed in the `package.json` file. These dependencies are required for Scammer Revenger to function properly.
  
      ```bash
      npm install
      ```
  
      This command reads the `package.json` file and installs all the dependencies specified there. It may take a few moments to complete.

</details>

After completing those steps, you will have Scammer Revenger and all its dependencies installed on your system. You are now ready to configure and run the application as per the usage instructions provided in the README.

## Usage

1. Populate the `urls.txt` file with the target URLs.
2. Customize the `customText` variable in the script with your message.
3. Run the script:

```bash
node app.js
```

The script will continuously send the custom message to the list of URLs and provide feedback on the status of each message sent.

## Changelog

<details>
  <summary><b>2024-12-05</b></summary>
  
  #### Added
  - Automatic installation of missing modules (like `axios`).
  - Graceful shutdown handling for `CTRL+C` and `CTRL+Z`.
  
  #### Changed
  - Improved signal handling for better cross-platform compatibility.
</details>

<details>
  <summary><b>2024-10-03</b></summary>
  
  #### Added
  - Support for reading multiple URLs from a file.
  - Customizable message text.
  - Error handling and status reporting for each message sent.
  - Continuous operation with the ability to run indefinitely.
  
  #### Changed
  - Refactored code to use modern JavaScript async/await syntax.
  - Replaced single hardcoded URL with a dynamic list of URLs.
  - Improved error handling to provide more detailed feedback.
  
  #### Removed
  - Redundant calls to `sendMessage()` function.
</details>

<details>
  <summary><b>2023-12-01</b></summary>
  - Initial release with basic functionality to send a message to a single hardcoded URL using Telegram's API.
</details>

## License

Scammer Revenger is released under the MIT License. See the [LICENSE](https://github.com/NatsumeAoii/Scammer-Revenger?tab=MIT-1-ov-file#) file for more details.

## Disclaimer

This tool is intended for educational and ethical purposes only. Users should ensure their actions comply with local laws and regulations regarding digital communications and cybersecurity.

Original Repository: [Scammer-Revenge](https://github.com/malvinval/scammer-revenge)
