import { Routes } from '@angular/router';
import { Home } from '../features/home/home';
import { MemberList } from '../features/members/member-list/member-list';
import { MemberDetailed } from '../features/members/member-detailed/member-detailed';
import { Messages } from '../features/messages/messages';
import { Lists } from '../features/lists/lists';
import { authGuard } from '../core/guards/auth-guard';
import { TestErrors } from '../features/test-errors/test-errors';
import { NotFound } from '../shared/errors/not-found/not-found';
import { ServerError } from '../shared/errors/server-error/server-error';

export const routes: Routes = [
    { path: '', component: Home },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [

            { path: 'members', component: MemberList},
            { path: 'member/:id', component: MemberDetailed},
            { path: 'lists', component: Lists},
            { path: 'messages', component: Messages},
        ]

    },
    //use below code for guarding route or above 
    // { path: 'members', component: MemberList, canActivate: [authGuard] }, 
    // { path: 'member/:id', component: MemberDetailed, canActivate: [authGuard] },
    // { path: 'lists', component: Lists, canActivate: [authGuard] },
    // { path: 'messages', component: Messages, canActivate: [authGuard] },
    {path:'exception', component:TestErrors},
    {path:'not-found', component: NotFound},
    {path:'server-error', component: ServerError},
    { path: '**', component: NotFound }//route that does not exists then open this page

];
