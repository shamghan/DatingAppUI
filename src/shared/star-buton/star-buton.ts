import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-star-buton',
  imports: [],
  templateUrl: './star-buton.html',
  styleUrl: './star-buton.css',
})
export class StarButon {
   disabled  = input<boolean>();
  selected = input<boolean>();
  clickEvent = output<Event>();

  onClick(event:Event)
  {
    this.clickEvent.emit(event);
  }
}
