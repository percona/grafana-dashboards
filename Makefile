export IMPORT_DASH_HOST = http://127.0.0.1:3000
export IMPORT_DASH_USERNAME = admin
export IMPORT_DASH_PASSWORD = admin

.PHONY: all
all: build pack disable install enable
	tput bel

.PHONY: coverage
coverage:
	cd pmm-app \
	&& npm run coverage

.PHONY: e2e
e2e:
	cd pmm-app \
	&& mkdir -pv logs video || true \
	&& docker-compose up -d \
	&& npm run e2e

.PHONY: codecov
codecov:
	cd pmm-app \
	&& npm run codecov

.PHONY: release
release:
	cd pmm-app \
	&& npm version \
	&& npm ci \
	&& npm run build

.PHONY: generate_coverage
generate_coverage: coverage codecov

.PHONY: test
test: release e2e coverage codecov

.PHONY: clean
clean:
	rm -r pmm-app/dist/

.PHONY: docker_clean
docker_clean:
	docker-compose stop \
	&& docker-compose rm -f \
	&& docker system prune -f
