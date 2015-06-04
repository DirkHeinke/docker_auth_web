# docker_auth Web Interface

Webinterface to easily change the [docker_auth](https://github.com/cesanta/docker_auth) config file.

Run with

    docker run -it -p 5002:3000 --rm -v /path/to/docker_auth/config/:/config -e CONF_FILE=/config/simple.yml darkdirk/docker-auth-web
   
You can now access the UI at http://localhost:5002

Please build your own security via simple auth (nginx, apache)

Currently docker_auth will not reread the config file if it changes, so you have to restart the docker_auth container, if your changes should take effect.
