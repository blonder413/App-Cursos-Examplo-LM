# [Fastify](https://docs.nestjs.com/techniques/performance)

Por defecto nest usa [express](https://expressjs.com/) pero podemos cambiarlo a [fastify](https://github.com/fastify/fastify)

```bash
npm i --save @nestjs/platform-fastify
```

Modificar el `main.ts`

```js
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

# [Validation](https://docs.nestjs.com/techniques/validation)

```bash
npm i --save class-validator class-transformer
```

## Aplicar validación a todos los controladores

Agragar la validación al archivo `src/main.ts` con el `useGlobalPipes`

```js
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```

## Aplicar validación a un controlador en específico

```js
import { ValidationPipe } from '@nestjs/common';

@Controller('videos')
@UsePipes(new ValidationPipe())
export class VideosController {}
```

Las validaciones deben crearse en los dto

```js
import { IsNotEmpty, IsUrl, Length } from 'class-validator';

export class CreateVideoDto {
  @IsNotEmpty()
  @Length(1, 50)
  title: string;

  @IsNotEmpty()
  @Length(1, 150)
  description: string;

  @IsUrl()
  src: string;
}
```
