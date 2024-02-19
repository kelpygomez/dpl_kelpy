### Instalación spring
```
curl -O --output-dir /tmp \
https://download.java.net/java/GA/jdk19.0.1/afdd2e245b014143b62ccb916125e3ce/10/GPL/openjdk-19.0.1_linux-x64_bin.tar.gz
```
```
sudo tar -xzvf /tmp/openjdk-19.0.1_linux-x64_bin.tar.gz \
--one-top-level=/usr/lib/jvm
```
Necesitamos cambiar una cosa más para que el jdk funcione correctamente
```
sudo vi /etc/profile.d/jdk_home.sh
```
```
#!/bin/sh
export JAVA_HOME=/usr/lib/jvm/jdk-19.0.1/
export PATH=$JAVA_HOME/bin:$PATH
```
Por otro lado actualizar las alternativas para los ejecutables:
```
sudo update-alternatives --install \
"/usr/bin/java" "java" "/usr/lib/jvm/jdk-19.0.1/bin/java" 0

sudo update-alternatives --install \
"/usr/bin/javac" "javac" "/usr/lib/jvm/jdk-19.0.1/bin/javac" 0

sudo update-alternatives --set java \
/usr/lib/jvm/jdk-19.0.1/bin/java

sudo update-alternatives --set javac \
/usr/lib/jvm/jdk-19.0.1/bin/javac
```
SDKMAN es una herramienta que permite gestionar versiones de kits de desarrollo de software (entre ellos Java).
```
curl -s https://get.sdkman.io | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"
```
Instalar SpringBoot.
```
sdk install springboot

Downloading: springboot 2.7.5
In progress...
########################################## 100,0%

Installing: springboot 2.7.5
Done installing!

Setting springboot 2.7.5 as default.
```
Instalar Maven.
```
sdk install maven

Downloading: maven 3.8.6
In progress...
########################################## 100,0%

Installing: maven 3.8.6
Done installing!

Setting maven 3.8.6 as default.
```
Creación de la estructura del proyecto.
```
spring init \
--build=maven \
--dependencies=web \
--group=edu.dpl \
--name=travelroad \
--description=TravelRoad \
travelroad_spring

Using service at https://start.spring.io
Project extracted to '/home/pc14-dpl/travelroad_spring'
```
Tendremos que adaptar un poco la estructura inicial del proyecto para cumplir con el objetivo de la aplicación que tenemos que desarrollar.
```
mkdir -p src/main/java/edu/dpl/travelroad/controllers
touch src/main/java/edu/dpl/travelroad/controllers/HomeController.java

mkdir -p src/main/java/edu/dpl/travelroad/models
touch src/main/java/edu/dpl/travelroad/models/Place.java

mkdir -p src/main/java/edu/dpl/travelroad/repositories
touch src/main/java/edu/dpl/travelroad/repositories/PlaceRepository.java

touch src/main/resources/templates/home.html
```
Controlador
```
nano src/main/java/edu/dpl/travelroad/controllers/HomeController.java
```
```
package edu.dpl.travelroad.controllers;

import edu.dpl.travelroad.models.Place;
import edu.dpl.travelroad.repositories.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
    private final PlaceRepository placeRepository;

    @Autowired
    public HomeController(PlaceRepository placeRepository) {
        this.placeRepository = placeRepository;
    }

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("wished", placeRepository.findByVisited(false));
        model.addAttribute("visited", placeRepository.findByVisited(true));
        return "home";  // home.html
    }
}
```
Modelos
```
vi src/main/java/edu/dpl/travelroad/models/Place.java
```
```
package edu.dpl.travelroad.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "places")
public class Place {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private Boolean visited;

    public Place() {
    }

    public Place(Long id, String name, Boolean visited) {

        this.id = id;
        this.name = name;
        this.visited = visited;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getVisited() {
        return visited;
    }

    public void setVisited(Boolean visited) {
        this.visited = visited;
    }
}

```
Repositorio
```
vi src/main/java/edu/dpl/travelroad/repositories/PlaceRepository.java
```
```
package edu.dpl.travelroad.repositories;

import edu.dpl.travelroad.models.Place;

import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface PlaceRepository extends CrudRepository<Place, Long> {

    @Query("SELECT p FROM Place p WHERE p.visited = ?1")
    List<Place> findByVisited(Boolean visited);
}
```

#### Plantilla

