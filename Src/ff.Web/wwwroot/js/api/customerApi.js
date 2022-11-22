/**零件資訊 */
// 載入資料
const loadItemMain = () => {
    return req.get(`CustomerApi/Load`);
};

// 編輯資料
const editItemMain = (data) => {
    return req.post(`CustomerApi/Edit`, data);
};

// 刪除資料
const delItemMain = (data) => {
    return req.delete(`CustomerApi/Delete`, data);
};

// 新增資料
const addItemMain = (data) => {
    return req.post(`CustomerApi/Create`, data);
};

// 搜尋資料
const findItemMain = (data) => {
    return req.post(`CustomerApi/Find`, data);
};