IMG_NAME ?= open-currency-api
DOCKER_TAG ?= latest
COMPANY ?= pjamroziak

install:
	npm install

build:
	npm run build

run:
	npm run start

debug:
	npm run start:debug

test:
	npm test

docker-build:
	docker build -t $(COMPANY)/$(IMG_NAME):$(DOCKER_TAG) -f docker/Dockerfile .

docker-run:
	docker run --name $(IMG_NAME) \
		--env-file .env \
		-p 3000:3000 $(COMPANY)/$(IMG_NAME):$(DOCKER_TAG)

docker-push:
	docker push $(COMPANY)/$(IMG_NAME):$(DOCKER_TAG)