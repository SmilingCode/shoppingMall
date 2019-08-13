import Mutil from 'util/mm.js';

const _mm = new Mutil();

class User {
    login(data) {
        return _mm.request({
            type: 'post',
            url: '/manage/user/login.do',
            data: data
        });
    }

    loginValidation(loginInfo) {
        //let username = $.trim();
        if (loginInfo.username.length === 0) {
            return {
                status: false,
                msg: 'username is null!'
            }
        }

        if (loginInfo.password.length === 0) {
            return {
                status: false,
                msg: 'password is null!'
            }
        }

        return {
            status: true,
            msg: 'validation passed!'
        }
    }

    logOut() {
        return _mm.request({
            type: 'post',
            url: '/user/logout.do'
        })
    }

    getUserList(pageNum) {
        return _mm.request({
            type: 'post',
            url: '/manage/user/list.do',
            data: {
                pageNum: pageNum
            }
        })
    }
}

export default User;
