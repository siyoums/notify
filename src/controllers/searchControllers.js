const pool = require('../config/dbConfig');

//
const searchTopics = async (req, res) => {
    const searchTerm = req.query.q;
    const page = req.query.p || 0;

    // limit number of search results per page (pagination)
    const postsPerPage = 3;

    const sql = `select * from users where first_name ilike '%${searchTerm}%' limit ${postsPerPage} offset ${
        page * postsPerPage
    }  `;
    // const sql = `select * from users where first_name = 'siyoums' limit 3`;
    const resp = await pool.query(sql);
    res.send(resp.rows);
};

module.exports = { searchTopics };
