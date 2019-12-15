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


## Production Deployment

To deploy on vSphere, run the following command:

    $ docker-compose -H {VCH host URL} --tlscacert="{path to ca.pem}" -f docker-compose.prod.yml up -d

To update (after changes have been made to any images):

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
