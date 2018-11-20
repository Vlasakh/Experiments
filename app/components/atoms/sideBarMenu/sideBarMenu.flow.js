// @flow
import type { MatchParams } from 'Stores/ApplicationStore.flow';

export type MenuCallbackParams = MatchParams;
export type MenuCallback = (params: MenuCallbackParams) => string;

export type MenuItem = {
    icon: Object,
    text: string,
    link: string | MenuCallback,
}
