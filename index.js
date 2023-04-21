import { debug, getInput, setFailed } from "@actions/core";
import { context } from "@actions/github";
import fs from 'fs';

const sha = context.payload.pull_request?.head.sha ?? context.sha;
const githubToken = getInput('github-token')
const actionName = getInput('action-name');
// const octokit = getOctokit(githubToken);

(
    async () => {
        try {
            const data = fs.readFileSync('./plag.json', { encoding:'utf8', flag:'r' });
            console.log(data);

            debug(`[output]${JSON.stringify(output, undefined, 2)}`);

        } catch (error) {
            setFailed(error.message);
        }
    }

)();