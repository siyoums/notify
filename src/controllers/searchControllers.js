const pool = require('../config/dbConfig');
const { handleErrors } = require('../helpers/validation');

//
const searchTopics = async (req, res) => {
    const searchTerm = req.query.q;
    const page = req.query.p || 0;

    // limit number of search results per page (pagination)
    const postsPerPage = 3;

    const sql = `select * from Posts where author ilike '%${searchTerm}%' or  caption ilike  '%${searchTerm}%' limit ${postsPerPage} offset ${
        page * postsPerPage
    }  `;

    try {
        const resp = await pool.query(sql);
        const s = resp.rowCount;

        res.json(resp.rows);
        // console.log(resp.rowCount);
    } catch (err) {
        const errors = handleErrors(err);
    }
};

module.exports = { searchTopics };
