import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { StorageModule } from 'src/storage/storage.module';
import { ProjectsUpdatesService } from './services/projects-updates.service';

@Module({
  imports: [StorageModule],
  controllers: [ProjectsController],
  providers: [ProjectsService, ProjectsUpdatesService],
})
export class ProjectsModule {}
