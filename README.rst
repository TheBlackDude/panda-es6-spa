***********************
Introduction & Settings
***********************

*NOTE* to delete an item you have to hover over at the end of the row to see the trash icon.

Introduction
============

Payroll Panda SPA Challenge
It's Based on Node, Webpack, Docker && Docker-Compose

Setup without docker
====================

The project uses - `yarn <https://yarnpkg.com/en/>`__ so make sure you have it installed

Run in project directory after you clone the repository:

.. code:: bash

    yarn install

This will install all the dependencies

Start the dev server
--------------------

Run in project directory:

.. code:: bash

    yarn start

Build the files
---------------

.. code:: bash

    yarn webpack

Run the tests
-------------

.. code:: bash

    yarn test

The web server should be reachable at ``http://localhost:9000``.


Setup with docker
=================

If you love docker then no local setup should be needed apart from:
- `docker <https://docs.docker.com/engine/installation/>`__
- `docker-compose <https://docs.docker.com/compose/>`__

The local dev setup uses **docker-compose** to spin up all necessary services.
Make sure you have it installed and can connect to the **docker daemon**.

Build the app
-------------

Run in project directory after you clone the repository:

.. code:: bash

    docker-compose build

Run the app
===========

Start the dev server
------------------

Run in project directory:

.. code:: bash

    docker-compose up

This will build and download the containers and start them. The ``docker-compose.yml``
file describes the setup of the containers.

The web server should be reachable at ``http://localhost:9000``.


Run commands on the server
==========================

Each docker container uses the same script as entrypoint. The ``entrypoint.sh``
script offers a few commands to start the service or run the tests and build the app.
The pattern to run a command is always
``docker-compose run <container-name> <entrypoint-command>``

The following are the two commands we have:

+-------------------------------------+----------------------------------------------------------+
| Action                              | Command                                                  |
+=====================================+==========================================================+
| Build the app                       | ``docker-compose run panda build_dev``                   |
+-------------------------------------+----------------------------------------------------------+
| Run tests                           | ``docker-compose run panda test``                        |
+-------------------------------------+----------------------------------------------------------+
