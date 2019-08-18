import Mutil from 'util/mm.js';
const _mm = new Mutil();

class Stat {
    // get stats for Home page
    getHomeCount() {
        return _mm.request({
            //type: 'post',
            url: '/manage/statistic/base_count.do'
        });
    }
}

export default Stat;
