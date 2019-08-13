class MUtil {
    request(param) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: param.type || 'get',
                url: param.url || '',
                dataType: param.dataType || 'json',
                data: param.data || null,
                success: (res) => {
                    //console.log(res)
                    if (res.status === 0) {
                        resolve(res.data, res.msg);
                    } else if(res.status === 10) {
                        this.doLogin();
                    } else {
                        reject(res.data, res.msg);
                    }
                },
                error: (err) => {
                    //console.log(err)
                    resolve(err.statusText);
                }
            });
        });
    }

    doLogin() {
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
    }
    // get the page path before user login
    getUrlParam(name) {
        // xxx.com?param1=123&param2=456
        let queryString = window.location.search.split('?')[1] || '';
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let result = queryString.match(reg);

        return result ? decodeURIComponent(result[2]) : null;
    }
    // error message
    errorInfo(errMsg) {
        alert(errMsg || 'something went wrong');
    }
    // set local storage
    setStorage(key, value) {
        let dataType = typeof value;
        // json
        if (dataType === 'object') {
            window.localStorage.setItem(key, JSON.stringify(value));
        } else if (['number', 'string', 'boolean'].indexOf(dataType)) {
            window.localStorage.setItem(key, value);
        } else {
            alert('this is a type which is not elligible to store!');
        }

    }
    // get local storage
    getStorage(key) {
        let val = window.localStorage.getItem(key);
        if (val) {
            return JSON.parse(val);
        } else {
            return '';
        }
    }
    // delete local storage
    removeStorage(key) {
        window.localStorage.removeItem(key);
    }
}

export default MUtil;
