## <span style="color:lightblue">Despliegue de una aplicación web usando NGINX y SMALL LIGHT</span>

### 2º de CFGS Desarrollo de Aplicaciones Web | KELPY GÓMEZ

### ÍNDICE

+ [Enunciado](#1)
+ [Pasos a seguir](#2)
+ [Modelo de aplicación](#3)
+ [Dockerización](#4)
+ [Pasos seguidos](#5)

### Enunciado <a id="1"></a>
El objetivo de esta tarea es desplegar una aplicación web escrita en HTML/Javascript que permita hacer uso del módulo de Nginx ngx_small_light.

Este módulo sirve para generar "miniaturas" de imágenes on the fly además de otros posibles procesamientos a través de peticiones URL.

### Pasos a seguir <a id="2"></a>

1. Instalar el módulo ngx_small_light y cargarlo dinámicamente en Nginx. <br>
2. Crear un virtual host específico que atienda peticiones en el dominio images.nombrealumno.me (server_name). <br>
3. Habilitar el módulo ngx_small_light en el virtual host sólo para el location /img. <br>
4. Subir las imágenes de images.zip (el archivo de adjunta a la tarea ) a una carpeta img dentro de la carpeta de trabajo elegida. <br>
5. Crear una aplicación web que permita el tratamiento de dichas imágenes. <br>
6. Incorporar certificado de seguridad (mostrar el certificado 🔒). <br>
7. Redirigir el subdominio www al dominio base (incluyendo ssl). <br>

### Modelo de aplicación <a id="3"></a>
La aplicación debe contener un formulario web con los siguientes campos de texto:

- Tamaño de la imagen → En píxeles (corresponde al "lado": son imágenes cuadradas)
- Ancho del borde → En píxeles
- Color del borde → Formato hexadecimal
- Enfoque → Formato <'radius'>x<'sigma'>
- Desenfoque → Formato <'radius'>x<'sigma'> <br>
<br>
Al pulsar el botón de "Generar" se tendrán que mostrar todas las imágenes cambiando la URL del atributo src de cada imagen <'img'> para contemplar los parámetros establecidos en el formulario.
![Ejemplo](ejemplo.jpg)

### Dockerización <a id="4"></a>
El siguiente paso sería dockerizar nuestra app.

- Primero, creamos una carpeta que contendrá los documentos tanto del proyecto como de configuraciones con Docker.
```
mkdir docker_project
cd docker_project
```

- Después, creamos los documentos Dockerfile, default.conf y docker-compose.yml y añadimos los ajustes:
```
sudo nano Dockerfile
. . .

sudo nano default.conf
. . .

sudo nano docker-compose.yml
. . .
```
- Salimos de la carpeta usando cd y entramos en la configuración de nginx para copiarla
```
cd
sudo nano /etc/nginx/nginx.conf
```
- Entramos en docker_project de nuevo y pegamos el mismo documento. 
```
cd docker_project
sudo nano nginx.conf
. . .
```
- Finalmente, creamos la carpeta src donde pegaremos todos los archivos del proyecto (css, html, js e imágenes) y levantaremos la página para comprobar que funciona.
```
sudo mkdir src
cd src
cp -r /usr/share/nginx/project/* . 
docker compose up
```

### Pasos seguidos <a id="5"></a>

- En primer lugar, nos conectamos a la máquina por medio de ssh:
```
ssh pc14-dpl@192.168.1.135 

The authenticity of host '192.168.1.135 (192.168.1.135)' can't be established.
ED25519 key fingerprint is SHA256:5t5rAI/c8lKJ2804+w86qQKWW1Zl0lYSXQOeaQ+99rM.
This host key is known by the following other names/addresses:
    ~/.ssh/known_hosts:4: [hashed name]
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '192.168.1.135' (ED25519) to the list of known hosts.
Linux a109pc14dpl 6.1.0-12-amd64 #1 SMP PREEMPT_DYNAMIC Debian 6.1.52-1 (2023-09-07) x86_64
```
***Nos pedirá una contraseña tras escribir 'yes'***

- Después, realizamos la instalación de Small Lights:
```
sudo apt install -y build-essential imagemagick libpcre3 libpcre3-dev
libmagickwand-dev
```
``` 
git clone https://github.com/cubicdaiya/ngx_small_light.git
```
```
./setup
```

- Movemos la carpeta del módulo a la carpeta donde tenemos Nginx:
```
mv ngx_small_light/ /tmp/
```

- Entramos a la carpeta tmp y comprobamos si tenemos el código fuente de Nginx. En caso negativo, lo descargamos.
```
curl -sL https://nginx.org/download/nginx-$(/sbin/nginx -v \
|& cut -d '/' -f2).tar.gz | tar xvz -C /tmp
```

- Ingresamos en la <b style="color:coral;">carpeta del código fuente</b>, que acaba de generarse tras la instalación, y realizamos la configuración de la compilación:
```
cd nginx-1.24.0
```
```
./configure --add-dynamic-module=../ngx_small_light --with-compat
```

- Ahora generamos la librería dinámica:
```
make modules
```

- Este proceso habrá creado un fichero <b style="color:coral;">.so </b>dentro de la carpeta objs. Lo copiaremos a la carpeta desde la que se cargan los módulos dinámicos de Nginx creando la carpeta <b style="color:coral;">modules</b>:
```
sudo mkdir -p /etc/nginx/modules
```
```
sudo cp /tmp/nginx-1.24.0/objs/ngx_http_small_light_module.so /etc/nginx/modules
```

- Modificamos el fichero de configuración de Nginx para que el módulo se cargue correctamente:
```
sudo nano /etc/nginx/nginx.conf
user  nginx;
worker_processes  auto;

error_log  /var/log/nginx/error.log notice;
pid        /var/run/nginx.pid;


load_module /etc/nginx/modules/ngx_http_fancyindex_module.so;
load_module /etc/nginx/modules/ngx_http_small_light_module.so

events {
    worker_connections  1024;
}
```

- Añadimos las directivas del módulo a la configuración <b style="color:coral;">'project.conf'</b>:
```
sudo nano /etc/nginx/conf.d/project.conf
server {

        root /usr/share/nginx/project;
        server_name images.alu14.me;
        index index.html;      

        location /images {
                small_light on;
                small_light_getparam_mode on;
        }
}
```

- Recargamos el servicio de Nginx:
```
sudo systemctl reload nginx
```

- Finalmente, creamos la estructura de carpetas y hacemos el HTML, los estilos CSS y el archivo JS, además de añadir las imágenes que aparecerán en la página:
```
├── css
│   └── style.css
├── images
│   ├── image01.jpg
│   ├── image02.jpg
│   ├── image03.jpg
│   ├── image04.jpg
│   ├── image05.jpg
│   ├── image06.jpg
│   ├── image07.jpg
│   ├── image08.jpg
│   ├── image09.jpg
│   ├── image10.jpg
│   ├── image11.jpg
│   ├── image12.jpg
│   ├── image13.jpg
│   ├── image14.jpg
│   ├── image15.jpg
│   ├── image16.jpg
│   ├── image17.jpg
│   ├── image18.jpg
│   ├── image19.jpg
│   └── image20.jpg
├── index.html
└── js
    └── script.js

4 directories, 23 files
```