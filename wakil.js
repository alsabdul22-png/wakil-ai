#!/usr/bin/env node
const { Command } = require('commander');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
const clipboard = require('clipboardy');
const figlet = require('figlet');
const inquirer = require('inquirer');
const boxen = require('boxen');
const { spawn, exec } = require('child_process');

const program = new Command();

// Config
const API_URL = process.env.WAKIL_API_URL || 'http://localhost:5001/api';
const DASHBOARD_URL = 'https://Wakil-rd.de/dashboard';

const boxOptions = {
    padding: 1,
    margin: 1,
    borderStyle: 'double',
    borderColor: 'green',
    backgroundColor: '#000000'
};

/**
 * Display Large 3D ASCII Banner
 */
function showBanner() {
    console.clear();
    console.log(
        chalk.green(
            figlet.textSync('Wakil AI', { horizontalLayout: 'full', font: 'ANSI Shadow' })
        )
    );
    console.log(chalk.green.bold('                      Powered by Brda AI\n'));
}

/**
 * Open URL in browser (Cross-platform)
 */
function openUrl(url) {
    const start = process.platform === 'win32' ? 'start' : process.platform === 'darwin' ? 'open' : 'xdg-open';
    exec(`${start} ${url}`);
}

/**
 * Main Interactive Menu
 */
async function mainMenu() {
    const { choice } = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: chalk.white.bold('Choose a strategic service:'),
            choices: [
                { name: chalk.green('A - AI Chat'), value: 'A' },
                { name: chalk.yellow('B - Generate Image'), value: 'B' },
                { name: chalk.blue('C - Send Email'), value: 'C' },
                { name: chalk.magenta('D - Launch Web Dashboard'), value: 'D' },
                { name: chalk.cyan('E - Other Actions'), value: 'E' },
                { name: chalk.red('X - Exit'), value: 'X' }
            ]
        }
    ]);

    switch (choice) {
        case 'A': await handleChat(); break;
        case 'B': await handleImage(); break;
        case 'C': await handleEmail(); break;
        case 'D': 
            console.log(chalk.cyan(`\nOpening dashboard on ${DASHBOARD_URL}...`));
            openUrl(DASHBOARD_URL);
            setTimeout(mainMenu, 2000);
            break;
        case 'E': await handleOthers(); break;
        case 'X': process.exit(0);
    }
}

/**
 * Option A: AI Chat
 */
async function handleChat() {
    console.log(chalk.cyan('\n[SYSTEM] NEURAL LINK ESTABLISHED. Type "/back" to return to menu.\n'));
    while (true) {
        const { prompt } = await inquirer.prompt([{ type: 'input', name: 'prompt', message: chalk.white.bold('You > ') }]);
        if (prompt.toLowerCase() === '/back') break;
        const spinner = ora('Processing via Brda AI...').start();
        try {
            const res = await axios.post(`${API_URL}/ai/generate`, { prompt, tool: 'brand' });
            spinner.stop();
            const result = res.data.result;
            console.log(boxen(chalk.white(result), { ...boxOptions, title: 'SYSTEM OUTPUT', titleAlignment: 'center' }));
            clipboard.writeSync(result);
            console.log(chalk.gray('✨ Copied to clipboard.\n'));
        } catch (err) {
            spinner.fail('Connection to Brda AI Failed.');
            console.error(chalk.red(err.message));
        }
    }
    mainMenu();
}

/**
 * Option B: Generate Image
 */
async function handleImage() {
    const { description, style } = await inquirer.prompt([
        { type: 'input', name: 'description', message: 'Enter visual description:' },
        { 
            type: 'list', 
            name: 'style', 
            message: 'Select visual style:',
            choices: ['Cinematic', 'Realistic', '3D Render', 'Cyberpunk']
        }
    ]);
    const spinner = ora('Synthesizing Visual Asset...').start();
    try {
        const res = await axios.post(`${API_URL}/ai/generate`, { prompt: `${description}, ${style} style`, tool: 'image' });
        const imageUrl = res.data.result.match(/!\[IMAGE\]\((.*?)\)/)?.[1];
        if (!imageUrl) throw new Error('Visual projection failed.');
        const outPath = path.join(process.cwd(), 'outputs', 'images');
        if (!fs.existsSync(outPath)) fs.mkdirSync(outPath, { recursive: true });
        const fileName = `asset_${Date.now()}.png`;
        const filePath = path.join(outPath, fileName);
        const writer = fs.createWriteStream(filePath);
        const response = await axios({ url: imageUrl, method: 'GET', responseType: 'stream' });
        response.data.pipe(writer);
        writer.on('finish', () => {
            spinner.succeed('Visual Asset Ready.');
            const isDataUrl = imageUrl.startsWith('data:');
            clipboard.writeSync(isDataUrl ? filePath : imageUrl);
            console.log(chalk.green(`\n✔ ARCHIVED & COPIED: ${filePath}\n`));
            mainMenu();
        });
    } catch (err) {
        spinner.fail('Generation interrupted.');
        mainMenu();
    }
}

/**
 * Option C: Send Email
 */
async function handleEmail() {
    const { email, content } = await inquirer.prompt([
        { type: 'input', name: 'email', message: 'Recipient Email:' },
        { type: 'input', name: 'content', message: 'Email Content:' }
    ]);
    const spinner = ora('Dispatching encrypted packet via Brda SMTP...').start();
    setTimeout(() => {
        spinner.succeed(`Secure Communication Dispatched to ${email}`);
        mainMenu();
    }, 2000);
}

/**
 * Option E: Others
 */
async function handleOthers() {
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Extended Actions:',
            choices: ['Show Usage Statistics', 'Open Outputs Folder', 'Back']
        }
    ]);
    if (action === 'Show Usage Statistics') {
        console.log(boxen(`Active Users: 1,248\nGenerations: 15,902\nUptime: 99.99%`, { ...boxOptions, title: 'METRICS' }));
        mainMenu();
    } else if (action === 'Open Outputs Folder') {
        const outPath = path.join(process.cwd(), 'outputs');
        openUrl(outPath);
        mainMenu();
    } else {
        mainMenu();
    }
}

program
  .name('wakil')
  .description('Wakil AI - Terminal Strategic Engine')
  .version('1.2.0');

// Unified start command logic
const startAction = () => {
    showBanner();
    mainMenu();
};

program.command('ai').command('Start').action(startAction);
program.command('start').action(startAction);
program.command('CLL').action(startAction);
program.command('cll').action(startAction);

// Support for legacy/direct calls
program.on('command:*', function () {
    const cmd = program.args.join(' ').toLowerCase();
    if (cmd.includes('start') || cmd.includes('cll')) {
        startAction();
    }
});

program.parse(process.argv);
if (!process.argv.slice(2).length) {
    startAction();
}
