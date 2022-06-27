import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => {
    console.log('\x1b[36m%s\x1b[0m', `Application started on port: ${ PORT }`);
    console.log('\x1b[36m%s\x1b[0m', `GraphQL started on http://localhost:${ PORT }/graphql`);
  });
}
bootstrap();
