const sql = `
    insert into users (first_name, last_name, email, password)
    values ('${firstname}', '${lastname}', '${email}', '${password}')
    `;

    try {
        pool.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);
        });
    } catch (err) {
        handleErrors(err);
    }