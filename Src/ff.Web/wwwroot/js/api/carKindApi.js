/**車種資訊 */
// 載入資料
const loadCarKind = () => {
    return req.get(`CarKindApi/Load`);
};

// 編輯資料
const editCarKind = (data) => {
    return req.post(`CarKindApi/Edit`, data);
};

// 刪除資料
const delCarKind = (data) => {
    return req.delete(`CarKindApi/Delete`, data);
};

// 新增資料
const addCarKind = (data) => {
    return req.post(`CarKindApi/Create`, data);
};

// 搜尋資料
const findCarKind = (data) => {
    return req.post(`CarKindApi/Find`, data);
};
