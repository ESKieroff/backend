import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
// import { CompositionsModule } from './core/compositions/compositions.module';
import { StockLocationsModule } from './core/stock-locations/stock_locations.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    ProductsModule,
    ProductionModule,
    StockModule,
    AuthModule,
    ControlPanelModule,
    SettingsModule,
    PrismaModule,
    StockLocationsModule,
    PrismaModule,
    GroupsModule,
    PersonsModule,
    CategoriesModule
    // CompositionsModule
  ],
  controllers: [ControlPanelController],
  providers: [PrismaService, FeatureFlagsService]
})
export class AppModule {}
