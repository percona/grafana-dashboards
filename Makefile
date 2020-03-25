export IMPORT_DASH_HOST = http://127.0.0.1:3000
export IMPORT_DASH_USERNAME = admin
export IMPORT_DASH_PASSWORD = admin

all: build pack disable install enable
	tput bel

coverage:
	cd pmm-app \
	&& npm run coverage

e2e:
	cd pmm-app \
	&& mkdir -pv logs video || true \
	&& docker-compose up -d \
	&& bash ./selenium.sh \
	&& npm run e2e

codecov:
	cd pmm-app \
	&& npm run codecov

release:
	cd pmm-app \
	&& npm version \
	&& npm i \
	&& npm run build

test: release e2e coverage codecov

clean:
	rm -r pmm-app/dist/

docker_clean:
	docker-compose stop \
	&& docker-compose rm -f \
	&& docker system prune -f
