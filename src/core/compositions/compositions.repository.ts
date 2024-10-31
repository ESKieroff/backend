import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
@Injectable()
export class CompositionsRepository {
  constructor(private prisma: PrismaService) {}
}
