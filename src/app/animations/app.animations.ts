import {trigger, state, style, animate, transition} from '@angular/animations';
export function visibility() {
     return trigger('visibility', [
        state('shown',style({
          transform: 'scale(1.0)',
          opacity:1
        })),
        state('hidden',style({
          transform:'scale(0.5)',
          opacity:0
        })),
        transition('* => *',animate('0.5s ease-in-out'))
      ])
    }
export function flyInOut() {
      return trigger('flyInOut',[
        state('*',style({
            opacity:1,
            transform:'translateY(0)'
        })),
        transition(':enter',[
            style({transform:'translateY(100%)',
        opacity:0
    }),
            animate('500ms ease-in')
        ]),
        transition(':leave',[
            animate('500ms ease-out',style({
                transform: 'translateY(100%)',opacity:0}))
        ])
    ])
}

export function expand() {
    return trigger('expand',[
        state('*',style({
            opacity:1,
            transform:'translateX(0)'
    })),
    transition(':enter',[
        style({transform:'translateY(-50%)',
        opacity:0
    }),
            animate('200ms ease-in', style({
                opacity:1,
                transform:'translateX(0)'
        }))
    ]),
    transition(':leave',[
        style({transform:'translateY(0)',
        opacity:0
    }),
            animate('200ms ease-out', style({
                opacity:1,
                transform:'translateY(-50%)'
        }))
    ])
    ]);
}

export function revolve() {
    return trigger('revolve', [state('hover',style({transform: 'transform: rotateZ(360)'})),transition('*=>*',animate('0.5s'))])
}
export function rhome() {
    return trigger('rhome',[
        state('*',
        style({opacity:1,transform:'translateX(0)'})),
        transition(':enter',[style({transform:'translateX(100%)',opacity:0}),
            animate('400ms ease-in', style({
                opacity:1,
                transform:'translateX(0)'
            }))
        ]),
    transition(':leave',[style({opacity:0}),
    animate('300ms ease-out',style({opacity:1, transform: 'translateX(-100%)'}))
        ])
    ]);
}
export function community() {
    return trigger('community',[
        state('*',
        style({opacity:1,transform:'translateY(0)'})),
        transition(':enter',[style({transform:'translateY(-100%)',opacity:0}),
            animate('800ms ease-in', style({
                opacity:1,
                transform:'translateY(0)'
            }))
        ])
    ]);
}
export function profile() {
    return trigger('profile',[
        state('*',
        style({opacity:1,transform:'translateY(0)'})),
        transition(':enter',[style({transform:'translateY(-200%)',opacity:0}),
            animate('200ms ease-in', style({
                opacity:1,
                transform:'translateY(0)'
            }))
        ])
    ]);
}
export function proPosts() {
    return trigger('proposts',[
        state('*',
        style({opacity:1,transform:'translateX(0)'})),
        transition(':enter',[style({transform:'translateY(200%)',opacity:0}),
            animate('400ms ease-in', style({
                opacity:1,
                transform:'translateY(0)'
            }))
        ])
    ]);
}
export function proLikes() {
    return trigger('prolikes',[
        state('*',
        style({opacity:1,transform:'translateX(0)'})),
        transition(':enter',[style({transform:'translateX(200%)',opacity:0}),
            animate('400ms ease-in', style({
                opacity:1,
                transform:'translateX(0)'
            }))
        ]),
        transition(':leave',[style({opacity:0}),
            animate('400ms ease-out',style({
                opacity:1,
                transform: 'translateX(200%)'
            }))
        ])
    ]);
}