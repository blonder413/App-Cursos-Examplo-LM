import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'express';
/** import { ValidationPipe } from '@nestjs/common'; */
/**import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';*/

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // const app = await NestFactory.create<NestFastifyApplication>(
  //   AppModule,
  //   new FastifyAdapter(),
  // );
  // app.useGlobalPipes(new ValidationPipe())

  // definir el límite en MB de una petición post
  app.use(json({ limit: '60mb' }));

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('API de NestJS Curso')
    .setDescription('Esta es la API del curso de Nestjs de codigoencasa.com')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, documentFactory);

  console.log('__ENV__', process.env.PORT);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
