import * as GitHub from 'github-api';
import * as opn from 'opn';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    let disposable = vscode.commands.registerCommand('extension.getGitHubIssues', () => {
        let client = new GitHub();

        client.getIssues('gulpjs', 'gulp').listIssues().then(res => {

            // Sort the collection of issues by number and build composite descriptions.
            let issues = res.data.sort((a, b) => a.number - b.number);
            let descriptions = issues.map(issue => formatIssue(issue));
            
            vscode.window.showQuickPick(descriptions).then(selection => {

                // Find the issue by composite description, then open the issue page in the default browser.
                let selectedIssue = issues.find(issue => formatIssue(issue) === selection);
                
                opn(selectedIssue.html_url);
            });
        });
    });

    context.subscriptions.push(disposable);
}

function formatIssue(issue): string {
    return `#${issue.number} ${issue.title}`;
}

// this method is called when your extension is deactivated
export function deactivate() {
    
}