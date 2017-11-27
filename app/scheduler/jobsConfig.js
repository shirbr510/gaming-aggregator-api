// @flow

import * as steamWorker from '../workers/SteamWorker';

export const gamesJob = {
    cronTime:"0 0 * * *",
    onTick: steamWorker.runGamesWorker
}