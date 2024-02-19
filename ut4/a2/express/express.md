## Express (Javascript)

### Instalación

#### Node.js

Lo primero que debemos instalar es [Node.js](<[https://](https://nodejs.org/es/)>): un entorno de ejecución para JavaScript construido con [V8, motor de JavaScript de Chrome](https://v8.dev/).

Existe un instalador que nos facilita **añadir los repositorios oficiales de Node.js**. El comando a ejecutar es el siguiente:

```console
curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash

## Installing the NodeSource Node.js 19.x repo...


## Populating apt-get cache...

+ apt-get update
Obj:1 http://deb.debian.org/debian bullseye InRelease
Des:2 https://download.docker.com/linux/debian bullseye InRelease [43,3 kB]
Des:3 http://security.debian.org/debian-security bullseye-security InRelease [48,4 kB]
Obj:4 https://packages.sury.org/php bullseye InRelease
Des:5 http://deb.debian.org/debian bullseye-updates InRelease [44,1 kB]
Des:6 http://nginx.org/packages/debian bullseye InRelease [2.866 B]
Des:7 http://security.debian.org/debian-security bullseye-security/main Sources [167 kB]
Des:8 http://packages.microsoft.com/repos/code stable InRelease [10,4 kB]
Des:9 http://apt.postgresql.org/pub/repos/apt bullseye-pgdg InRelease [91,7 kB]
Des:10 http://security.debian.org/debian-security bullseye-security/main arm64 Packages [192 kB]
Des:11 http://packages.microsoft.com/repos/code stable/main arm64 Packages [119 kB]
Des:12 http://security.debian.org/debian-security bullseye-security/main Translation-en [123 kB]
Des:13 http://packages.microsoft.com/repos/code stable/main armhf Packages [119 kB]
Des:14 http://packages.microsoft.com/repos/code stable/main amd64 Packages [117 kB]
Des:15 http://apt.postgresql.org/pub/repos/apt bullseye-pgdg/main arm64 Packages [256 kB]
Descargados 1.334 kB en 2s (597 kB/s)
Leyendo lista de paquetes... Hecho

## Confirming "bullseye" is supported...

+ curl -sLf -o /dev/null 'https://deb.nodesource.com/node_19.x/dists/bullseye/Release'

## Adding the NodeSource signing key to your keyring...

+ curl -s https://deb.nodesource.com/gpgkey/nodesource.gpg.key | gpg --dearmor | tee /usr/share/keyrings/nodesource.gpg >/dev/null
gpg: AVISO: propiedad insegura del directorio personal '/home/sdelquin/.gnupg'

## Creating apt sources list file for the NodeSource Node.js 19.x repo...

+ echo 'deb [signed-by=/usr/share/keyrings/nodesource.gpg] https://deb.nodesource.com/node_19.x bullseye main' > /etc/apt/sources.list.d/nodesource.list
+ echo 'deb-src [signed-by=/usr/share/keyrings/nodesource.gpg] https://deb.nodesource.com/node_19.x bullseye main' >> /etc/apt/sources.list.d/nodesource.list

## Running `apt-get update` for you...

+ apt-get update
Obj:1 http://security.debian.org/debian-security bullseye-security InRelease
Obj:2 http://apt.postgresql.org/pub/repos/apt bullseye-pgdg InRelease
Obj:3 http://deb.debian.org/debian bullseye InRelease
Obj:4 http://deb.debian.org/debian bullseye-updates InRelease
Obj:5 http://packages.microsoft.com/repos/code stable InRelease
Obj:6 https://download.docker.com/linux/debian bullseye InRelease
Obj:7 http://nginx.org/packages/debian bullseye InRelease
Obj:8 https://packages.sury.org/php bullseye InRelease
Des:9 https://deb.nodesource.com/node_19.x bullseye InRelease [4.586 B]
Des:10 https://deb.nodesource.com/node_19.x bullseye/main arm64 Packages [772 B]
Descargados 5.358 B en 1s (4.180 B/s)
Leyendo lista de paquetes... Hecho

## Run `sudo apt-get install -y nodejs` to install Node.js 19.x and npm
## You may also need development tools to build native addons:
     sudo apt-get install gcc g++ make
## To install the Yarn package manager, run:
     curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmor | sudo tee /usr/share/keyrings/yarnkey.gpg >/dev/null
     echo "deb [signed-by=/usr/share/keyrings/yarnkey.gpg] https://dl.yarnpkg.com/debian stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
     sudo apt-get update && sudo apt-get install yarn
```

Ahora ya podemos **instalar Node.js de forma ordinaria**:

```console
sudo apt install -y nodejs
Leyendo lista de paquetes... Hecho
Creando árbol de dependencias... Hecho
Leyendo la información de estado... Hecho
Se instalarán los siguientes paquetes NUEVOS:
  nodejs
0 actualizados, 1 nuevos se instalarán, 0 para eliminar y 78 no actualizados.
Se necesita descargar 28,3 MB de archivos.
Se utilizarán 183 MB de espacio de disco adicional después de esta operación.
Des:1 https://deb.nodesource.com/node_19.x bullseye/main arm64 nodejs arm64 19.0.1-deb-1nodesource1 [28,3 MB]
Descargados 28,3 MB en 4s (7.406 kB/s)
Seleccionando el paquete nodejs previamente no seleccionado.
(Leyendo la base de datos ... 230383 ficheros o directorios instalados actualmente.)
Preparando para desempaquetar .../nodejs_19.0.1-deb-1nodesource1_arm64.deb ...
Desempaquetando nodejs (19.0.1-deb-1nodesource1) ...
Configurando nodejs (19.0.1-deb-1nodesource1) ...
Procesando disparadores para man-db (2.9.4-2) ...
```

#### Aplicación

Ahora ya podemos crear la estructura (andamiaje) de nuestra aplicación Express. Para ello utilizamos `express-generator` una herramienta que debemos instalar de forma global en el sistema:

```console
sudo npm install -g express-generator
npm WARN deprecated mkdirp@0.5.1: Legacy versions of mkdirp are no longer supported. Please update to mkdirp 1.x. (Note that the API surface has changed to use Promises in 1.x.)

added 10 packages, and audited 11 packages in 2s

4 vulnerabilities (1 moderate, 1 high, 2 critical)

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
npm notice
npm notice New patch version of npm available! 8.19.2 -> 8.19.3
npm notice Changelog: https://github.com/npm/cli/releases/tag/v8.19.3
npm notice Run npm install -g npm@8.19.3 to update!
npm notice
```

Creamos la **estructura base de la aplicación** indicando que las vistas (plantillas) van a utilizar [pug](https://pugjs.org/api/getting-started.html) como **motor de plantillas**:

```console
express --view=pug travelroad

   create : travelroad/
   create : travelroad/public/
   create : travelroad/public/javascripts/
   create : travelroad/public/images/
   create : travelroad/public/stylesheets/
   create : travelroad/public/stylesheets/style.css
   create : travelroad/routes/
   create : travelroad/routes/index.js
   create : travelroad/routes/users.js
   create : travelroad/views/
   create : travelroad/views/error.pug
   create : travelroad/views/index.pug
   create : travelroad/views/layout.pug
   create : travelroad/app.js
   create : travelroad/package.json
   create : travelroad/bin/
   create : travelroad/bin/www

   change directory:
     $ cd travelroad

   install dependencies:
     $ npm install

   run the app:
     $ DEBUG=travelroad:* npm start
```


Tal y como indica la salida del comando, ahora debemos **instalar las dependencias**:

```console
npm install
```

### Configuración de la base de datos

Para poder acceder a la base de datos PostgreSQL necesitamos una dependencia adicional [node-postgres](https://www.npmjs.com/package/pg). Realizamos la instalación:

```console
npm install pg
```

Siempre es interesante guardar las credenciales en un fichero "externo". En este caso vamos a trabajar con un fichero `.env` con lo que necesitaremos el paquete [dotenv](<[https://](https://www.npmjs.com/package/dotenv)>). Lo instalamos:

```console
npm install dotenv
```

En este fichero hay que guardar [la cadena de conexión](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING) a la base de datos PostgreSQL:

```console
echo 'PSQL_CONNECTION=postgresql://travelroad_user:dpl0000@localhost:5432/travelroad' > .env
```

### Lógica de negocio

Nos queda modificar el comportamiento de la aplicación para **cargar los datos** y **mostrarlos en una plantilla**.

#### Conexión a la base de datos

```console
mkdir config && vi config/database.js
```

```js
const { Pool } = require("pg");
require("dotenv").config();
const connectionString = process.env.PSQL_CONNECTION;
const pool = new Pool({
  connectionString,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
```

#### Gestión de las rutas

```console
vi routes/index.js
```

```js
const db = require("../config/database");
let express = require("express");
let router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  const { rows: wished } = await db.query(
    "SELECT * FROM places WHERE visited=false"
  );
  const { rows: visited } = await db.query(
    "SELECT * FROM places WHERE visited=true"
  );
  res.render("index", { wished, visited });
});

router.get("/visited", async function (req, res, next) {
  const { rows: visited } = await db.query(
    "SELECT * FROM places WHERE visited=true"
  );
  res.render("visited", { visited });
});


router.get("/wished", async function (req, res, next) {
  const { rows: wished } = await db.query(
    "SELECT * FROM places WHERE visited=false"
  );
  res.render("wished", { wished });
});

module.exports = router;
```

#### Plantilla para la vista

```console
vi views/index.pug
```
```pug
doctype html
html(lang="en")
  head
    meta(charset="UTF-8")
    meta(name="viewport", content="width=device-width, initial-scale=1.0")
    title Travel Road
  body
    h1 My Travel Bucket List

    a(href='wished') Places I'd Like to Visit
    br    
    a(href='visited') Places I've Already Been To

    p Powered by #{'Express!'}
```

```console
vi views/wished.pug
```
```pug
html
  head
    title Travel List

  body
    h2 Places I'd Like to Visit
    ul
      each place in wished
        li= place.name

    a(href='/') Return
```

```console
vi views/visited.pug
```
```pug
html
  head
    title Travel List

  body
    h2 Places I've Already Been To
    ul
      each place in visited
        li= place.name

    a(href='/') Return
```
### Gestionando procesos

Lo primero es **instalar el paquete** de forma global en el sistema:

```console
sudo npm install -g pm2
npm WARN deprecated uuid@3.4.0: Please upgrade  to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See https://v8.dev/blog/math-random for details.

added 184 packages, and audited 185 packages in 12s

12 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

Ahora ya podemos **lanzar un proceso en background** con nuestra aplicación. Estando en la carpeta de trabajo `~/travelroad` ejecutamos el siguiente comando:

```console
pm2 start ./bin/www --name travelroad
[PM2] Starting travelroad/bin/www in fork_mode (1 instance)
[PM2] Done.
┌────┬────────────────────┬──────────┬──────┬───────────┬──────────┬──────────┐
│ id │ name               │ mode     │ ↺    │ status    │ cpu      │ memory   │
├────┼────────────────────┼──────────┼──────┼───────────┼──────────┼──────────┤
│ 0  │ travelroad         │ fork     │ 0    │ online    │ 0%       │ 22.6mb   │
└────┴────────────────────┴──────────┴──────┴───────────┴──────────┴──────────┘
```

### Configuración de Nginx

Lo único que nos queda es preparar el _virtual host_ en Nginx para comunicar con el proceso de Node.js:

```console
sudo vi /etc/nginx/conf.d/travelroad_express.conf
```

> Contenido:

```nginx
server {
    server_name express.kelpy.arkania.es;

    location / {
        proxy_pass http://localhost:3000;  # socket TCP
    }
}
```

Recargamos la configuración de Nginx y accedemos a http://express.kelpy.arkania.es obteniendo el resultado esperado:


### Script de despliegue

Veamos un ejemplo de **script de despliegue** para esta aplicación:

```console
vi deploy.sh
```

> Contenido:

```bash
#!/bin/bash
git add .
git commit -m "Cambios en express mediante deploy"
git push
ssh kelpy@172.205.248.47 "
  cd /usr/share/nginx/dpl_kelpy/ut4/a2/express/travelroad
  git pull
  npm install
  pm2 restart travelroad --update-env
"
```

Damos permisos de ejecución:

```console
chmod +x deploy.sh
```

