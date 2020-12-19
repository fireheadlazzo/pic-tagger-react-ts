# PicTagger v2

A complete rework of a project I did in school. I was proud of it at the time, but it was janky, slow, and destroyed databases with exponential growth. This project aims to fix all of that and even add a fresh coat of paint  
Created with 'create-react-app' + typescript  
Also I'll probably learn SASS while I'm here  
**Bootstrapped with create-react-app + typescript**

## SETUP

On the Hosting side:

- create a fork of pic-tagger-react-ts
- Set up new GCP project
- Enable billing
- Enable SQL database (pg12)
  - get database connection info (host, password, database, user)
  - copy those values into `server/src/config.json` and add `server/src/config.json` to `.gitignore`
  - run database migrations (under `db` folder)
- Enable Security > Secret Manager
  - add SQL values to secret manager
- Set up a build trigger under Cloud Build
  - connect github repo to your GCP account
    - you may need to explicitly allow external applications to access certain repos. You can do that through Guthub's Repository Access settings
  - the build trigger should key off of "Push to a branch": `^master$`
  - Include files `server/*` and `server/**/*`
  - Cloudbuild file: `server/src/cloudbuild-prod.yaml`
