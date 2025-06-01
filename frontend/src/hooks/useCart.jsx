import { useQuery } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';


const fetchCart = async () => {
  const res = await fetch('http://localhost:8000/api/cart/', {
    credentials: 'include',
  });
  if (!res.ok) throw new Error('خطا در دریافت سبد خرید');
  return res.json();
};

export function useCart() {
  return useQuery({
    queryKey: ['cart'],
    queryFn: fetchCart,
    staleTime: 1000 * 60, // یک دقیقه معتبر
  });
}

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId) => {
      const res = await fetch('http://localhost:8000/api/cart/', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: productId, quantity: 1 }),
      });
      if (!res.ok) throw new Error('افزودن محصول با خطا مواجه شد');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}
