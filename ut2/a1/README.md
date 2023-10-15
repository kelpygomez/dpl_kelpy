
# UT2- Actividad 1: Implantación de arquitecturas web
***Nombre:*** Kelpy Gómez
***Curso:*** 2º de CFGS Desarrollo de Aplicaciones Web.
### ÍNDICE
+ [Introducción](#id1)
+ [Objetivos](#id2)
+ [Material empleado](#id3)
+ [Desarrollo](#id4)
+ [Conclusiones](#id5)

#### ***Introducción***. <a name="id1"></a>
Esta actividad consiste en practicar la manera de implementar una aplicación programada con PHP con herramientas como Nginx y Docker, así como la configuración de los mismos.
#### ***Objetivos***. <a name="id2"></a>
- Implementar una aplicación PHP de calculadora en un entorno servidor.
- Utilizar Nginx como servidor web y conectarlo con la aplicación para poder visualizarla.
- Realizar las configuraciones necesarias para ejecutar Nginx en nuestro ordenador, independientemente del sistema operativo, así como configurar PHP-FPM.
- Hacer uso de un entorno dockerizado e implementar la aplicación.
#### ***Material empleado***. <a name="id3"></a>
- La actividad se ha realizado en un MAC, por lo que el sistema operativo es Linux.
- Docker, Nginx y PHP-FPM
- PHP y CSS
- Máquina virtual Debian.
#### ***Desarrollo***. <a name="id4"></a>

Antes de nada, recalcar que en las capturas aparece el pc13 como primer nombre porque cambiarlo dio demasiados problemas, solo pude cambiar el hostname a a109pc14dpl.

<center> 
  
  ## **ENTORNO NATIVO**
  
</center>

- ### Primero, me conecto a mi máquina virtual utilizando ssh.
</br>
<img src="img/1.png">

- ### Segundo, en la carpeta donde se encuentra Nginx, creamos la carpeta calculator_php y creamos los dos archivos necesarios (php y css).
</br>
<img src="img/2.png">

- ### Después, escribí el código de la aplicación web en php, al que más adelante añadí la imagen de la calculadora.
</br>
<img src="img/3.png">

- ### Y escribí su correspondiente css. 
</br>
<img src="img/4.png">

- ### Pasé la imagen de la calculadora a la máquina virtual para poder añadirla al código php.
</br>
<img src="img/5.png">
<br>
<img src="img/6.png">

- ### Y la moví hasta nuestra carpeta del archivo php.
</br>
<img src="img/7.png">

- ### Aquí empezaron los problemas y es que creí que al haber cambiado únicamente el hostname, la configuración que había por defecto en la máquina virtual de Andrés se mantendría. Error, me esperaban unas horas de cambios.
</br>
<img src="img/8.png">

- ### Cambié el ´location´ en el archivo de configuración de nginx.
</br>
<img src="img/9.png">

- ### Y tras actualizar y resetear el servicio de PHP-FPM hasta su última versión, comprobé que funcionaba abriendo el navegador.
</br> 

<img src="img/10.png">

<center>
  
**ENTORNO DOCKERIZADO**

</center>

- ### He de confesar que en mi desesperación dockericé el archivo antes de conseguir que Nginx funcionase, con lo cual fui descartando causas del problema. Como primer pasó, creé un Dockerfile que se puede ver en la captura.
</br>
<img src="img/11.png">

- ### Después, ‘construí` la imagen y su contenedor. Lo intenté varias veces porque me ponía que el nombre del contenedor ya estaba en uso y supuse que sería porque era la máquina de Andrés, así que lo borré y volví a crearlo después, como puede verse en la imagen.
</br>
<img src="img/12.png">

- ### Y la última comprobación, por suerte sin errores:
</br>
<img src="img/13.png">

#### ***Conclusiones***. <a name="id5"></a>
Nunca se puede uno confiar de las configuraciones predeterminadas. La actividad era sencilla y frustrante a partes iguales. Es súper importante utilizar un entorno propio en el que poder guardar todas las configuraciones.

