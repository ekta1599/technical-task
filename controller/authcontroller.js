const authService = require("../service/authservice")
const { response } = require("../middleware/response");

exports.
    register = async (req, res) => {
        try {
            let resp = await authService.register(req.body);
            console.log("resp",resp);
            if (resp) {
                return response("Added successfully!!", {}, 200, res);
            } else {
                return response("something went wrong!!", {}, 500, res);
            }
        } catch (err) {
            console.log("err", err);
            return response(err.message, err?.error, err.status, res);
        }
    };

exports.login = async (req, res) => {
    try {
        let resp = await authService.login(req.body)
        console.log("resp---->", resp)
        if (resp) {
            return response("User login successfully!!", resp.data, 200, res);
        } else {
            return response("something went wrong!!", {}, 500, res);
        }
    } catch (err) {
        console.log("err",err);
        return response(err.message, err?.error, err.status, res);

    }
};
exports.delete = async (req, res) => {
    try {
        let resp = await authService.delete(req.params._id);
        if (resp) {
            return response("Deleted successfully!!", resp.data, 200, res);
        } else {
            return response("Error..!!", err.error, err.status, res);
        }
    } catch (err) {
        return response(err.message, err?.error, err.status, res);
    }
};
exports.byId = async (req, res) => {
    try {
        let resp = await authService.byId(req.params._id);
        if (resp) {
            return response("SUCCESS..!!", resp.data, 200, res);
        } else {
            return response("Error..!!", err.error, err.status, res);
        }
    } catch (err) {
        return response(err.message, err?.error, err.status, res);
    }
};
exports.getAll = async (req, res) => {
    try {
        if (!req.query.page || !req.query.limit) {
            return response("pagination is require for pagination..!!", {}, 404, res);
        }
        else {
            let resp = await authService.getAll(req.query.page, req.query.limit, req.query.str);
            if (resp) {
                return response("SUCCESS..!!", resp.data, 200, res);
            }
            else
                return response("Error..!!", err.error, err.status, res);
        }
    }
    catch (err) {
        return response(err.message, err?.error, err.status, res);
    }
};