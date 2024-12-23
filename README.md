# [Fastify](https://docs.nestjs.com/techniques/performance)
Por defecto nest usa [express](https://expressjs.com/) pero podemos cambiarlo a [fastify](https://github.com/fastify/fastify)
```bash
npm i --save @nestjs/platform-fastify
```

Modificar el `main.ts`
```bash
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```

# Módulos
```bash
nest generate module Test
nest g mo Test
```
# Recursos
```bash
nest generate resource courses
nest g res courses
```