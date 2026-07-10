import pool from "../pool";

export async function createUser(data: {
  clerkUserId: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string | null;
}) {
  const result = await pool.query(
    `
    INSERT INTO users
    (
      clerk_user_id,
      email,
      first_name,
      last_name,
      image_url
    )
    VALUES
    (
      $1,
      $2,
      $3,
      $4,
      $5
    )
    RETURNING *;
    `,
    [
      data.clerkUserId,
      data.email,
      data.firstName,
      data.lastName,
      data.imageUrl,
    ]
  );

  return result.rows[0];
}

export async function getUserByClerkId(clerkUserId: string) {
  const result = await pool.query(
    `
    SELECT *
    FROM users
    WHERE clerk_user_id = $1;
    `,
    [clerkUserId]
  );

  return result.rows[0];
}

export async function updateUser(data: {
  clerkUserId: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string | null;
}) {
  const result = await pool.query(
    `
    UPDATE users
    SET
      email = $2,
      first_name = $3,
      last_name = $4,
      image_url = $5,
      updated_at = CURRENT_TIMESTAMP
    WHERE clerk_user_id = $1
    RETURNING *;
    `,
    [
      data.clerkUserId,
      data.email,
      data.firstName,
      data.lastName,
      data.imageUrl,
    ]
  );

  return result.rows[0];
}

export async function updateLastLogin(clerkUserId: string) {
  await pool.query(
    `
    UPDATE users
    SET
      last_login = CURRENT_TIMESTAMP
    WHERE clerk_user_id = $1;
    `,
    [clerkUserId]
  );
}

export async function getAllUsers() {
  const result = await pool.query(`
    SELECT *
    FROM users
    ORDER BY created_at DESC;
  `);

  return result.rows;
}