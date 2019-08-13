import Mutil from 'util/mm.js';
const _mm = new Mutil();

class Stat {
    getHomeCount() {
        return _mm.request({
            //type: 'post',
            url: '/manage/statistic/base_count.do'
        });
    }
}

export default Stat;
