import orders from "@/assets/data/order";
import { useOrderDetails } from "@/src/api/orders";
import Loader from "@/src/components/Loader";
import OrderItemListItem from "@/src/components/OrderItemListItem";
import OrderListItem from "@/src/components/OrderListItem";
import { Stack, useLocalSearchParams } from "expo-router";
import { FlatList, Text, View } from "react-native";

export default function OrderDetailsScreen() {

    const { id } = useLocalSearchParams()

    const { data: order, error, isLoading } = useOrderDetails(Number(id))

    if (error || !order) {
        return <Text>Product not found</Text>
    }

    if (isLoading) {
        return <Loader />
    }
    return (
        <View style={{padding: 10, gap: 10, flex: 1}}>
            <Stack.Screen options={{ title: `Order #${id}` }} />

            <FlatList
                data={order.order_items}
                renderItem={({ item, index }) => <OrderItemListItem item={item} key={index} />}
                contentContainerStyle={{ gap: 10 }}
                ListHeaderComponent={() => <OrderListItem order={order} />}
            />
        </View>
    )
}