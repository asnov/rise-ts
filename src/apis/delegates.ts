import { cback, rs } from '../types/base';
import { Delegate, Transaction } from '../types/responses';
import { Delegates } from '../types/apis/Delegates';
/**
 * @private
 * @internal
 */
export const delegates = (rs: rs): Delegates => ({

  enable(data: { secret: string, secondSecret?: string, username: string }, callback?: cback<Transaction<{ delegate: { username: string, publicKey: string } }>>) {
    return rs(
      {
        path: '/delegates',
        method: 'PUT',
        data
      },
      callback
    );
  },

  getList(query: { limit?: number, offset?: number, orderBy?: string } = {}, callback?: cback<{ delegates: Delegate[], totalCount: number }>) {
    return rs(
      {
        path: `/delegates`,
        params: query
      },
      callback
    )
  },

  getByUsername(username: string, callback?: cback<{ delegate: Delegate }>) {
    return this.getByKeyVal('username', username, callback);
  },

  getByPublicKey(publicKey: string, callback?: cback<{ delegate: Delegate }>) {
    return this.getByKeyVal('publicKey', publicKey, callback);
  },

  getByKeyVal(key: keyof Delegate, value: string, callback?: cback<{ delegate: Delegate }>) {
    const query = {};
    query[key] = value;
    return rs(
      {
        path: `/delegates/get`,
        params: query
      },
      callback
    );
  },

  getVoters(publicKey: string, callback?: cback<{ accounts: Account[] }>) {
    return rs(
      {
        path: `/delegates/voters`,
        params: {
          publicKey: publicKey
        }
      },
      callback
    );
  },

  toggleForging(obj: { secret: string, enable: boolean }, callback?: cback<{ address: string }>) {
    return rs(
      {
        path: `/delegates/forging/${obj.enable ? 'enable' : 'disable'}`,
        data: {
          secret: obj.secret
        },
        method: 'POST'
      },
      callback
    )
  },

  getForgedByAccount(publicKey: string, callback?: cback<{ fees: string, rewards: string, forged: string }>) {
    return rs(
      {
        path: `/delegates/forging/getForgedByAccount`,
        params: {
          generatorPublicKey: publicKey
        }
      },
      callback
    )
  }
});