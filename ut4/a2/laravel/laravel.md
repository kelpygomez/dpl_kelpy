## Laravel (PHP)

[Laravel](https://laravel.com/) es un **framework de código abierto** para desarrollar aplicaciones y servicios web con **PHP**.

### Instalación

#### Composer

Lo primero que necesitamos es un **gestor de dependencias para PHP**. Vamos a instalar [Composer](https://getcomposer.org/):

```console
curl -fsSL https://raw.githubusercontent.com/composer/getcomposer.org/main/web/installer \
| php -- --quiet | sudo mv composer.phar /usr/local/bin/composer
```

Comprobamos la versión instalada:

```console
composer --version
Composer version 2.4.4 2022-10-27 14:39:29
```

#### Paquetes de soporte

Necesitamos **ciertos módulos PHP** habilitados en el sistema. Para ello instalamos los siguientes paquetes soporte:

```console
sudo apt install -y php8.2-mbstring php8.2-xml \
php8.2-bcmath php8.2-curl php8.2-pgsql
```

| Paquete                                                     | Descripción                                     |
| ----------------------------------------------------------- | ----------------------------------------------- |
| [mbstring](https://www.php.net/manual/es/book.mbstring.php) | Gestión de cadenas de caracteres multibyte      |
| [xml](https://www.php.net/manual/es/book.xml.php)           | Análisis XML                                    |
| [bcmath](https://www.php.net/manual/en/book.bc.php)         | Operaciones matemáticas de precisión arbitraria |
| [curl](https://www.php.net/manual/es/book.curl.php)         | Cliente de cURL                                 |
| [pgsql](https://www.php.net/manual/es/book.pgsql.php)       | Herramientas para PostgreSQL                    |

#### Aplicación

Ahora ya podemos **crear la estructura** de nuestra aplicación Laravel. Para ello utilizamos `composer` indicando el paquete [laravel/laravel](https://packagist.org/packages/laravel/laravel) junto al nombre de la aplicación:

```console
composer create-project laravel/laravel travelroad
```
Por defecto se ha creado un **fichero de configuración** `.env` durante el andamiaje. Abrimos este fichero y **modificamos ciertos valores** para especificar credenciales de acceso:

```console
vi .env
```

```ini
...
APP_NAME=TravelRoad
APP_ENV=development
...
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=travelroad
DB_USERNAME=travelroad_user
DB_PASSWORD=dpl0000
...
```

### Configuración Nginx

Lo primero será fijar los **permisos adecuados a los ficheros del proyecto** para que los servicios Nginx+PHP-FPM puedan trabajar sin errores de acceso.

Existen un par de carpetas en las que se puede almacenar información. Ajustamos los permisos:

```console
sudo chgrp -R nginx storage bootstrap/cache
sudo chmod -R ug+rwx storage bootstrap/cache
```

La **configuración del _virtual host_ Nginx** para nuestra aplicación Laravel la vamos a hacer en un fichero específico:

```console
sudo vi /etc/nginx/conf.d/travelroad.conf
```

> Contenido:

```nginx
server {
    server_name laravel.kelpy.arkania.es;
    root /usr/share/nginx/dpl_kelpy/ut4/a2/laravel/travelroad/public;

    index index.html index.htm index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```

> 💡 Recordar añadir `travelroad` al fichero `/etc/hosts` en caso de estar trabajando en local.

**Comprobamos la sintaxis** del fichero y, si todo ha ido bien, **recargamos la configuración** Nginx:

```console
sudo nginx -t
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful

sudo systemctl reload nginx
```


### Lógica de negocio

Nos queda modificar el comportamiento de la aplicación para cargar los datos y mostrarlos en una plantilla.

Lo primero es **cambiar el código de la ruta**:

```console
vi routes/web.php
```

```php
<?php

// https://laravel.com/api/6.x/Illuminate/Support/Facades/DB.html
use Illuminate\Support\Facades\DB;

Route::get('/', function () {
  $wished = DB::select('select * from places where visited = false');
  $visited = DB::select('select * from places where visited = true');

  return view('travelroad', ['wished' => $wished, 'visited' => $visited]);
});

Route::get('/wished', function () {
  $wished = DB::select('select * from places where visited = false');

  return view('travelroad_wished', ['wished' => $wished]);
});

Route::get('/visited', function () {
  $visited = DB::select('select * from places where visited = true');

  return view('travelroad_visited', ['visited' => $visited]);
});
```

Lo segundo es **escribir la plantilla** que renderiza los datos. **Renderizar una plantilla** significa sustituir las variables por sus valores y así obtener un HTML final. Utilizaremos [Blade](https://laravel.com/docs/9.x/blade) como **motor de plantillas** incluido en Laravel.

```console
vi resources/views/travelroad.blade.php
```
```html
<html>
  <head>
    <title>Travel Road</title>
  </head>

  <body>
    <h1>My Travel Bucket List</h1>
    <a href="visited">Places I'd Like to Visit</a>
	</br>
    <a href="wished">Places I've already Been To</a>
    <p>Powered by <b> Laravel! </b>
  </body>
</html>
```

### Producción

Hay que tener en cuenta un detalle. La carpeta `vendor` está fuera de control de versiones por una entrada que se crea automáticamente un el fichero `.gitignore` del "scaffolding" que realiza Laravel:

```console
grep vendor .gitignore
/vendor
```

Esta carpeta contiene todas las dependencias del proyecto. Por lo tanto, **cuando hagamos el despliegue en producción**, debemos ejecutar el siguiente comando para crear esta carpeta e instalar todas las dependencias necesarias:

```console
composer install
Installing dependencies from lock file (including require-dev)
Verifying lock file contents can be installed on current platform.
Nothing to install, update or remove
Generating optimized autoload files
> Illuminate\Foundation\ComposerScripts::postAutoloadDump
> @php artisan package:discover --ansi

   INFO  Discovering packages.

  laravel/sail .............................................................................. DONE
  laravel/sanctum ........................................................................... DONE
  laravel/tinker ............................................................................ DONE
  nesbot/carbon ............................................................................. DONE
  nunomaduro/collision ...................................................................... DONE
  nunomaduro/termwind ....................................................................... DONE
  spatie/laravel-ignition ................................................................... DONE

81 packages you are using are looking for funding.
Use the `composer fund` command to find out more!
```

### Script de despliegue

Veamos un ejemplo de **script de despliegue** para esta aplicación:

```console
vi deploy.sh
```

> Contenido:

```bash
#!/bin/bash
git add .
git commit -m "Se realizan cambios mediante deploy.sh de Laravel"
git push
ssh kelpy@172.205.248.47 "
  cd /usr/share/nginx/dpl_kelpy
  git pull
  cd ut4/a2/laravel/travelroad
  composer install
  sudo systemctl reload nginx
"
```

Damos permisos de ejecución:

```console
chmod +x deploy.sh
```

> 💡 `deploy.sh` es un fichero que se incluye en el control de versiones.