const core = require('@actions/core');
const github = require('@actions/github');
const stripAnsi = require('strip-ansi');
const uuid = require('uuid');

const { v4 } = uuid;
const sha = context.payload.pull_request?.head.sha ?? context.sha;
const { context } = github;
const { getInput } = core;
const githubToken = getInput('github-token')
const actionName = getInput('action-name');
const octokit = getOctokit(githubToken);

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

            debug(`[output]${JSON.stringify(output, undefined, 2)}`);
                
            return octokit
                .rest
                .checks
                .create({
                    ...context.repo,
                    head_sha: sha,
                    name: stripAnsi(actionName),
                    conclusion: 'success',
                    external_id: v4(),
                    output
                })

        } catch (error) {
            core.setFailed(error.message);
        }
    }

)();