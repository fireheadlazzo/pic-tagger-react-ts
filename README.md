# PicTagger v2

A complete rework of a project I did in school. I was proud of it at the time, but it was janky, slow, and destroyed databases with exponential growth. This project aims to fix all of that and even add a fresh coat of paint
Created with 'create-react-app' + typescript
Also I'll probably learn SASS while I'm here
**Bootstrapped with create-react-app + typescript**

## SETUP

On the Hosting side:

- create a fork of pic-tagger-react-ts
- Set up new GCP project
- Enable billing <https://console.cloud.google.com/billing>

### Database and Storage

- Enable SQL database (pg12) <https://console.cloud.google.com/sql/instances>
  - get database connection info (host, password, database, user)
  - copy those values into `server/src/config.json` and add `server/src/config.json` to `.gitignore`
  - run database migrations (under `db` folder)
- Create a new bucket called "images" <https://console.cloud.google.com/storage/browser>

### Secrets

- Enable Security > Secret Manager <https://console.cloud.google.com/marketplace/product/google/secretmanager.googleapis.com>
  - add SQL values to secret manager

### Build Pipeline

#### [TODO: Go back and check all of this from square 1]

- Enable Cloud Build <https://console.cloud.google.com/marketplace/product/google/cloudbuild.googleapis.com>
- Set up a build trigger under Cloud Build <https://console.cloud.google.com/cloud-build/triggers>
  - connect github repo to your GCP account
    - you may need to explicitly allow external applications to access certain repos. You can do that through Github's Repository Access settings <https://github.com/settings/installations>
  - the build trigger should key off of "Push to a branch": `^master$`
  - Include files `server/*` and `server/**/*`
  - Cloudbuild file: `server/src/cloudbuild-prod.yaml`
- Enable the Artifact Registry API <https://console.cloud.google.com/marketplace/product/google/artifactregistry.googleapis.com>
- Enable the Cloud Run API <https://console.developers.google.com/apis/library/run.googleapis.com>
- Give CloudBuild "run as admin" and "service account user" permissions
  - open a cloud terminal and run the following commands (be sure the terminal is using the relevant project)

``` bash
PROJECT_ID=$(gcloud config list --format='value(core.project)')
PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format='value(projectNumber)')
```

``` bash
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member=serviceAccount:$PROJECT_NUMBER@cloudbuild.gserviceaccount.com \
    --role=roles/run.admin
```

``` bash
gcloud iam service-accounts add-iam-policy-binding \
    $PROJECT_NUMBER-compute@developer.gserviceaccount.com \
    --member=serviceAccount:$PROJECT_NUMBER@cloudbuild.gserviceaccount.com \
    --role=roles/iam.serviceAccountUser
```

- Trigger a build. It should build successfully and create a new container in the container registry
- From the Container Registry, find the `latest` image and select Deploy to Cloud Run
  - service name `pic-tagger-v2-node`
  - Deploy one revision from `gcr.io/pic-tagger-v2/server:latest`
