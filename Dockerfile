FROM node:20 as enthost_frontend_base

FROM enthost_frontend_base

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@latest
RUN npm cache clean --force
# 安装依赖
RUN npm install --force
COPY . .

RUN npm run build


EXPOSE 3000

# 运行 Next.js 应用
CMD ["npm", "start"]
