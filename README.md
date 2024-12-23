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

# [Swagger](https://docs.nestjs.com/openapi/introduction)

```bash
npm install --save @nestjs/swagger swagger-ui-express
npm install --save @nestjs/swagger fastify-swagger
```

Modificar el `main.ts`

```ts
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```

# [Configuration](https://docs.nestjs.com/techniques/configuration)

Permite acceder a las variables de entorno

```bash
npm i --save @nestjs/config
```

Agregar la importación de `ConfigModule` en `/src/app.modules.ts`

```js
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

Una vez creado el archivo `.env` en la raiz del proyecto podemos acceder a aquellas que tengamos definidas

```js
console.log('__ENV__', process.env.PORT);
```

Es posible que algunos módulos no estén importados en `app.module.ts` por lo que podría no tener acceso a las variables de entorno.
Para corregir esto podemos configurar la lectura de forma global.

```js
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

# [CORS](https://docs.nestjs.com/security/cors)

Podemos llamar al método `enableCors()` para permitirlos en el archivo `/src/app.module.ts`

```js
const app = await NestFactory.create(AppModule);
app.enableCors();
await app.listen(process.env.PORT ?? 3000);
```

También podemos llamarlo directamente en la creación del objeto

```js
const app = await NestFactory.create(AppModule, { cors: true });
await app.listen(process.env.PORT ?? 3000);
```

# Limitar tamaño de una petición post

Cuando enviamos un formulario vía post existe un límite en mb, esto puede ocasionar problemas por ejemplo al cargar archivos.
Podemos solucionar esto agregando una configuración simple en `/src/main.ts`

```js
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(json({ limit: '60mb' }));
}
```

# Definir versión

En el archivo `/src/main.ts` podemos definiar la versión de nuestra api

```js
import { VersioningType } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });
}
```

# [Serve Static](https://docs.nestjs.com/recipes/serve-static)

Permite mostrar contenido estático. Nos puede evitar que servicios como AWS den error al no encontrar la ruta /

```bash
npm install --save @nestjs/serve-static
```

# [Pipes](https://docs.nestjs.com/pipes)

Son usados para 2 motivos:

1. transformar (por ejemplo de string a int)
2. validar si los datos son válidos y mostrar excepciones en caso de que no
