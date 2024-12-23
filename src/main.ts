import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
/** import { ValidationPipe } from '@nestjs/common'; */
/**import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';*/

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const app = await NestFactory.create<NestFastifyApplication>(
  //   AppModule,
  //   new FastifyAdapter(),
  // );
  // app.useGlobalPipes(new ValidationPipe())

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
