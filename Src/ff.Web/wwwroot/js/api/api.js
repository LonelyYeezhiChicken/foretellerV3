const userLogin = (data) => {
    return req.post(`AccountApi/Login`, data);
};

const createTest = () => {
    return req.get(`ErrorReportApi/Create`);
};

const loadCarKind = () => {
    return req.get(`CarKindApi/Load`);
};