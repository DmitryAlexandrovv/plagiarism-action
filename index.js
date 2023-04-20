import { debug, getInput, setFailed } from "@actions/core";
import { context, getOctokit } from "@actions/github";
import stripAnsi from "strip-ansi";
import { v4 } from "uuid";
import fs from 'fs';

const sha = context.payload.pull_request?.head.sha ?? context.sha;
const githubToken = getInput('github-token')
const actionName = getInput('action-name');
// const octokit = getOctokit(githubToken);

(
    async () => {
        try {
            const output = {
                title: 'Plagiarism Detecotr Results',
                text: `result text`,
                // annotations:
                //     results.map(result => ({
                //     path: result.path.replace(home, ''),
                //     start_line: result.location.line,
                //     end_line: result.location.line,
                //     start_column: result.location.column,
                //     end_column: result.location.column,
                //     annotation_level: 'failure',
                //     title: result.title,
                //     message: stripAnsi(result.message)
                //     }))
                };

            console.log(123);

            fs.readdir('./', (err, files) => {
                files.forEach(file => {
                    console.log(file);
                });
            });

            debug(`[output]${JSON.stringify(output, undefined, 2)}`);
                
            // return octokit
            //     .rest
            //     .checks
            //     .create({
            //         ...context.repo,
            //         head_sha: sha,
            //         name: stripAnsi(actionName),
            //         conclusion: 'success',
            //         external_id: v4(),
            //         output
            //     })

        } catch (error) {
            setFailed(error.message);
        }
    }

)();