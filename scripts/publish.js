import { exec } from 'child_process'
import yargs from 'yargs/yargs'
import process from 'process'
import readline from 'readline'

const resetColor = '\x1b[0m'
const redColor = '\x1b[31m'
const greenColor = '\x1b[32m'
const yellowColor = '\x1b[33m'

const argv = yargs(process.argv.slice(2))
    .usage('Update package version and publish to the npm registry.')
    .option('update', {
        choices: ['major', 'minor', 'patch'],
        default: 'patch',
        describe: 'Increment version.',
        type: 'string',
    })
    .version(false)
    .help().argv

const publish = () => {
    console.log(`\n${yellowColor}[ Publish ]${resetColor}\n`)
    exec('yarn publish --access public', (error, stdout) => {
        if (error) {
            console.error(`Error while publishing : ${error}`)
            process.exit(1)
        }
        console.log(stdout)
        console.log(`${yellowColor}Publishing successful!${resetColor}`)
    })
}

const build = () => {
    console.log(`\n${greenColor}[ Build ]${resetColor}\n`)
    exec('yarn build', (error, stdout) => {
        if (error) {
            console.error(`Error while building : ${error}`)
            process.exit(1)
        }
        console.log(stdout)
        console.log(`${greenColor}Building successful!${resetColor}`)
        publish()
    })
}

const update = () => {
    console.log(`\n${redColor}[ Updating ]${resetColor}\n`)
    exec(`yarn version --${argv.update}`, (error, stdout) => {
        if (error) {
            console.error(`Error incrementing version : ${error}`)
            process.exit(1)
        }
        console.log(stdout)
        console.log(`${redColor}Updating successful!${resetColor}`)
        build()
    })
}

const proceed = () => {
    update()
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

function confirm() {
    console.log(
        `\nYou are about to release a new ${argv.update} version of the library.`
    )
    rl.question('Do you want to continue? (yes/no) [no] : ', (answer) => {
        if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
            proceed()
            rl.close()
        } else if (
            !answer ||
            answer.toLowerCase() === 'no' ||
            answer.toLowerCase() === 'n'
        ) {
            console.log('\nAction canceled.')
            rl.close()
        } else {
            console.log('Invalid response. Please answer “yes” or “no”.')
            confirm()
        }
    })
}

confirm()