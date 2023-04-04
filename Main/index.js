const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const DIST = path.resolve(__dirname, 'dist');
const distPath = path.join(DIST, 'Myteam.html');

const render = require('./src/template.js');

const myTeam = [];
const idArray = [];

function runApp () {
    console.log('Time to Build your team!');
    function setupManager() {
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'nameOfManager',
                    message: 'What is the name of your preferred team Manager?',
                    validate: (answer) => {
                        if (answer !== '') {
                            return true;
                        }
                        return 'Please enter a name for your manager.';
                    },
                },
                {
                    type: 'input',
                    name: 'idOfManager',
                    message: 'What is the employee ID of this team Manager?',
                },
                {
                    type: 'input',
                    name: 'emailOfManager',
                    message: 'What is the email address of this team Manager?',
                    validate: (answer) => {
                        if (answer!== '') {
                            return true;
                        }
                        return 'Please enter a valid email address for your manager.';
                    },
                },
                {
                    type: 'input',
                    name: 'officeNumber',
                    message: 'What is the office number of this team Manager?',
                },
            ])
            .then((answers) => {
                const teamManager = new Manager(
                    answers.nameOfManager,
                    answers.idOfManager,
                    answers.emailOfManager,
                    answers.officeNumber,
                );
                myTeam.push(teamManager);
                idArray.push(answers.idOfManager);
                teamBuild();
            });
    };

    function teamBuild() {
        inquirer
            .prompt([
                {
                type: 'list',
                name: 'newMember',
                message: 'Would you like to add another team member?',
                choices: ['Engineer', 'Intern', 'I don\'t want to add any more'],
                }
            ])
            .then((chosenMember) => {
                switch (chosenMember.newMember) {
                    case 'Engineer':
                        setupEngineer();
                        break;
                    case 'Intern':
                        setupIntern();
                        break;
                    default:
                        generateTeam();
                }
            })
            
            function setupEngineer() {
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            name: 'nameOfEngineer',
                            message: 'What is the name of the new Engineer?',
                        },
                        {
                            type: 'input',
                            name: 'idOfEngineer',
                            message: 'What is the employee ID of this new Engineer?',
                        },
                        {
                            type: 'input',
                            name: 'emailOfEngineer',
                            message: 'What is the email address of this new Engineer?',
                        },
                        {
                            type: 'input',
                            name: 'github',
                            message: 'What is the GitHub username of this new Engineer?',
                        }
                   ])
                   .then((answers) => {
                        const teamEngineer = new Engineer(
                            answers.nameOfEngineer,
                            answers.idOfEngineer,
                            answers.emailOfEngineer,
                            answers.github,
                        );
                        myTeam.push(teamEngineer);
                        idArray.push(answers.idOfEngineer);
                        teamBuild();
                   });
            }
        
            function setupIntern() {
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            name: 'nameOfIntern',
                            message: 'What is the name of the new Intern?',
                        },
                        {
                            type: 'input',
                            name: 'idOfIntern',
                            message: 'What is the employee ID of this new Intern?'
                        },
                        {
                            type: 'input',
                            name: 'emailOfIntern',
                            message: 'What is the email address of this new Intern?',
                        },
                        {
                            type: 'input',
                            name:'school',
                            message: 'What school did this new Intern attend?'
                        },
                   ])
                   .then((answers) => {
                        const teamIntern = new Intern(
                            answers.nameOfIntern,
                            answers.idOfIntern,
                            answers.emailOfIntern,
                            answers.school,
                        );
                        myTeam.push(teamIntern);
                        idArray.push(answers.idOfIntern);
                        teamBuild();
                   });
            }
    }

// need to write this function
    function generateTeam() {
        if (!fs.existsSync(DIST)) {
            fs.mkdirSync(DIST);
        }
        fs.writeFileSync(distPath, render(myTeam), 'utf8');
    }

    setupManager();
};

runApp();