export IMPORT_DASH_HOST = http://127.0.0.1:3000
export IMPORT_DASH_USERNAME = admin
export IMPORT_DASH_PASSWORD = admin

release: prepare_release build_package

prepare_release:
	cd pmm-app \
	&& npm version \
	&& yarn install --frozen-lockfile \

build_package:
	cd pmm-app \
	&& yarn run build

test: release
	cd pmm-app \
	&& yarn test:ci

clean:
	rm -r pmm-app/dist/

docker_clean:
	docker-compose stop \
	&& docker-compose rm -f -v \
	&& docker system prune --volumes -f

install-plugins:
	@echo "Installing PMM plugins..."
	@echo "To override the platform, set the PLATFORM environment variable."
	@echo "Example: PLATFORM=linux/arm64 make upgrade_plugins"
	@echo "Installing grafana-clickhouse-datasource plugin..."
	@docker run \
		--rm \
		--name grafana \
		--platform="$${PLATFORM:-linux/amd64}" \
		--entrypoint=/bin/bash \
		-v "./panels":/var/lib/grafana/plugins \
		grafana/grafana:11.6 \
		-c "grafana cli --pluginUrl=https://github.com/grafana/clickhouse-datasource/releases/download/v4.14.1/grafana-clickhouse-datasource-4.14.1.linux_amd64.zip plugins install grafana-clickhouse-datasource"
	@echo "Installing grafana-polystat-panel plugin..."
	@docker run \
		--rm \
		--name grafana \
		--platform="$${PLATFORM:-linux/amd64}" \
		--entrypoint=/bin/bash \
		-v "./panels":/var/lib/grafana/plugins \
		grafana/grafana:11.6 \
		-c "grafana cli --pluginUrl=https://github.com/grafana/grafana-polystat-panel/releases/download/v2.1.16/grafana-polystat-panel-2.1.16.zip plugins install grafana-polystat-panel"
