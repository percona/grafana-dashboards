export IMPORT_DASH_HOST = http://127.0.0.1:3000
export IMPORT_DASH_USERNAME = admin
export IMPORT_DASH_PASSWORD = admin

.PHONY: release
release: prepare_release build_package

.PHONY: prepare_release
prepare_release:
	cd pmm-app \
	&& npm version \
	&& yarn install --frozen-lockfile \

.PHONY: build_package
build_package:
	cd pmm-app \
	&& yarn run build

.PHONY: test
test: release
	cd pmm-app \
	&& yarn test:ci

.PHONY: clean
clean:
	rm -r pmm-app/dist/

.PHONY: docker_clean
docker_clean:
	docker-compose stop \
	&& docker-compose rm -f -v \
	&& docker system prune --volumes -f

.PHONY: upgrade_plugins
upgrade_plugins:
	@echo "Upgrading PMM plugins..."
	@echo "To override the platform, set the PLATFORM environment variable."
	@echo "Example: PLATFORM=linux/arm64 make upgrade_plugins"
	@echo
	@cd misc && \
	./upgrade-plugins.sh
