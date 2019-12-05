# Contributing notes

We're looking forward to the new contributors.

Our experts must verify all contributions from contributors. 

We'd love it if you could contribute new dashboard or improve existing ones.

We can help you, more information on the [link](https://www.percona.com/community/contributions/pmm)

## Local setup

The easiest way to make a local development setup is to use Docker Compose.

```
docker-compose up
make
```

## Workflow for the contributor

1.    Find the task in [JIRA](https://jira.percona.com/issues/?jql=project+%3D+PMM+AND+component+%3D+%22Grafana+Dashboards%22) or create a new task. Use a component filter Grafana Dashboards.

2.    You need to make a fork of our repository in your GitHub account.

3.    Make a clone of your repository on your computer.

4.    Switch the repository to the correct branch. Now it's PMM-2.0. 

5.    Create a new branch for your task. Name it by formula: [JIRA_ISSUE_ID]_[username]_[short_title]. For example: PMM-5053_dbazhenov_tooltip .

6.    Make changes to the code in your branch.

7.    Make commit. It is essential to calls commit correctly. Use a formula: "[JIRA_ISSUE_ID] What has done."

    Example

        git add .
        git commit -m "PMM-5053 Tooltip for Head Block widget for Prometheus Dashboard was added"

8.    Push your branch into your repository. Check that your branch has only the necessary code changes. 

        git push origin PMM-5053_dbazhenov_tooltip

9.    Make a Pull Request for your branch in the right branch in percona/grafana-dashboards.

    Example: from dbazhenov:PMM-5053_dbazhenov_tooltip to percona:PMM-2.0

10.    Your Pull Request must pass three tests: Codacy, Travis-CI, and Contributor License Agreement.

    You need to open the Contributor License Agreement page, read it, and confirm it. 

11.    Wait for our experts to check your code. You may need to answer questions or make improvements.

12. Our Expert Advisors make merge of your branch into the release branch by themselves. 

13. Congratulations, you have become a contributor. 
