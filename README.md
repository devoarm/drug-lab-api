เข้าไป Path ที่ต้องการรันโปรเจค
สิ่งที่ต้องมีใน Server 
1. nodejs
2. pm2

ขั้นตอนการติดตั้ง
1. git clone https://github.com/devoarm/drug-lab-api.git
2. cd drug-lab-api
3. npm run build
4. pm2 start ./dist/src/index.js --name drug-lab-api
5. ตรวจสอบการสถานะการทำงาน pm2 list