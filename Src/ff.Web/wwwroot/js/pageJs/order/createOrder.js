
/** 初始化載入 */
function created() {
    // send api to loadCarKind
    loadItemMain().then((res) => {
        render(res);
    });

    loadCustomer().then((res) => {
        customerList = res.data.map(v => {
            return {
                id: v.id,
                name: ` ${v.car} - ${v.name}`
            };
        });
        bsUtil.createSelect(customerList, "customer-set");
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
let toCar = _.throttle(function (id) {
    let data = viewData.find(v => v.id.includes(id));

    let row = document.createElement('li');
    row.innerHTML = `${data.name}  X1`;

    document.getElementById('orderDetail').appendChild(row);

    detail.push({
        id: '',
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

/** 新增 */
let toAdd = _.throttle(function () {
    let data = getViewData();

    addOrder(data).then((res) => {
        if (res.data === 'OK')
            location.reload();
    });
}, 5000);

/** 新增視窗 */
let toShowAdd = _.throttle(function () {
    toClear();
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

    let customerId = document.getElementById("customer-set").value;
    let comBackLong = document.getElementById("carComBackLong-set").value;
    let comBackTime = document.getElementById("carComBackTime-set").value;

    let detailData = detail.map(v => {
        return {
            Id: v.id,
            ItemCode: v.itemCode,
            ItemName: v.itemName,
            Amount: v.amount,
            Count: v.count,
            DiscountType: v.discountType,
            DiscountName: v.discountName,
            Discount: v.discount,
            TotalAmount: v.totalAmount
        };
    });

    return {
        CustomerId: customerId,
        Long: comBackLong,
        OrderDate: comBackTime,
        Detail: detailData
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