# cartographer

An application to manage JSON tree representations of all archival collections, sub-collections, and parts (record group, subgroup, series, subseries, etc.) by a designated agent/creator ("arrangement maps" for short).

cartographer is part of [Project Electron](https://github.com/RockefellerArchiveCenter/project_electron), an initiative to build sustainable, open and user-centered infrastructure for the archival management of digital records at the [Rockefeller Archive Center](http://rockarch.org/).

[![Build Status](https://travis-ci.org/RockefellerArchiveCenter/cartographer.svg?branch=master)](https://travis-ci.org/RockefellerArchiveCenter/cartographer)

## Local Development

Install [git](https://git-scm.com/) and clone the repository

    $ git clone https://github.com/RockefellerArchiveCenter/cartographer.git

Initialize and update git submodules

    $ cd cartographer
    $ git submodule init
    $ git submodule update

With [Docker](https://store.docker.com/search?type=edition&offering=community) installed, run docker-compose from the root directory

    $ docker-compose up

Once the application starts successfully, you should be able to access the application in your browser at `http://localhost:8000`

When you're done, shut down docker-compose

    $ docker-compose down

Or, if you want to remove all data

    $ docker-compose down -v


## Remote Deployment (development and production)

This repository is optimized for deployment on [vSphere](https://docs.vmware.com/en/VMware-vSphere/index.html). Deployment is achieved using additional docker-compose files (`docker-compose.dev.yml` and `docker-compose.prod.yml`) as well as environment variable files, whose filenames begin with `.env`.

Production deployment requires a few additional steps. First, copy `.env.dev` to `.env.prod` (you're just replacing `dev` with `prod`). You can then make the necessary changes to point your app at a production database and ArchivesSpace instance, etc.

Once you have updated the environment variables, run the following command, substituting `docker-compose-file.yml` with the name of the production or development docker-compose file (see above) and substituting paths to certificates and the VCH host:

    $ docker-compose -H {VCH host URL} --tlsverify --tlscert="{path to cert.pem} --tlskey="{path to key.pem}" --tlscacert="{path to ca.pem}" -f docker-compose-file.yml up -d

Any changes to the frontend or backend must be built in Docker Hub before they can be deployed to production. To pull updated images, run the following command:

    $ docker-compose -H {VCH host URL} --tlscacert="{path to ca.pem}" -f docker-compose.prod.yml pull



### Routes

| Method | URL | Parameters | Response  | Behavior  |
|--------|-----|---|---|---|
|GET|/maps|`modified_since` - returns only maps modified since the time provided (as a Unix timestamp) <br/>`published` - if present, returns only published maps|200|Returns a list of maps, ordered by most recent first|
|GET|/delete-feed|`deleted_since` - returns only maps deleted since the time provided (as a Unix timestamp)|200|Returns a list of deleted maps, ordered by most recent first|
|GET|/status||200|Returns the status of the application|
|GET|/schema.json||200|Returns the OpenAPI schema for this application|

## License

This code is released under an [MIT License](LICENSE).


## References

Production container implementation relies heavily on:
- [Dockerizing Django with Postgres, Gunicorn, and Nginx](https://testdriven.io/blog/dockerizing-django-with-postgres-gunicorn-and-nginx/)
- [A template project for a Dockerised Django app](https://github.com/hendrikfrentrup/docker-django)
- [Dockerizing a React App](https://mherman.org/blog/dockerizing-a-react-app/)
- [So you want to Dockerize your React app?](https://medium.com/greedygame-engineering/so-you-want-to-dockerize-your-react-app-64fbbb74c217)
- [Create React App + Docker — multi-stage build example. Let’s talk about artifacts!](https://medium.com/@shakyShane/lets-talk-about-docker-artifacts-27454560384f)
- [Sample nginx config](https://github.com/facebook/create-react-app/issues/1087#issuecomment-426916800)
