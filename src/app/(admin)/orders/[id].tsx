import orders from "@/assets/data/order";
import OrderItemListItem from "@/src/components/OrderItemListItem";
import OrderListItem from "@/src/components/OrderListItem";
import { Stack, useLocalSearchParams } from "expo-router";
import { FlatList, Text, View } from "react-native";

export default function OrderDetailsScreen() {
    const { id } = useLocalSearchParams()

    const order = orders.find((order) => order.id === Number(id))

    if (!order) {
        return <Text>Order not found</Text>
    }
    return (
        <View style={{padding: 10, gap: 10, flex: 1}}>
            <Stack.Screen options={{ title: `Order #${id}` }} />

            <FlatList
                data={order.order_items}
                renderItem={({ item }) => <OrderItemListItem item={item} />}
                contentContainerStyle={{ gap: 10 }}
                ListHeaderComponent={() => <OrderListItem order={order} />}
            />
        </View>
    )
}