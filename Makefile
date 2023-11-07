export IMPORT_DASH_HOST = http://127.0.0.1:3000
export IMPORT_DASH_USERNAME = admin
export IMPORT_DASH_PASSWORD = admin

.PHONY: all
all: build pack disable install enable
	tput bel

.PHONY: coverage
coverage:
	cd pmm-app \
	&& yarn run coverage

.PHONY: codecov
codecov:
	cd pmm-app \
	&& yarn run codecov

.PHONY: release
release:
	cd pmm-app \
	&& npm version \
	&& yarn install --frozen-lockfile \
	&& yarn run build

.PHONY: prepare_release
prepare_release:
	cd pmm-app \
	&& npm version \
	&& yarn install --frozen-lockfile \

.PHONY: build_package
build_package:
	cd pmm-app \
	&& yarn run build

.PHONY: generate_coverage
generate_coverage: coverage codecov

.PHONY: test
test: release coverage codecov

.PHONY: clean
clean:
	rm -r pmm-app/dist/

.PHONY: docker_clean
docker_clean:
	docker-compose stop \
	&& docker-compose rm -f -v \
	&& docker system prune --volumes -f