Para la plantilla vamos a utilizar [Thymeleaf](https://www.thymeleaf.org/) un **motor de plantillas** moderno para Java:

```console
vi src/main/resources/templates/home.html
```

> Contenido:

```java
<!DOCTYPE HTML>
<html>
<head>
    <title>My Travel Bucket List</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>
<body>
    <h1>My Travel Bucket List</h1>
    <a href="/wished">Places I'd Like to Visit</a>
    </br>
    <a href="/visited">Places I've Already Been To</a>
    <p> Powered by spring </p>
</body>
</html>
```

#### Dependencias

Maven es un **gestor de dependencias**. Por tanto debemos definir estas dependencias en un fichero XML:

```console
vi pom.xml
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>2.7.5</version>
		<relativePath/> <!-- lookup parent from repository -->
	</parent>
	<groupId>edu.dpl</groupId>
	<artifactId>travelroad</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<name>travelroad</name>
	<description>TravelRoad</description>
	<properties>
		<java.version>19</java.version>
	</properties>
	<dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
			<scope>test</scope>
		</dependency>

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-thymeleaf</artifactId>
		</dependency>

        <dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-data-jpa</artifactId>
		</dependency>

        <dependency>
          <groupId>org.postgresql</groupId>
          <artifactId>postgresql</artifactId>
          <scope>runtime</scope>
        </dependency>
	</dependencies>

	<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
			</plugin>
		</plugins>
	</build>

</project>
```

Listado de dependencias:

| Dependencia                                                                                                                | Responsabilidad                                          |
| -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| [spring-boot-starter-web](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-web)             | Andamiaje de la aplicación web.                          |
| [spring-boot-starter-test](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-test)           | Andamiaje de tests para la aplicación web.               |
| [spring-boot-starter-thymeleaf](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-thymeleaf) | Motor de plantillas.                                     |
| [spring-boot-starter-data-jpa](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-data-jpa)   | Capa de persistencia Java.                               |
| [postgresql](https://mvnrepository.com/artifact/org.postgresql/postgresql)                                                 | Driver para conectar a bases de datos PostgreSQL (JDBC). |
| [spring-boot-maven-plugin](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-maven-plugin)           | Plugin de Spring Boot para usar Maven.                   |

#### Credenciales

```console
vi src/main/resources/application.properties
```

```ini
spring.datasource.url=jdbc:postgresql://localhost:5432/travelroad
spring.datasource.username=travelroad_user
spring.datasource.password=dpl0000
```

### Proceso de construcción

Para poner en funcionamiento el proyecto necesitamos **dos [fases](https://maven.apache.org/guides/introduction/introduction-to-the-lifecycle.html) que se llevarán a cabo mediante Maven**:

1. Compilación.
2. Empaquetado.

La herramienta que usamos para ello es Maven, pero en el propio andamiaje de la aplicación ya se incluye un [Maven Wrapper](https://maven.apache.org/wrapper/) denominado `mvnw` que incluye todo lo necesario para poder construir el proyecto.

Para llevar a cabo la **compilación** del proyecto ejecutamos lo siguiente:

```console
./mvnw compile
```

Para llevar a cabo el **empaquetado** del proyecto ejecutamos lo siguiente:

```console
./mvnw package
```

Tras esto, obtendremos un archivo [JAR (Java ARchive)](https://es.wikipedia.org/wiki/Java_Archive) en la ruta:

```console
ls target/travelroad-0.0.1-SNAPSHOT.jar
target/travelroad-0.0.1-SNAPSHOT.jar

file target/travelroad-0.0.1-SNAPSHOT.jar
target/travelroad-0.0.1-SNAPSHOT.jar: Java archive data (JAR)
```

> 💡 El fichero generado tiene la versión `0.0.1-SNAPSHOT`. Esto se puede cambiar modificando la etiqueta `<version>` del fichero `pom.xml`.

Una forma de lanzar la aplicación es **correr el fichero JAR generado**:

```console
java -jar target/travelroad-0.0.1-SNAPSHOT.jar
```

Dentro del empaquetado también se incluye [Tomcat](https://tomcat.apache.org/) un **servidor de aplicaciones para Java** que se puede usar perfectamente en producción.

Esto nos permitirá acceder a http://localhost:8080 y comprobar que la aplicación funciona correctamente.

> 💡 Tener en cuenta que la carpeta `target` no debe estar dentro de control de versiones.

### Entorno de producción

De cara a simplificar el proceso de despliegue en el entorno de producción, podemos disponer de un script que realice los pasos del proceso de construcción:

```console
vi run.sh
```

> Contenido:

```bash
#!/bin/bash

cd $(dirname $0)

./mvnw package  # el empaquetado ya incluye la compilación

# ↓ Último fichero JAR generado
JAR=`ls target/*.jar -t | head -1`
/usr/bin/java -jar $JAR
```

Asignamos permisos de ejecución:

```console
chmod +x run.sh
```

A continuación creamos un **fichero de servicio (de usuario)** para gestionarlo mediante **systemd**:

```console
mkdir -p ~/.config/systemd/user
vi ~/.config/systemd/user/travelroad.service
```

> Contenido:

```ini
[Unit]
Description=Spring Boot TravelRoad

[Service]
Type=simple
StandardOutput=journal
ExecStart=/travelroad/run.sh

[Install]
WantedBy=default.target
```

> 💡 Ojo modificar el campo `ExecStart` con la ruta correcta al script de arranque.

**Habilitamos el servicio** para que se arranque automáticamente:

```console
systemctl --user enable travelroad.service
```

**Iniciamos el servicio** para comprobar su funcionamiento:

```console
systemctl --user start travelroad.service
```

### Configuración de Nginx

Lo último que nos queda es configurar el host virtual en Nginx para dar servicio a las peticiones:

```console
sudo vi /etc/nginx/conf.d/travelroad_spring.conf
```

> Contenido:

```nginx
server {
    server_name spring.kelpy.arkania.es;

    location / {
        proxy_pass http://localhost:8080;  # socket TCP
    }
}
```

**Recargamos la configuración** del servidor web para que los cambios surtan efecto:

```console
sudo systemctl reload nginx
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
git commit -m "Se realizan cambios mediante deploy.sh de Spring"
git push
ssh kelpy@172.205.248.47"
  cd /usr/share/nginx/dpl_kelpy
  git pull
  cd ut4/a2/spring/travelroad_spring
  git pull
  systemctl --user restart travelroad.service
"
```

Finalizamos dando permisos de ejecución:

```console
chmod +x deploy.sh
```

> 💡 `deploy.sh` es un fichero que se incluye en el control de versiones.
