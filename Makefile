export IMPORT_DASH_HOST = http://127.0.0.1:3000
export IMPORT_DASH_USERNAME = admin
export IMPORT_DASH_PASSWORD = admin

all: build disable install enable

build:
	cd pmm-qan-app && npm run build && cd ..
	cd pmm-summary-app && npm run build && cd ..
	tar czf pmm-apps.tar.gz pmm-qan-app pmm-summary-app

install:
	docker exec pmm-server supervisorctl stop grafana
	docker exec pmm-server bash -c 'rm -rf /var/lib/grafana/plugins/pmm-*'
	docker cp pmm-apps.tar.gz  pmm-server:/var/lib/grafana/plugins/
	docker exec pmm-server bash -c 'cd /var/lib/grafana/plugins/ && tar xzf pmm-apps.tar.gz'
	docker exec pmm-server supervisorctl start grafana

disable:
	curl -X POST 'http://admin:admin@localhost/graph/api/plugins/pmm-system-summary-app/settings' -d 'enabled=false'
	curl -X POST 'http://admin:admin@localhost/graph/api/plugins/pmm-qan-app/settings' -d 'enabled=false'

enable:
	curl -X POST 'http://admin:admin@localhost/graph/api/plugins/pmm-system-summary-app/settings' -d 'enabled=true'
	curl -X POST 'http://admin:admin@localhost/graph/api/plugins/pmm-mysql-app/settings' -d 'enabled=true'

test:
	./misc/import-dash.py
