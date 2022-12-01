/**訂單資訊 */
// 新增訂單
const addOrder = (data) => {
    return req.post(`OrderApi/Create`, data);
};

// 查詢訂單
const loadOrder = (data) => {
    return req.get(`OrderApi/Load`, data);
};