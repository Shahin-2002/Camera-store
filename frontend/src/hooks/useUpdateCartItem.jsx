import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, quantity }) => {
      const res = await fetch(`http://localhost:8000/api/cart/${productId}/`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });

      if (!res.ok) throw new Error("خطا در بروزرسانی تعداد");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });
}
