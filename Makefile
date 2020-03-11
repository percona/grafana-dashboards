export IMPORT_DASH_HOST = http://127.0.0.1:3000
export IMPORT_DASH_USERNAME = admin
export IMPORT_DASH_PASSWORD = admin

all: build pack disable install enable
	tput bel

build:
	cd pmm-app && npm i && npm run build && cd ..

coverage:
	cd pmm-app && npm run coverage && cd ..

e2e:
	mkdir pmm-app/logs
	cd pmm-app && docker-compose up -d
	cd pmm-app && bash ./selenium.sh
	npm i -g codeceptjs
	cd pmm-app && codeceptjs run-multiple --all --steps --grep '(?=.*)^(?!.*@visual-test)'

pack:
	tar czf pmm-app.tar.gz pmm-app

release:
	cd pmm-app && npm version
	cd pmm-app && npm i
	cd pmm-app && npm run build

install:
	docker exec pmm-server supervisorctl stop grafana
	docker exec pmm-server bash -c 'rm -rf /var/lib/grafana/plugins/pmm-*'
	docker cp pmm-app.tar.gz  pmm-server:/var/lib/grafana/plugins/
	docker exec pmm-server bash -c 'cd /var/lib/grafana/plugins/ && tar xzf pmm-app.tar.gz'
	docker exec pmm-server supervisorctl start grafana

disable:
	curl -X POST 'http://admin:admin@localhost/graph/api/plugins/pmm-app/settings' -d 'enabled=false'

enable:
	curl -X POST --retry-delay 5 --retry 5 'http://admin:admin@localhost/graph/api/plugins/pmm-app/settings' -d 'enabled=true'

test: build e2e coverage pack disable install enable

clean:
	rm -r pmm-app/dist/
