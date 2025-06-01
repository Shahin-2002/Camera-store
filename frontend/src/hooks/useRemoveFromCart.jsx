import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useRemoveFromCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId) => {
      const res = await fetch(`http://localhost:8000/api/cart/${productId}/`, {
        method: "DELETE",
        credentials: "include",
      });
      console.log(productId)

      if (!res.ok) throw new Error("خطا در حذف محصول");

      // DELETE معمولاً بدنه برنمی‌گردونه، پس return خالی کافیه
      return;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });
}
