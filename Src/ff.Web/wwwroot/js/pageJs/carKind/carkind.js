
/** 初始化載入 */
function create() {
    // send api to loadCarKind
    loadCarKind().then((res) => {
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
        let row = document.createElement('tr');
        bsUtil.createRowData(i + 1, row, 1);
        bsUtil.createRowData(data[i].name, row, 4);
        bsUtil.createRowData(data[i].year, row, 3);

        let btn = bsUtil.createRowBtn(data[i].id, '修改', 'primary', toShowEdit);
        let btnDel = bsUtil.createRowBtn(data[i].id, '刪除', 'danger', toDelete);
        bsUtil.addBtnIntd([btn, btnDel], row, 4);

        document.getElementById('car-tbody').appendChild(row);
    }
}

/** 刪除 */
let toDelete = _.throttle(function (id) {
    console.log('Del');
    delCarKind({ id: id }).then((res) => {
        if (res.data === 'OK')
            location.reload();
    });
}, 5000);

/** 新增或修改 */
let toAddOrUpdate = _.throttle(function () {
    let data = getViewData();

    // 判斷新增或修改
    if (isEdit === true) {
        editCarKind(data).then((res) => {
            if (res.data === 'OK')
                location.reload();
        });
    } else {
        addCarKind(data).then((res) => {
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
    document.getElementById("carYear-set").value = "";
}

/** 取出畫面資料 */
function getViewData() {
    let id = document.getElementById("carId-set").value;
    let name = document.getElementById("carName-set").value;
    let year = document.getElementById("carYear-set").value;

    return {
        Id: id,
        Name: name,
        Year: year
    };
}