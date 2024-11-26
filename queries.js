
import pg from "pg";

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "Technonauts Hotel",
    password: "M.k@28!06!04#",
    port: 5432,
  });
  db.connect();

  const getAllItems = (request, response) => {
    pool.query('SELECT * FROM room ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
  }
  


//   module.exports = {
//     getAllItems
// }

export default getAllItems;
 
