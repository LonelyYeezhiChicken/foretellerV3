
/**
 * 初始化載入
 */
function create() {
    // send api to loadCarKind
    loadCarKind().then((res) => {
        console.log(res);
        render(res);
    });
}

/**
 * 畫面渲染
 * @param {any} data
 */
function render(res) {
    let data = res.data;
    for (let i = 0; i < data.length; i++) {
        let row = document.createElement('tr');
        bsUtil.createRowData(i + 1, row, 1);
        bsUtil.createRowData(data[i].name, row, 4);
        bsUtil.createRowData(data[i].year, row, 3);
        let btn = bsUtil.createRowBtn(data[i].id, '修改', 'primary', toEdit);
        let btnDel = bsUtil.createRowBtn(data[i].id, '刪除', 'danger', toDelete);

        bsUtil.addBtnIntd([btn, btnDel], row, 4);

        document.getElementById('car-tbody').appendChild(row);
    }
}

/**
 * 修改
 * */
let toEdit = _.throttle(function (id) {
    console.log('Edit');
    console.log(id);
}, 5000);

/**
 * 刪除
 * */
let toDelete = _.throttle(function (id) {
    console.log('Del');
    console.log(id);
}, 5000);

/**
 * 新增
 * */
let toAdd = _.throttle(function (id) {
    console.log('Del');
    console.log(id);
}, 5000);

/**
 * 搜尋
 * */
let toFind = _.throttle(function () {
    // set api data
    let data = getApiData();
    // check data is not null 
    if (checkApiData(data) === false) return;

    // send api to login
    userLogin(data).then((res) => {
        console.log(res.data);
        console.log(res);
        console.log(url);
        if (res.data !== null && res.data !== undefined && res.data !== '') {
            console.log('登入成功');
            // set token to cookie
            setToken(res.data.data);
            window.location = url;
        }
        else {
            // show error message
            let errorMessage = document.getElementById("errorMessage");
            errorMessage.textContent = res.data.data;
        }
    });
}, 5000);