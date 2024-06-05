FROM node:20

WORKDIR /app

COPY . .

EXPOSE 5173
EXPOSE 3000

CMD [ "tail", "-f", "/dev/null"]