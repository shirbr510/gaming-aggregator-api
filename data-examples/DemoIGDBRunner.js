// @flow
import PlatformService from '../IGDBPlatformService';
import * as IGDBPlatformMapper from '../../mappers/IGDBPlatformToGameFragment'
import fs from 'fs';
import * as _ from 'lodash'

const platformService = new PlatformService();

const promises=[];
const page=8;
platformService.getPlatforms(page,null,"id,name,games","games").then(results=>{
  const gamesArrays=_.map(results,IGDBPlatformMapper.applyPlatformToGames)
  const enhancedResults = IGDBPlatformMapper.mergePlatformGames(gamesArrays);
  fs.writeFile(`./testresult${page}.txt`,JSON.stringify(enhancedResults));
})