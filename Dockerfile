FROM node:20-alpine

WORKDIR /app 
# Working dir for docker 

COPY package.json .

RUN npm install

COPY . .
# copy from source folder (.) to /app (working dir) (.)

# RUN npm run build

# ENV DATABASE_URL="value"

EXPOSE 3000

#the above commands run when you create the image and the below CMD command runs when you start the image 

# CMD [ "node", "dist/index.js" ]
CMD [ "npm", "run", "start" ]

# on cmd run command
# docker build -t <your_image_name> .
# docker run -p 3000:3000 <your_image_name> 