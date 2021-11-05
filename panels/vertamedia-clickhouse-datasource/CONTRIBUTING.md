# Development process

There are following scripts defined in package.json:

- `build:prod` – production-ready build of frontend part
- `build:dev` - development build (no uglify etc.) of frontend part
- `build:watch` - automatically rebuild frontend TypeScript+HTML part of codebase on change (handy while developing)
- `test` - runs frontend test suite using Jest
- `test:watch` - runs frontend test suite using Jest in watch mode. Automatically reruns tests on source change.

Each script can be run using NPM or Yarn package managers:

```sh
npm run <script>
```

or 

```sh
yarn run <script>
```

(for example `npm run build`)

For test examples please see `spec` folder. We strongly encourage contributors to add tests to check new changes or functionality.

### Docker-compose environment for development

This is a simple environment which mounts the current `dist` directory inside the `grafana` container. The `grafana` container connects to the docker `clickhouse` database container.
Also `grafana` container contains some datasource and dashboards installed via `/etc/grafana/provisioning/` folder.

To run the development environment install Docker and docker-compose:
```sh
docker-compose up --no-deps -d grafana clickhouse
```
after that open http://localhost:3000/ to open grafana instance with one clickhouse datasource

#### Frontend Builder

The frontend builder is the docker container used to transpile the typescript source code into the javascript found in the `dist` dir. This will affect the grafana query and configuration functionality.

To develop using docker, the process looks like:
1. change source files
2. `docker-compose up frontend_builder`
3. `docker-compose restart grafana`
4. open http://localhost:3000/

To develop without build inside a docker, the development process for frontend part of code looks like:
1. change source files
2. `npm run test`
3. `npm run build:dev`
4. `docker-compose restart grafana`
5. open http://localhost:3000/

#### Backend Builder

The backend builder is the docker container used to compile the golang source code into the `vertamedia-clickhouse-plugin_linux_amd64` binary in the `dist` dir. This will affect the grafana service used for running queries for alerting. The entrypoint for the go code is at `plugin.go`.

To develop using docker, the development process for backend part of code looks like:
1. change source files
2. `docker-compose up backend_builder`
3. `docker-compose restart grafana`
4. open http://localhost:3000/

To format your go code, use the command:
```sh
docker-compose run --rm backend_builder go fmt .
```

The resulting alerts should look like this
![image](https://user-images.githubusercontent.com/5578150/81031711-fd2fad00-8e41-11ea-9b54-5eb4ca1628f1.png)


### Howto Make new release

- fork https://github.com/Vertamedia/clickhouse-grafana and make git clone, if necessary
- look at https://github.com/Vertamedia/clickhouse-grafana/commits/master and add necessary items to [CHANGELOG.md](CHANGELOG.md)
- install Python3 and run `pip3 install -U bump2version`
- read https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token to getting value for `GITHUB_TOKEN`
- create .release_env file in root of your git working copy with following content:
```bash
#!/usr/bin/env bash
set +x
export GITHUB_LOGIN="<your_github_login>"
export GITHUB_EMAIL="<your_github_email>"
export GITHUB_TOKEN="<your_github_token>"
set -xeuo pipefail
```
- run `./release.sh` with following parameters:
    - `./release.sh patch` - for minor hotfix releases
    - `./release.sh minor` - for minor and backward compatible improvements releases
    - `./release.sh major` - for major or backward incompatible improvements releases
- this script will run `frontend` and `backend` builders via `docker-compose` and run tests and make git commit + git push if test pass

#### Final manual steps
- after git push to your github fork, please open new pull request between your fork and `master` branch in https://github.com/Vertamedia/clickhouse-grafana
  copy/paste CHANGELOG.md items for new release to Pull Request message.           
- after merge pull request in https://github.com/Vertamedia/clickhouse-grafana/, 
  please open https://github.com/Vertamedia/clickhouse-grafana/releases create new release or request tp somebody of [contributors](https://github.com/Vertamedia/clickhouse-grafana/graphs/contributors).
- after create new release on https://github.com/Vertamedia/clickhouse-grafana/releases,
  please create new pull request in https://github.com/grafana/grafana-plugin-repository, please follow `grafana-plugin-repository` pull request message styleguide, 
  copy/paste CHANGELOG.md items for new release to Pull Request message.           
