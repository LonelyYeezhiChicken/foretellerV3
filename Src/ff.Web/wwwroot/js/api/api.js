const userLogin = (data) => {
    return req.post(`AccountApi/Login`, data);
};

const createTest = () => {
    return req.get(`ErrorReportApi/Create`);
};

/**���ظ�T */
// ���J���
const loadCarKind = () => {
    return req.get(`CarKindApi/Load`);
};

// �s����
const editCarKind = (data) => {
    return req.post(`CarKindApi/Edit`, data);
};

// �R�����
const delCarKind = (data) => {
    return req.delete(`CarKindApi/Delete`, data);
};

// �s�W���
const addCarKind = (data) => {
    return req.post(`CarKindApi/Create`, data);
};

// �j�M���
const findCarKind = (data) => {
    return req.post(`CarKindApi/Find`, data);
};
