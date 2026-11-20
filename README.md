Como ocupar el programa:
1.- Instalar el programa comprimido y descomprimirlo en una carpeta o escritorio.
2.-Al momento de descompromir deberas acomodar el proyecto de una forma en especial
|Carpeta principal
  |Carpeta que contiene "api" y "app"
  |proyecto-hotel
Deben ir separados, fue culpa mia al momento de subir el proyecto pero especifico como se tiene que acomodar, si no vas a hacer uso de proyecto-hotel(formulario y como guardar imagenes) ignora la carpeta
3.-Entrar dentro de la carpeta api y app y abrir una terminal en cada una(debes tener las 2 terminales con terminacio /api y /app)
4.-Ejecutar el comando npm install en las 2 terminales
5.-Al finalizar la instalacion ejecutar los siguientes comandos:
  5.1.-Dentro de api(/api):
    npm run start:dev (nota si no tienes las bases de datos instaladas pausar esta parte y leer la parte asignada a las bases de datos)
  5.2.-Dentro de app(/app)
    npx expo start -c
6.- Nota importante, si cambia su conexion a internet con frecuencia sera necesario que cambie la ip de los archivos por lo que debera seguir los siguientes pasos
  6.1.-Acceder desde un editor de codigo a los archivos ubicados de la carpeta app "src/hooks/" 
      -useDataResponse.ts
      -useLogin.ts
      -useTareaApi.ts
      -useUserApi.ts
  Esto con la finalidad de modificar la ip "192.168.100.139" por su ip actual utilizada
7.-.- Utilizar la aplicacion de expo go(version 58) para acceder escaneando el qr(aplicacion desde el telefono disponible en tiendas de aplicaciones, en caso que la descargada oficialmente no sea la version 
requerida dirigirse a https://expo.dev/go e instalar la version solicitada)

Que hago si no tengo datos en la base de datos?
Como tal en cualquier proceso se puede llenar datos desde el uso del aplicativo pero para las graficas o los elementos ubidados en "sensor" es necesario ocupar un comando en especial
1.-Ubicarse dentro de la carpeta api, dentro de peticiones desde una terminal (/api/peticiones)
2.- para confirmar que esta ahi puede utilizar ls(linux o powershell) o dir en cmd(windows) en el cual le debera salir el archivo peticiones.js
3.- Utilizar el comando "node peticiones.js "" " (dentro de las comillas se ingresa el numero de registros que desea guardar, tenga en cuenta que al ejecutar el comando no van las comillas por lo que un ejemplo seria node periciones.js 1000)
Nota: si no tiene la base de datos creada ignore esta parte hasta tener todo instalado 

Que hacer si no tengo las bases de datos instaladas?
1.- El proyecto funciona desde una vision fullstack por lo que es necesario las bases de datos para funcionar, en este mismo se usan 3 base de datos:
-MariaDB
-PostgreSQL
-SQL Server
Haciendo uso de 4 conexciones al mismo tiempo por lo que si tiene un equipo no tan potente no se recomienda intentar hacer funcionar el programa
Nota: tenga en cuenta que al momento de instalar las bases de datos tendra que prenderlas cada vez que se reinicia el equipo para evitar eso buscar el comando que las prende
al iniciar el sistema de aranque del equipo
Como el creador del programa trabaja en fedora se añadiran los comandos para fedora, linux(distribuciones base Debian) y windows, no se asegura el funcionamiento pleno del trabajo fuera de Fedora por lo que tomen las medidas necesarias
Instalacion Linux:
Maria DB
# Fedora
sudo dnf install mariadb-server
sudo systemctl start mariadb
sudo systemctl enable mariadb

# Ubuntu/Debian
sudo apt install mariadb-server
sudo systemctl start mariadb

Crear la DB y el usuario:
sudo mariadb -e "CREATE DATABASE DSM42; CREATE DATABASE hotel_db; CREATE USER 'najimi'@'localhost' IDENTIFIED BY 'pass'; GRANT ALL PRIVILEGES ON DSM42.* TO 'najimi'@'localhost'; GRANT ALL PRIVILEGES ON hotel_db.* TO 'najimi'@'localhost'; FLUSH PRIVILEGES;"

PostgreSQL
# Fedora
sudo dnf install postgresql-server postgresql-contrib
sudo postgresql-setup --initdb
sudo systemctl start postgresql
Crea la BD y el usuario 
sudo -u postgres psql -c "CREATE DATABASE \"DSM42\";"
sudo -u postgres psql -c "CREATE USER najimi WITH PASSWORD 'pass';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE \"DSM42\" TO najimi;"
sudo -u postgres psql -c "GRANT ALL ON SCHEMA public TO najimi;"
# Ubuntu/Debian
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
Crear la BD y el usuario 
sudo -u postgres psql -c "CREATE DATABASE \"DSM42\";"
sudo -u postgres psql -c "CREATE USER najimi WITH PASSWORD 'pass';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE \"DSM42\" TO najimi;"
sudo -u postgres psql -c "GRANT ALL ON SCHEMA public TO najimi;"

SQL server
Linux(docker)
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=P@ndoraxdn1" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2022-latest
docker exec -it <ID_DEL_CONTENEDOR> /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P 'P@ndoraxdn1' -Q "CREATE DATABASE dsm42;"


Windows:
Maria DB
Dirigirse a " mariadb.org/download." y descargar de acuerdo a los requerimientos del equipo
Abrir el aplicativo HeidiSQL y ejecutar:
  CREATE DATABASE DSM42;
  CREATE DATABASE hotel_db;
  CREATE USER 'najimi'@'localhost' IDENTIFIED BY 'pass';
  GRANT ALL PRIVILEGES ON DSM42.* TO 'najimi'@'localhost';
  GRANT ALL PRIVILEGES ON hotel_db.* TO 'najimi'@'localhost';
  FLUSH PRIVILEGES;

PostgreSQL
Dirigirse a "https://www.postgresql.org/download/windows/" e instalar de acuerdo a los requerimientos del equipo
Abrir pgAdmin y ejecutar:
  CREATE DATABASE "DSM42";
  CREATE USER najimi WITH PASSWORD 'pass';
  GRANT ALL PRIVILEGES ON DATABASE "DSM42" TO najimi;

SQL Server
Dirigirse a "https://www.microsoft.com/es-mx/evalcenter/evaluate-sql-server-2025" y buscar descargar una version disponible (Nota: lleva tiempo que no manejo SQL Server lo ultimo que recuerdo es que tenia su version gratuita y de paga, en caso siga asi buscar la opcion comunity)
Este a diferencia de los otros desde el inicio pedira crear un usuaario administrador y una contraseña:
Usuario Administrador: sa
Contraseña: P@ndoraxdn1
Nota Estos parametros pueden cambiar de acuerdo a sus necesidades, solo recuerde modifiar el codigo donde se haga uso de SQL Server para que coincida lo ingresado en la instalacion y lo incluido en el codigo
Instalar SSMS(https://learn.microsoft.com/es-es/ssms/install/install) y vincularlo con la informacion añadida anteriormente(usuario y contraseña)
Ejecutar el comando usando la opcion de "New Query":
CREATE DATABASE dsm42;
