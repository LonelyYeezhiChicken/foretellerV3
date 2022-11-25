class BsUtil {
    /**
    * 動態生成表單
    * @param {any} htmlData
    * @param {any} parent
    * @param {any} size
    */
    createRowData(htmlData, parent, size) {
        let rowData = document.createElement('td');
        rowData.innerHTML = htmlData;
        rowData.classList.add('col-md-' + size);
        parent.appendChild(rowData);
    }
    /**
     * 動態生成表單按鈕
     * @param {any} id
     * @param {any} parent
     */
    createRowBtn(id, value, style, func) {
        let btn = document.createElement('button');
        btn.classList.add('btn');
        btn.classList.add('btn-' + style);
        btn.classList.add('mr-2');
        btn.innerHTML = value;
        btn.id = id;

        btn.onclick = function () {
            func(id);
        }

        return btn;
    }
    /**
     * 將按鈕加入td標籤中
     * @param {any} btn
     * @param {any} parent
     * @param {any} size
     */
    addBtnIntd(btnList, parent, size) {
        let rowData = document.createElement('td');
        //rowData.innerHTML = htmlData;
        rowData.classList.add('col-md-' + size);
        for (let i = 0; i < btnList.length; i++) {
            rowData.appendChild(btnList[i]);
        }
        parent.appendChild(rowData);
    }

    /**
     * 動態生成下拉選單
     * @param {any} data
     * @param {any} id
     */
    createSelect(data, id) {
        let selectObj = document.getElementById(id);
        data.forEach(x => {
            selectObj.add(new Option(x.name, x.id));
        });
    }

    /**
     * 動態生成卡片明細 + 點擊事件
     * @param {any} id
     * @param {any} name
     */
    createCardDetail(id, name, carType, func) {
        let row = document.createElement('div');
        row.classList.add('font-icon-list')
        row.classList.add('col-lg-2');
        row.classList.add('col-md-4');
        row.classList.add('col-sm-4');
        row.classList.add('col-xs-6');
        row.classList.add('col-xs-6');

        let detail = document.createElement('div');
        detail.classList.add('font-icon-detail');

        let icon = document.createElement('i');
        icon.classList.add('tim-icons');
        icon.classList.add('icon-settings-gear-63');

        let rowData = document.createElement('h3');
        rowData.innerHTML = name;

        let typeData = document.createElement('h4');
        typeData.innerHTML = carType;

        detail.appendChild(icon);
        detail.appendChild(rowData);
        detail.appendChild(typeData);

        row.appendChild(detail);

        row.onclick = function () {
            func(id);
        }
        return row;
    }
}