import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';


import { MinesweeperComponent } from './minesweeper.component';
import { MinesweeperService } from './minesweeper.Service';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'minesweeper', component: MinesweeperComponent }
    ])
  ],
  declarations: [
    MinesweeperComponent
  ],
  providers: [
    MinesweeperService
  ]
})
export class MinesweeperModule {}