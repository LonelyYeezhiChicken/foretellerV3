
/** 初始化載入 */
function create() {
    // send api to loadCarKind
    loadCustomer().then((res) => {
        render(res);
    });
    loadCarKind().then((res) => {
        carkindList = res.data.map(v => {
            return {
                id: v.id,
                name: v.name
            };
        });
        bsUtil.createSelect(carkindList, "carKind-set");
    });
}

/** 畫面渲染
 * @param {any} data
 */
function render(res) {
    let data = res.data;
    viewData = data;
    for (let i = 0; i < data.length; i++) {
        let row = document.createElement('tr');
        bsUtil.createRowData(i + 1, row, 1);
        bsUtil.createRowData(data[i].car, row, 2);
        bsUtil.createRowData(data[i].name, row, 2);
        bsUtil.createRowData(data[i].lastLong, row, 2);
        bsUtil.createRowData(getDate(data[i].lastDate), row, 2);

        let btn = bsUtil.createRowBtn(data[i].id, '修改', 'primary', toShowEdit);
        let btnDel = bsUtil.createRowBtn(data[i].id, '刪除', 'danger', toDelete);
        bsUtil.addBtnIntd([btn, btnDel], row, 3);

        document.getElementById('car-tbody').appendChild(row);
    }
}

/** 刪除 */
let toDelete = _.throttle(function (id) {
    console.log('Del');
    delCustomer({ id: id }).then((res) => {
        if (res.data === 'OK')
            location.reload();
    });
}, 5000);

/** 新增或修改 */
let toAddOrUpdate = _.throttle(function () {
    let data = getViewData();
    console.log(data);
    // 判斷新增或修改
    if (isEdit === true) {
        editCustomer(data).then((res) => {
            if (res.data === 'OK')
                location.reload();
        });
    } else {
        addCustomer(data).then((res) => {
            if (res.data === 'OK')
                location.reload();
        });
    }
}, 5000);

/** 搜尋 */
let toFind = _.throttle(function () {

}, 5000);

/** 新增視窗 */
let toShowAdd = _.throttle(function () {
    console.log('Add');
    toClear();
    isEdit = false;
    //顯示
    $('#setCarModal').modal('show')
}, 500);

/** 編輯視窗 */
let toShowEdit = _.throttle(function (id) {
    console.log('Edit');
    toClear();

    let data = viewData.filter(v => v.id.includes(id));

    document.getElementById("carId-set").value = data[0].id;
    document.getElementById("carName-set").value = data[0].name;
    document.getElementById("carCarNo-set").value = data[0].carNo;
    document.getElementById("carPhone-set").value = data[0].phone;
    document.getElementById("carLastLong-set").value = data[0].lastLong;
    document.getElementById("carLastDate-set").value = getDate(data[0].lastDate);
    document.getElementById("carMemo-set").value = data[0].memo;
    document.getElementById("carKind-set").value = data[0].carType;

    isEdit = true;
    //顯示
    $('#setCarModal').modal('show')
}, 500);

/** 清空資料 */
function toClear() {
    document.getElementById("carId-set").value = "";
    document.getElementById("carName-set").value = "";
    document.getElementById("carCarNo-set").value = "";
    document.getElementById("carPhone-set").value = 0;
    document.getElementById("carLastLong-set").value = 0;
    document.getElementById("carLastDate-set").value = new Date();
    document.getElementById("carMemo-set").value = "";
}

/** 取出畫面資料 */
function getViewData() {
    let carId = document.getElementById("carId-set").value;
    let carName = document.getElementById("carName-set").value;
    let carCarNo = document.getElementById("carCarNo-set").value;
    let carPhone = document.getElementById("carPhone-set").value;
    let carLastLong = document.getElementById("carLastLong-set").value;
    let carLastDate = document.getElementById("carLastDate-set").value;
    let carMemo = document.getElementById("carMemo-set").value;
    let carKind = document.getElementById("carKind-set").value;

    return {
        Id: carId,
        Name: carName,
        CarNo: carCarNo,
        Phone: carPhone,
        LastLong: carLastLong,
        LastDate: carLastDate + 'T00:00:00',
        Memo: carMemo,
        CarType: carKind,
        Car: ''
    };
}

/** 取得日期
 * @param {any} dateTime
 */
function getDate(dateTime) {
    let arry = dateTime.split('T');

    if (arry.length > 0) {
        return arry[0];
    } else {
        return '';
    }
}