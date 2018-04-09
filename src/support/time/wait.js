/**
 * @method wait
 *
 * @param  {number} [time=1000]
 *
 * @return {Promise}
 */

export default (time = 1000) => new Promise(resolve => setTimeout(resolve, time))
