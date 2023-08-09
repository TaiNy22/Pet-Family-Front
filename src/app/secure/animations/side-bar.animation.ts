import {animate, animation, style, transition, trigger} from "@angular/animations";

export const TOGGLESIDEBAR =
  trigger('toggleSideBar', [
    transition(':enter', [
      style({
        transform: 'translateX(-120%)'
      }),
      animate('500ms ease',
        style({transform: 'translateX(0)'}))
    ]),
    transition(':leave', [
      style({transform: 'translateX(0)'}),
      animate('500ms ease',
        style({transform: 'translateX(-120%)'}))
    ])
  ]);
