/**零件資訊 */
// 載入資料
const loadCustomer = () => {
    return req.get(`CustomerApi/Load`);
};

// 編輯資料
const editCustomer = (data) => {
    return req.post(`CustomerApi/Edit`, data);
};

// 刪除資料
const delCustomer = (data) => {
    return req.delete(`CustomerApi/Delete`, data);
};

// 新增資料
const addCustomer = (data) => {
    return req.post(`CustomerApi/Create`, data);
};

// 搜尋資料
const findCustomer = (data) => {
    return req.post(`CustomerApi/Find`, data);
};