import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TasksModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    MongooseModule.forRoot(
      `mongodb+srv://antony_juarez:HYGp1VvqOzr7x34p@cluster1.3sqgfon.mongodb.net/?retryWrites=true&w=majority`
      ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
