// @flow

export type
    MatchParams = {
        id: string,
    }

export type
    Match = {
        path: string,
        params: MatchParams,
    }

export type ApplicationStore = {
    routeMatch: Match,
}
