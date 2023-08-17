import {animate, style} from "@angular/animations";

export const NOTEGRID = {
  show: [
    style({opacity: 0}),
    animate('400ms ease-in', style({opacity: 1})),
  ],
  hide: [
    style({opacity: '*'}),
    animate('400ms ease-in', style({opacity: 0})),
  ]
}

