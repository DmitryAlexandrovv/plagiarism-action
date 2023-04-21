import core, { debug, setFailed } from "@actions/core";
import github from "@actions/github";
import fs from 'fs';

(
    async () => {
        try {
            const data = fs.readFileSync('./plag.json', { encoding:'utf8', flag:'r' });
            const token = core.getInput('repo-token');
            const octokit = new github.getOctokit(token);

            const resultTableText = JSON.parse(data).reduce((acc, compareResult) => {
                const tableStart = `
                    |Подозрение на плагиат в строках|${compareResult.file}|
                `
                return acc + '\n' + compareResult.comparedFiles.reduce((innerAcc, { file, result }) => {
                    return `
                        ${innerAcc}
                        |:-----------------------------:|:---------------------:| 
                        |           ${file}           |   ${result}   |
                    `;
                }, tableStart);
            }, '');

            console.log(resultTableText);

            const check = await octokit.rest.checks.create({
                owner: github.context.repo.owner,
                repo: github.context.repo.repo,
                name: 'Plagiarism detector report',
                head_sha: github.context.sha,
                status: 'completed',
                conclusion: 'failure',
                output: {
                    title: 'Plagiarism detector report',
                    text: resultTableText,
                }
            });

            return data;

        } catch (error) {
            setFailed(error.message);
        }
    }

)();