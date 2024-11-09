import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
//import { RedisModule } from '@liaoliaots/nestjs-redis';
import { UsersModule } from './core/users/users.module';
import { ProductsModule } from './core/products/products.module';
import { ProductionModule } from './core/production/production.module';
import { StockModule } from './core/stock/stock.module';
import { AuthModule } from './auth/auth.module';
import { ControlPanelController } from './control-panel/control-panel.controller';
import { ControlPanelModule } from './control-panel/control-panel.module';
import { SettingsModule } from './settings/settings.module';
import { PrismaModule } from './database/prisma/prisma.module';
import { PrismaService } from './database/prisma/prisma.service';
import { FeatureFlagsService } from './feature-flags/feature-flags.service';
import { PersonsModule } from './core/persons/persons.module';
import { CategoriesModule } from './core/categories/categories.module';
import { GroupsModule } from './core/groups/groups.module';
import { CompositionsModule } from './core/compositions/compositions.module';
import { StockLocationsModule } from './core/stock-locations/stock_locations.module';
import { ImagesModule } from './core/images/images.module';
import { OccurrenceModule } from './core/occurrences/occurrences.module';
import { BatchsModule } from './core/batchs/batchs.module';
import { OrchestratorModule } from './core/orchestrator/orchestrator.module';
import { ZodValidationPipe } from './config/zod.validation.pipe';
import { SessionService } from './core/common/sessionService';
import { RequestMethodPathInterceptor } from './config/interceptor.request';
import { ProductionStepsModule } from './core/production-steps/production-steps.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    OrchestratorModule.forRoot(),
    // RedisModule.forRoot({
    //   config: {
    //     host: process.env.REDIS_HOST,
    //     port: parseInt(process.env.REDIS_PORT, 10)
    //   }
    // }),
    PrismaModule,
    AuthModule,
    BatchsModule,
    CategoriesModule,
    CompositionsModule,
    ControlPanelModule,
    GroupsModule,
    ImagesModule,
    OccurrenceModule,
    PersonsModule,
    ProductsModule,
    ProductionModule,
    SettingsModule,
    StockModule,
    StockLocationsModule,
    UsersModule,
    ProductionStepsModule
  ],
  controllers: [ControlPanelController],
  providers: [
    PrismaService,
    SessionService,
    FeatureFlagsService,
    {
      provide: 'APP_PIPE',
      useClass: ZodValidationPipe
    },
    {
      provide: 'APP_INTERCEPTOR',
      useClass: RequestMethodPathInterceptor
    }
  ]
})
export class AppModule {}
