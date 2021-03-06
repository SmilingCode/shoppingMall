import Mutil from 'util/mm.js';

const _mm = new Mutil();

class Order {
    // get return of the search data, or the whole list data
    getOrderList(listParam) {
        let url = '',
            data = {};

        if (listParam.listType === 'list') {
            url = '/manage/order/list.do';
            data.pageNum = listParam.pageNum;
        } else if (listParam.listType === 'search') {
            url = '/manage/order/search.do';
            data.pageNum = listParam.pageNum;
            data.orderNo = listParam.orderNo;
        }

        return _mm.request({
            type: 'post',
            url: url,
            data: data
        });
    }

    getOrderDetial(orderNumber) {
        return _mm.request({
            type: 'post',
            url: '/manage/order/detail.do',
            data: {
                orderNo: orderNumber
            }
        });
    }

    sendGoods(orderNumber) {
        return _mm.request({
            type: 'post',
            url: '/manage/order/send_goods.do',
            data: {
                orderNo: orderNumber
            }
        });
    }
}

export default Order;
