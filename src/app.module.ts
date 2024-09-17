import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './core/users/users.module';
import { ProductsModule } from './core/products/products.module';
import { ProductionModule } from './core/production/production.module';
import { StokModule } from './core/stok/stok.module';
import { AuthModule } from './auth/auth.module';
import { ControlPanelController } from './control-panel/control-panel.controller';
import { ControlPanelModule } from './control-panel/control-panel.module';
import { Config } from './config/config.module';
import { PrismaModule } from './database/prisma/prisma.module';
import { PrismaService } from './database/prisma/prisma.service';
import { FeatureFlagsService } from './feature-flags/feature-flags.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    ProductsModule,
    ProductionModule,
    StokModule,
    AuthModule,
    ControlPanelModule,
    Config,
    PrismaModule
  ],
  controllers: [ControlPanelController],
  providers: [PrismaService, FeatureFlagsService]
})
export class AppModule {}
