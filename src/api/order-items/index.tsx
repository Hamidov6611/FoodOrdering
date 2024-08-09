import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InsertTables, Tables, UpdateTables } from '@/src/types';


export const useInsertOrderItems = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      async mutationFn(data: InsertTables<'order_items'>[]) {
        const { error, data: newProduct } = await supabase
          .from('order_items')
          .insert(data)
          .select()
  
        if (error) {
          throw new Error(error.message);
        }
        return newProduct;
      },
      async onSuccess() {
        await queryClient.invalidateQueries(['order_items']);
      },
    });
  };