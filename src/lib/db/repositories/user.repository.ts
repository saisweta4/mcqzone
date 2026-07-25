import pool from "../pool";

export async function createUser(data: {
  clerkId: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string | null;
}) {
  const result = await pool.query(
    `
    INSERT INTO users
    (
      clerk_id,
      email,
      first_name,
      last_name,
      image_url
    )
    VALUES
    (
      $1,$2,$3,$4,$5
    )
    RETURNING *;
    `,
    [
      data.clerkId,
      data.email,
      data.firstName,
      data.lastName,
      data.imageUrl,
    ]
  );

  return result.rows[0];
}

export async function getUserByClerkId(clerkId: string) {
  const result = await pool.query(
    `
    SELECT *
    FROM users
    WHERE clerk_id = $1
    LIMIT 1;
    `,
    [clerkId]
  );

  return result.rows[0] ?? null;
}

export async function updateUser(data: {
  clerkId: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string | null;
}) {
  const result = await pool.query(
    `
    UPDATE users
    SET
      email=$2,
      first_name=$3,
      last_name=$4,
      image_url=$5
    WHERE clerk_id=$1
    RETURNING *;
    `,
    [
      data.clerkId,
      data.email,
      data.firstName,
      data.lastName,
      data.imageUrl,
    ]
  );

  return result.rows[0];
}

export async function deleteUser(clerkId: string) {
  await pool.query(
    `
    DELETE FROM users
    WHERE clerk_id=$1;
    `,
    [clerkId]
  );
}


export async function getAllUsers() {
  const result = await pool.query(`
    SELECT
      id,
      clerk_id,
      email,
      first_name,
      last_name,
      image_url,
      role,
      created_at
    FROM users
    ORDER BY created_at DESC;
  `);

  return result.rows;
}