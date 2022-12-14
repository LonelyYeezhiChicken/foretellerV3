


/**
 * Set api data
 */
function getApiData() {
    return {
        UserName: document.getElementById("username_login").value,
        Password: document.getElementById("pwd_login").value,
        RememberMe: false
    };
}

/**
 * 檢查畫面資料
 * @param {any} apiData
 */
function checkApiData(apiData) {
    let dataArr = ['User', 'Mema'];
    for (let name in apiData) {
        if (dataArr.indexOf(name) >= 0) {
            var value = apiData[name];
            if (value === null || $.trim(value) === '')
                return false;
        }
    }
}

/**
 * check token data
 * @param {string} authToken
 */
function checkAuthToken(authToken) {
    if (authToken === null || authToken === '' || authToken === undefined)
        return false;
    else
        return true;
}

/**
 * 存token
 * @param {string} authToken
 */
function setToken(authToken) {
    if (checkAuthToken(authToken) === true) {
        let date = new Date();
        date.setTime(date.getTime() + (100 * 60 * 1000)); //100 minute
        createCookie('APP_TOKEN', authToken, date);
    }
}


/**
 * login
 */
let toLogin = _.throttle(function () {
    // set api data
    let data = getApiData();
    // check data is not null 
    if (checkApiData(data) === false) return;

    // send api to login
    userLogin(data).then((res) => {
        if (res.data !== null && res.data !== undefined && res.data !== '' ) {
            console.log('登入成功');
            // set token to cookie
            setToken(res.data);
            window.location = url;
        }
        else {
            // show error message
            let errorMessage = document.getElementById("errorMessage");
            errorMessage.textContent = res.data.data;
        }
    });
}, 5000);

