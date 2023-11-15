/***************************************************************
 * Copyright (c) 2023 Reste Dominik Linkowski
 * All rights reserved.
 *
 * This file is protected by copyright law. Any reproduction,
 * modification, distribution, or use in any form requires
 * written permission from the author.
 *
 * Unauthorized use, reproduction, or distribution of this file
 * or any portion of it may result in severe civil and criminal
 * penalties, and will be prosecuted to the maximum extent
 * possible under the law.
 ***************************************************************/

export class ServerError extends Error {
  constructor(
    public readonly message: string,
    public readonly code: number = 500,
  ) {
    super(message);
  }

  static isServerError(error: Error): error is ServerError {
    return error instanceof ServerError;
  }
}
