const generateHTML = myTeam => {
    const generateManager = manager => {
        return `
            <div class="container card">
                <div class="card-body">
                    <h3 class="card-title">Manager</h3>
                    <h5 class="card-title">${manager.getName()}</h5>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            Employee ID: ${manager.getId()}
                        </li>
                        <li class="list-group-item">
                            Email Address: <a href="mailto:${manager.getEmail()}">
                            ${manager.getEmail()}</a>
                        </li>
                        <li class="list-group-item">
                            Office Number: ${manager.getOfficeNumber()}
                        </li>
                </div>
            </div>
        `
    }

    const generateEngineer = engineer => {
        return `
        <div class="container card">
            <div class="card-body">
                <h3 class="card-title">Engineer</h3>
                <h5 class="card-title">${engineer.getName()}</h5>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        Employee ID: ${engineer.getId()}
                    </li>
                    <li class="list-group-item">
                        Email Address: <a href="mailto:${engineer.getEmail()}">
                        ${engineer.getEmail()}</a>
                    </li>
                    <li class="list-group-item">
                        GitHub: <a href="https://github.com/${engineer.getGithub()}">
                        https://github.com/${engineer.getGithub()}</a>
                    </li>
                </ul>
            </div>
        </div>
        `
    }

    const generateIntern = intern => {
        return `
        <div class="container card">
            <div class="card-body">
                <h3 class="card-title">Intern</h3>
                <h5 class="card-title">${intern.getName()}</h5>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        Employee ID: ${intern.getId()}
                    </li>
                    <li class="list-group-item">
                        Email Address: <a href="mailto:${intern.getEmail()}">
                        ${intern.getEmail()}</a>
                    </li>
                    <li class="list-group-item">
                        School: ${intern.getSchool()}
                    </li>
                </ul>
            </div>
        </div>
        `
    }
    
    const html = [];

    html.push(myTeam
        .filter(employee => employee.getRole() === "Manager")
        .map(manager => generateManager(manager))
    );
    html.push(myTeam
        .filter(employee => employee.getRole() === "Engineer")
        .map(engineer => generateEngineer(engineer))
        .join("")
        );
    html.push(myTeam
        .filter(employee => employee.getRole() === "Intern")
        .map(intern => generateIntern(intern))
        .join("")
    );

    return html.join("");
};

module.exports = myTeam => {
    return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>Team Builder</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" 
                rel="stylesheet" 
                integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" 
                crossorigin="anonymous">
            <link rel="stylesheet" href="../dist/style.css">
        </head>
        <body class="bg-dark">
            <header class="bg-info">
                <h1 class="text-center">My Team</h1>
            </header>
            ${generateHTML(myTeam)}
        </body>
        <script src="../index.js"></script>
    </html>`
}