import pool from "../pool";

export async function getAllCategories() {
  console.log("Repository reached");

  const result = await pool.query(`
    SELECT *
    FROM exam_categories;
  `);

  console.log(result.rows);

  return result.rows;
}