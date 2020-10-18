# Running a Local Database

You may run your own database using Docker.

## Setup

Docker is a prerequisite. Please ensure you have [Docker](https://www.docker.com/products/docker-desktop) installed.

In a terminal, run the following to start the PostgreSQL database.

```bash
cd docker # The directory containing this file
docker-compose up -d
```

This starts a new container
based on the Dockerfile in the `postgres` directory and then detaches (`-d`), letting you interact with your terminal again.

### Rebuilding the Docker image

If you make changes to the Dockerfile and want to create a new container,
you must run the following commands in terminal:

```bash
docker-compose up -d --build # Rebuild the image and start a new container
```
