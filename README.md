# cartographer

An application to manage arrangement maps, or

pisces is part of [Project Electron](https://github.com/RockefellerArchiveCenter/project_electron), an initiative to build sustainable, open and user-centered infrastructure for the archival management of digital records at the [Rockefeller Archive Center](http://rockarch.org/).

[![Build Status](https://travis-ci.org/RockefellerArchiveCenter/cartographer.svg?branch=master)](https://travis-ci.org/RockefellerArchiveCenter/cartographer)

## Setup

Install [git](https://git-scm.com/) and clone the repository

    $ git clone https://github.com/RockefellerArchiveCenter/cartographer.git

Install [Docker](https://store.docker.com/search?type=edition&offering=community) and run docker-compose from the root directory

    $ cd cartographer
    $ docker-compose up

Once the application starts successfully, you should be able to access the application in your browser at `http://localhost:8000`

When you're done, shut down docker-compose

    $ docker-compose down

Or, if you want to remove all data

    $ docker-compose down -v


### Routes

| Method | URL | Parameters | Response  | Behavior  |
|--------|-----|---|---|---|
|GET|/maps||200|Returns a list of maps, ordered by most recent first|
|GET|/delete-feed||200|Returns a list of deleted maps, ordered by most recent first|
|GET|/status||200|Returns the status of the application|
|GET|/schema.json||200|Returns the OpenAPI schema for this application|

## License

This code is released under an [MIT License](LICENSE).
