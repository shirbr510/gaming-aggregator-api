//@flow
import * as _ from 'lodash'

export const applyPlatformToGames=(platform)=>{
    return _.map(platform.games,game=>{
        return Object.assign({},game,{platforms:[platform.name]})
    })
}

export const mergePlatformGames=(gamesArrays)=>{
    const games=_.flatten(gamesArrays)
    const groups=_.groupBy(games,game=>game.id);
    return _.map(Object.keys(groups),key=>{
        const gamesGroup=groups[key];
        return _.reduce(gamesGroup,(accumalator,game)=>{
            if(_.isEmpty(accumalator)){
                return Object.assign({},game);
            }
            accumalator.platforms=_.union(accumalator.platforms,game.platforms)
            return accumalator
        },{})
    })
}