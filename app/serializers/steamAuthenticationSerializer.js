// @flow
import * as _ from 'lodash';

export const serializeOpenId=(query: object): object=>{
    const openIdData={
        id:_.last(query["openid.identity"].split('/')),
        identity:query["openid.identity"],
        sig:query["openid.sig"],
    }
    return openIdData
}