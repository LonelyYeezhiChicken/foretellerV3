
/** 初始化載入 */
function create() {
    // send api to loadCarKind
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
        let row = document.createElement('tr');
        bsUtil.createRowData(i + 1, row, 1);
        bsUtil.createRowData(data[i].long, row, 4);
        bsUtil.createRowData(getDate(data[i].orderDate), row, 4);

        let btn = bsUtil.createRowBtn(data[i].id, '明細', 'primary', toShowDetail);
        bsUtil.addBtnIntd([btn], row, 3);

        document.getElementById('car-tbody').appendChild(row);
    }
}

/** 搜尋 */
let toFind = _.throttle(function () {
    toClearTable();
    let customerId = document.getElementById("customer-set").value;
    loadOrder({ customerId: customerId }).then((res) => {
        console.log(res);
        render(res);
    });
}, 5000);

/** 清空table資料 */
function toClearTable() {
    let element = document.getElementById("car-tbody");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

/** 明細視窗 */
let toShowDetail = _.throttle(function (id) {
    //console.log('Edit');
    //toClear();

    //let data = viewData.filter(v => v.id.includes(id));

    //document.getElementById("carId-set").value = data[0].id;
    //document.getElementById("carName-set").value = data[0].name;
    //document.getElementById("carComBackLong-set").value = data[0].comBackLong;
    //document.getElementById("carComBackTime-set").value = data[0].comBackTime;
    //document.getElementById("carCostAmount-set").value = data[0].costAmount;
    //document.getElementById("carSaleAmount-set").value = data[0].saleAmount;
    //document.getElementById("carCount-set").value = data[0].count;
    //document.getElementById("carLowItem-set").value = data[0].lowItem;
    //document.getElementById("carMemo-set").value = data[0].memo;
    //document.getElementById("carKind-set").value = data[0].carType;


    //isEdit = true;
    ////顯示
    //$('#setCarModal').modal('show')
}, 500);

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