
/** 初始化載入 */
function create() {
    // send api to loadCarKind
    loadItemMain().then((res) => {
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
        bsUtil.createRowData(data[i].name, row, 3);
        bsUtil.createRowData(data[i].comBackLong, row, 2);

        let btn = bsUtil.createRowBtn(data[i].id, '修改', 'primary', toShowEdit);
        let btnDel = bsUtil.createRowBtn(data[i].id, '刪除', 'danger', toDelete);
        bsUtil.addBtnIntd([btn, btnDel], row, 4);

        document.getElementById('car-tbody').appendChild(row);
    }
}

/** 刪除 */
let toDelete = _.throttle(function (id) {
    console.log('Del');
    delItemMain({ id: id }).then((res) => {
        if (res.data === 'OK')
            location.reload();
    });
}, 5000);

/** 新增或修改 */
let toAddOrUpdate = _.throttle(function () {
    let data = getViewData();

    // 判斷新增或修改
    if (isEdit === true) {
        editItemMain(data).then((res) => {
            if (res.data === 'OK')
                location.reload();
        });
    } else {
        addItemMain(data).then((res) => {
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
    document.getElementById("carYear-set").value = data[0].year;

    isEdit = true;
    //顯示
    $('#setCarModal').modal('show')
}, 500);

/** 清空資料 */
function toClear() {
    document.getElementById("carId-set").value = "";
    document.getElementById("carName-set").value = "";
    document.getElementById("carComBackLong-set").value = 0;
    document.getElementById("carComBackTime-set").value = 0;
    document.getElementById("carCostAmount-set").value = 0;
    document.getElementById("carSaleAmount-set").value = 0;
    document.getElementById("carCount-set").value = 0;
    document.getElementById("carLowItem-set").value = 0;
    document.getElementById("carMemo-set").value = "";
}

/** 取出畫面資料 */
function getViewData() {

    let carId = document.getElementById("carId-set").value;
    let carName = document.getElementById("carName-set").value;
    let carComBackLong = document.getElementById("carComBackLong-set").value;
    let carComBackTime = document.getElementById("carComBackTime-set").value;
    let carCostAmount = document.getElementById("carCostAmount-set").value;
    let carSaleAmount = document.getElementById("carSaleAmount-set").value;
    let carCount = document.getElementById("carCount-set").value;
    let carLowItem = document.getElementById("carLowItem-set").value;
    let carMemo = document.getElementById("carMemo-set").value;
    let carKind = document.getElementById("carKind-set").value;

    return {
        Id: carId,
        Name: carName,
        ComBackLong: carComBackLong,
        ComBackTime: carComBackTime,
        CostAmount: carCostAmount,
        SaleAmount: carSaleAmount,
        Count: carCount,
        LowItem: carLowItem,
        Memo: carMemo,
        CarType: carKind,
        Car: ''
    };
}