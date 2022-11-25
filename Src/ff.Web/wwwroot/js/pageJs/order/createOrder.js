
/** 初始化載入 */
function created() {
    // send api to loadCarKind
    loadItemMain().then((res) => {
        render(res);
    });
}

/** 畫面渲染
 * @param {any} data
 */
function render(res) {
    let data = res.data;
    viewData = data;
    for (let i = 0; i < data.length; i++) {
        let row = bsUtil.createCardDetail(data[i].id, data[i].name, data[i].car, toCar);
        document.getElementById('itemDetail').appendChild(row);
    }
}

/** 加入購物車*/
let toCar= _.throttle(function (id) {
    let data = viewData.find(v => v.id.includes(id));

    let row = document.createElement('li');
    row.innerHTML = `${data.name}  X1`;

    document.getElementById('orderDetail').appendChild(row);

    detail.push({
        id:'',
        itemCode: data.id,
        itemName: data.name,
        amount: data.saleAmount,
        count: 1,
        discountType: '',
        discountName: '',
        discount: 0,
        totalAmount: data.saleAmount
    });
    console.log(detail);
}, 500);

/** 清空購物車 */
let toClearCar = _.throttle(function () {
    let element = document.getElementById("orderDetail");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}, 5000);


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
let toFind = _.throttle(function (id) {
    console.log(id);
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
    document.getElementById("carComBackLong-set").value = data[0].comBackLong;
    document.getElementById("carComBackTime-set").value = data[0].comBackTime;
    document.getElementById("carCostAmount-set").value = data[0].costAmount;
    document.getElementById("carSaleAmount-set").value = data[0].saleAmount;
    document.getElementById("carCount-set").value = data[0].count;
    document.getElementById("carLowItem-set").value = data[0].lowItem;
    document.getElementById("carMemo-set").value = data[0].memo;
    document.getElementById("carKind-set").value = data[0].carType;


    isEdit = true;
    //顯示
    $('#setCarModal').modal('show')
}, 500);

/** 清空資料 */
function toClear() {
    document.getElementById("carComBackLong-set").value = "";
    document.getElementById("carComBackTime-set").value = new Date();
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