import pool from "../pool";

export async function getAllCategories() {
  try {
    const result = await pool.query(`
      SELECT *
      FROM exam_categories;
    `);

   

    return result.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw error;
  }
}

export async function getCategoryBySlug(slug: string) {
  const result = await pool.query(
    `
    SELECT *
    FROM exam_categories
    WHERE slug = $1;
    `,
    [slug]
  );

  return result.rows[0];
}

export async function createCategory(
  name: string,
  slug: string,
  description: string
) {
  const result = await pool.query(
    `
    INSERT INTO exam_categories
    (
      name,
      slug,
      description
    )
    VALUES
    (
      $1,
      $2,
      $3
    )
    RETURNING *;
    `,
    [name, slug, description]
  );

  return result.rows[0];
}
export async function updateCategory(
  id: number,
  name: string,
  slug: string,
  description: string
) {
  const result = await pool.query(
    `
    UPDATE exam_categories
    SET
      name = $2,
      slug = $3,
      description = $4
    WHERE id = $1
    RETURNING *;
    `,
    [id, name, slug, description]
  );

  return result.rows[0];
}
export async function deleteCategory(id: number) {
  await pool.query(
    `
    DELETE FROM exam_categories
    WHERE id = $1;
    `,
    [id]
  );
}