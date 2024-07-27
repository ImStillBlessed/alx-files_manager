/* eslint-disable no-unused-vars */

export const errorResponse = (error, req, res, next) => {
  console.error(error);
  res.status(error.status || 500).json({ error: error.message });
};

export class APIError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}
