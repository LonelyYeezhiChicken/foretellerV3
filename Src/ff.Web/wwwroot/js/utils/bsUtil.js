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
}