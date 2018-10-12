import { NgModule } from '@angular/core';
import { NavigateDirective } from '../directives/navigate/navigate.directive';
import { LetterPipe } from '../pipes/letter.pipe';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { GroupByPipe } from '../pipes/groupby.pipe';
@NgModule({
	declarations: [NavigateDirective, LetterPipe, TruncatePipe, GroupByPipe],
	imports: [],
	exports: [NavigateDirective, LetterPipe, TruncatePipe, GroupByPipe],
})
export class SharedModule {}
