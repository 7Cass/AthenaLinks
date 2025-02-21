import { isRedirectError } from "next/dist/client/components/redirect";

/**
 * Options type for executeAction function
 * @template T The return type of the action function
 */
type Options<T> = {
  /** The async function to execute */
  actionFn: () => Promise<T>;
  /** Optional success message to return. Defaults to "Action completed successfully" */
  successMessage?: string;
};

/**
 * Executes an async action with error handling and standardized response format
 *
 * This utility function wraps async operations to provide consistent error handling and
 * response formatting across the application. It's particularly useful for server actions
 * and API endpoints.
 *
 * @template T The return type of the action function
 * @param {Options<T>} options The configuration options
 * @param {() => Promise<T>} options.actionFn The async function to execute
 * @param {string} [options.successMessage="Action completed successfully"] Optional success message
 *
 * @returns {Promise<{success: boolean, message: string}>} A standardized response object
 * - success: boolean indicating if the action completed successfully
 * - message: A user-friendly message describing the result
 *
 * @throws {Error} Rethrows redirect errors from Next.js
 *
 * @example
 * ```ts
 * const result = await executeAction({
 *   actionFn: async () => {
 *     // Your async operation here
 *     await deleteRecord(id);
 *   },
 *   successMessage: "Record deleted successfully"
 * });
 * ```
 */
export const executeAction = async <T>({
  actionFn,
  successMessage = "Action completed successfully",
}: Options<T>): Promise<{ success: boolean; message: string }> => {
  try {
    await actionFn();

    return {
      success: true,
      message: successMessage,
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    if (error instanceof Error) {
      return {
        success: false,
        message:
          error.message || "An error occurred while executing the action",
      };
    }

    return {
      success: false,
      message: "An error occurred while executing the action",
    };
  }
};
