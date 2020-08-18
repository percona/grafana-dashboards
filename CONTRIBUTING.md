# Contributing notes

We're looking forward to the new contributors.

Our experts must verify all contributions from contributors.

We'd love it if you could contribute a new dashboard or a panel or improve existing ones.

We can help you, more information on the [link](https://www.percona.com/community/contributions/pmm)

## Local setup

The easiest way to setup a development environment is to use [Docker Compose](https://docs.docker.com/compose).

```
cd pmm-app
docker-compose up -d
npm run dev
```

## Workflow for the contributor

1.  Find the task in [JIRA](https://jira.percona.com/issues/?jql=project+%3D+PMM+AND+component+%3D+%22Grafana+Dashboards%22) or create a new task. Use a component filter Grafana Dashboards.

2.  You need to make a fork of our repository in your GitHub account.

3.  Make a clone of your repository on your computer.

4.  Switch the repository to the correct branch. Now it's PMM-2.0.

5.  Create a new branch for your task. Name it using the following pattern: [JIRA_ISSUE_ID]-[username]-[short_title]. For example: PMM-5053-dbazhenov-tooltip .

6.  Make changes to the code in your branch.

7.  Make a commit. It is essential to provide a meaningfull description. Use the following formula: "[JIRA_ISSUE_ID] What is being done."

    Example

        git add .
        git commit -m "PMM-5053 Add a tooltip for Head Block widget for Prometheus Dashboard"

8.  Push your branch into your repository. Check that your branch only contains code relevant to the issue.

    git push origin PMM-5053-dbazhenov-tooltip

9.  Make a Pull Request from your branch to the right branch in percona/grafana-dashboards.

    Example: from dbazhenov:PMM-5053-dbazhenov-tooltip to percona:PMM-2.0

10. Your Pull Request must pass certain checks, i.e. Jenkins CI, and Contributor License Agreement.

    You need to open the Contributor License Agreement page, read it, and confirm it.

11. Wait for our experts to review your code. You may need to answer questions or to address requests for changes.

12. Our Engineers will merge your branch into the release branch by themselves.

13. Congratulations, you have become a contributor. Thanks for contributing to open source!
