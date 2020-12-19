# PicTagger v2

A complete rework of a project I did in school. I was proud of it at the time, but it was janky, slow, and destroyed databases with exponential growth. This project aims to fix all of that and even add a fresh coat of paint  
Created with 'create-react-app' + typescript  
Also I'll probably learn SASS while I'm here  
**Bootstrapped with create-react-app + typescript**

## SETUP

On the Hosting side:

- Set up new GCP project
- Enable billing
- Enable SQL database (pg12)
  - get database connection info (host, password, database, user)
  - copy those values into `server/src/config.json` and add `server/src/config.json` to `.gitignore`
  - run database migrations (under `db` folder)
- Enable Security > Secret Manager
  - add SQL secrets to secret manager
  