import orders from "@/assets/data/order";
import { useMyOrderList } from "@/src/api/orders";
import Loader from "@/src/components/Loader";
import OrderListItem from "@/src/components/OrderListItem";
import { Text } from "@/src/components/Themed";
import { FlatList } from "react-native";

export default function OrdersScreen() {
    const { data: orders, error, isLoading } = useMyOrderList()

    if (error) {
        return <Text>Product not found</Text>
    }

    if (isLoading) {
        return <Loader />
    }
    return (
        <FlatList
            data={orders}
            renderItem={({ item, index }) => <OrderListItem order={item} key={index} index={index} />}
            contentContainerStyle={{ gap: 10, padding: 10 }}
        />
    );
}