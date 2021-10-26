# Atelier (backend case study)
> Inheriting a legacy frontend retail web portal, the goal of this project is to replace the existing API with a back end system that can support the full dataset for the project and can scale to meet the new demands of increased production traffic. Data was given as raw CSV files and the ETL process was followed to clean, reshape and parse to dataset to fit into an optimized schema design. A relational database was chosen against a non-relational database as the given data adhered to a table format more seamlessly.
>
> The service is deployed on AWS via dockerized containers and connected to a reverse proxy server utilizing a sticky ip load balancing technique along with caching.

# Set up instructions
1. Build docker images with the provided dockerfiles for the server and the database. Deploy three instances on AWS, one for the NGINX server, Application and Database.
2. Deploy and run the docker database image as interactive and use the following commands to load the database from the compressed backup file and start the database server.
```
docker run -itp 5432:5432 [repo/name]
su postgres -
pg_ctl start -D /var/lib/postgresql/data
gunzip -c sdc_backup.gz | psql sdc
npm run start
```
3. Exit interactive mode using `ctrl+p` then `ctrl+q`, run `docker ps` to confirm container is still running in background.
4. Deploy and run the docker image for the server using the following commands and start the server using pm2.
```
docker run -itp 3000:3000 [repo/name]
npm run start
```
5. Exit interactive mode using `ctrl+p` then `ctrl+q`, run `docker ps` to confirm container is still running in background.
6. Use the `nginx.example.conf` to update the configuration files on the Nginx proxy server and connect the instances in the files.

# Stack
<div>
  <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white" />
  <img src="https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white" />
  <img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white" />
</div>