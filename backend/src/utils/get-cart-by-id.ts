/**
 * Models
 */
import Cart, { ICart } from '@/models/Cart.model';

/**
 * Get cart by userId or guestId
 * @param userId - The ID of the user
 * @param guestId - The ID of the guest
 * @returns The cart object or null if not found
 */
const getUserCartById = async (
  userId: string,
  guestId: string,
): Promise<ICart | null> => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId });
  }
  return null;
};

export default getUserCartById;
