import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['verbose'],
  });
  const configService = app.get(ConfigService);

  /** HELMET */
  app.use(helmet());

  /** CORS */
  app.enableCors({
    origin: configService.get('cors.origin'),
    methods: configService.get('cors.methods'),
    credentials: configService.get('cors.credentials'),
  });

  /** PREFIX */
  app.setGlobalPrefix('api');

  /** VERSIONING */
  app.enableVersioning({
    type: VersioningType.URI,
  });

  /** VALIDATION */
  // I can add useGlobal methods if the class within doesn't use dependecy injection
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // removes extra properties from the request body
      forbidNonWhitelisted: true, // returns an errors if there is an extra property
      transform: true, //transform the controllers inputs to class instances or primitives
      transformOptions: {
        enableImplicitConversion: true, // transform the properties according to a class validations
      },
    }),
  );

  // SWAGGER
  const options = new DocumentBuilder()
    .setTitle('Margaritas Api Gateway')
    .setDescription('API Gateway for Margaritas Microservices')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);

  /** PORT */
  await app.listen(configService.get('PORT'));
}
bootstrap();
