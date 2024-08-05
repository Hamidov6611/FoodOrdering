import { useProductList } from "@/src/api/products";
import { ProductListItem } from "@/src/components";
import Loader from "@/src/components/Loader";
import { FlatList, Text } from "react-native";

export default function MenuScreen() {

  const { data: products, error, isLoading } = useProductList()

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <Text>Something went wrong</Text>
  }


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

