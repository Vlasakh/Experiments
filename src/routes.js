// @flow
/**
 * @deprecated
 */
import PageSetsList from '../app/containers/PageSetsList.jsx';
import PageSet from '../app/containers/PageSet.jsx';
import TestDrawer from '../app/components/organisms/set/Set.jsx';

type
    RouteItem = {
        id: string,
        path: string,
        component: mixed,
        exact?: boolean,
    }

const routes: RouteItem[] = [
    {
        id: 'setitem',
        path: '/sets/:id',
        component: PageSet,
    },
    {
        id: '/test',
        path: '/test',
        component: TestDrawer,
    },
    {
        id: 'root',
        path: '/',
        component: PageSetsList,
    },
];

export default routes;
