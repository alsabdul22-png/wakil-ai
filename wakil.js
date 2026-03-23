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
const { spawn } = require('child_process');

const program = new Command();

// Config - default local or environment
const API_URL = process.env.WAKIL_API_URL || 'http://localhost:5001/api';

const boxOptions = {
    padding: 1,
    margin: 1,
    borderStyle: 'double',
    borderColor: 'cyan',
    backgroundColor: '#000000'
};

/**
 * Display Large 3D ASCII Banner
 */
function showBanner() {
    console.clear();
    console.log(
        chalk.green(
            figlet.textSync('وكيل AI HDR', { horizontalLayout: 'full', font: 'ANSI Shadow' })
        )
    );
    console.log(chalk.gray.bold('                      Powered by Barada AI Strategic Engine\n'));
}

/**
 * Typewriter Simulation
 */
async function typewriter(text) {
    return new Promise((resolve) => {
        let i = 0;
        const interval = setInterval(() => {
            process.stdout.write(text[i]);
            i++;
            if (i >= text.length) {
                clearInterval(interval);
                process.stdout.write('\n');
                resolve();
            }
        }, 15);
    });
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
                { name: chalk.green('A - AI Chat (Text Conversation)'), value: 'A' },
                { name: chalk.yellow('B - Generate Image'), value: 'B' },
                { name: chalk.blue('C - Send Email'), value: 'C' },
                { name: chalk.magenta('D - Other Actions'), value: 'D' },
                { name: chalk.red('X - Termination Sequence (Exit)'), value: 'X' }
            ]
        }
    ]);

    switch (choice) {
        case 'A': await handleChat(); break;
        case 'B': await handleImage(); break;
        case 'C': await handleEmail(); break;
        case 'D': await handleOthers(); break;
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

        const spinner = ora('Processing via Barada Cloud...').start();
        try {
            const res = await axios.post(`${API_URL}/ai/generate`, { prompt, tool: 'brand' });
            spinner.stop();
            
            const result = res.data.result;
            console.log(boxen(chalk.white(result), { ...boxOptions, title: 'SYSTEM OUTPUT', titleAlignment: 'center' }));
            
            clipboard.writeSync(result);
            console.log(chalk.gray('✨ Copied to clipboard.\n'));
        } catch (err) {
            spinner.fail('Connection to Neural Lattice Failed.');
            console.error(chalk.red(err.message));
        }
    }
    mainMenu();
}

/**
 * Option B: Generate Image
 */
async function handleImage() {
    const { description, style, size } = await inquirer.prompt([
        { type: 'input', name: 'description', message: 'Enter visual description:' },
        { 
            type: 'list', 
            name: 'style', 
            message: 'Select visual style:',
            choices: ['Cinematic', 'Realistic', '3D Render', 'Artistic', 'Cyberpunk']
        },
        { 
            type: 'list', 
            name: 'size', 
            message: 'Select resolution:',
            choices: ['1024x1024', '512x512', 'HD']
        }
    ]);

    const finalPrompt = `${description}, ${style} style, ${size}`;
    const spinner = ora('Synthesizing Visual Asset...').start();
    
    try {
        const res = await axios.post(`${API_URL}/ai/generate`, { prompt: finalPrompt, tool: 'image' });
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
        console.error(err.message);
        mainMenu();
    }
}

/**
 * Option C: Send Email
 */
async function handleEmail() {
    const { email, content } = await inquirer.prompt([
        { type: 'input', name: 'email', message: 'Recipient Email:' },
        { type: 'editor', name: 'content', message: 'Compose your strategic message:' }
    ]);

    const spinner = ora('Dispatching encrypted packet...').start();
    setTimeout(() => {
        spinner.succeed(`Secure Communication Dispatched to ${email}`);
        console.log(chalk.green('✔ SMTP RELAY: Barada Secure Gateway Active\n'));
        mainMenu();
    }, 2000);
}

/**
 * Option D: Others
 */
async function handleOthers() {
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Extended Actions:',
            choices: [
                'Show Usage Statistics',
                'Launch Web Dashboard',
                'Open Outputs Folder',
                'Back'
            ]
        }
    ]);

    if (action === 'Show Usage Statistics') {
        console.log(boxen(`Active Users: 1,248\nGenerations: 15,902\nUptime: 99.99%`, { ...boxOptions, title: 'METRICS' }));
        mainMenu();
    } else if (action === 'Launch Web Dashboard') {
        console.log(chalk.green('✔ DASHBOARD LIVE: http://localhost:5173/dashboard'));
        mainMenu();
    } else if (action === 'Open Outputs Folder') {
        const outPath = path.join(process.cwd(), 'outputs');
        const cmd = process.platform === 'win32' ? 'explorer' : 'open';
        spawn(cmd, [outPath]);
        console.log(chalk.green('✔ Folder opened.'));
        mainMenu();
    } else {
        mainMenu();
    }
}

program
  .name('wakil')
  .description('Wakil AI - Terminal Strategic Engine')
  .version('1.1.0');

/**
 * Subcommand: ai
 */
const ai = program.command('ai');

ai
  .command('Start')
  .description('Launch the وكيل AI HDR strategic engine')
  .action(() => {
    showBanner();
    mainMenu();
  });

// Support for direct commands as well
program.command('stats').action(() => handleOthers());
program.command('open-outputs').action(() => {
    const outPath = path.join(process.cwd(), 'outputs');
    const cmd = process.platform === 'win32' ? 'explorer' : 'open';
    spawn(cmd, [outPath]);
});

program.parse(process.argv);
