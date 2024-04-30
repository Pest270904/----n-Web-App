import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { AppService } from './app.service';
import { FuncModule } from './func/func.module';
import { FuncService } from './func/func.service';
import { CheckTokenMiddleware } from './middleware/checkToken.middleware';
import { RoomModule } from './room/room.module';
import { RoomController } from './room/room.controller';
import { AdminModule } from './admin/admin.module';
import { ChatModule } from './chat/chat.module';
import { BookingModule } from './booking/booking.module';
import { BookingController } from './booking/booking.controller';

@Module({
  imports: [
    AuthModule, 
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    FuncModule,
    RoomModule,
    AdminModule,
    ChatModule,
    BookingModule,
  ],
  controllers: [AppController],
  providers: [JwtService, AppService, FuncService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(CheckTokenMiddleware).forRoutes(AppController, RoomController, BookingController)
  }
}