เข้าไป Path ที่ต้องการรันโปรเจค
สิ่งที่ต้องมีใน Server 
1. nodejs
2. pm2
3. git

ขั้นตอนการติดตั้ง
1. เข้าไป Path ที่ต้องการรันโปรเจค
2. git clone https://github.com/devoarm/drug-lab-api.git
3. cd drug-lab-api
4. นำไฟล์ .env ไปวาง
5. npm run build
6. pm2 start ./dist/src/index.js --name drug-lab-api
7. ตรวจสอบการสถานะการทำงาน pm2 list


ไฟล์ .env
NODE_ENV=deploy

SECRET_KEY=34ebd40861774db7d8bfb012e84f27018508b609b03aa18a2942b7700da876bc
PORT=700

#HosXp DB
hostHosXp=
portHosXp=
userHosXp=
passwordHosXp=
databaseHosXp=

