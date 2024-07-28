import products from "@/assets/data/products";
import { ProductListItem } from "@/src/components";
import { FlatList } from "react-native";

export default function TabOneScreen() {
  return (
        <FlatList
          data={products}
          renderItem={({ item }) => <ProductListItem product={item} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={{ gap: 10, padding: 10 }}
          columnWrapperStyle={{ gap: 10 }}
        />
      
  );
}

