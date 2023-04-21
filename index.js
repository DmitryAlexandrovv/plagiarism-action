import core, { debug, setFailed } from "@actions/core";
import github from "@actions/github";
import fs from 'fs';

(
    async () => {
        try {
            const data = fs.readFileSync('./plag.json', { encoding:'utf8', flag:'r' });
            const token = core.getInput('repo-token');
            const octokit = new github.getOctokit(token);

            const check = await octokit.rest.checks.create({
                owner: github.context.repo.owner,
                repo: github.context.repo.repo,
                name: 'Plagiarism detector',
                head_sha: github.context.sha,
                status: 'completed',
                conclusion: 'failure',
                output: {
                    title: 'README.md must start with a title',
                    summary: 'Please use markdown syntax to create a title',
                    annotations: [
                        {
                            path: 'README.md',
                            start_line: 1,
                            end_line: 1,
                            annotation_level: 'failure',
                            message: 'README.md must start with a header',
                            start_column: 1,
                            end_column: 1
                        }
                    ]
                }
            });

            return data;

        } catch (error) {
            setFailed(error.message);
        }
    }

)();