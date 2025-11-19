import { dbAdapter } from "@/lib/database-adapter";
import { COLLECTIONS } from "@/types/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    console.log("🚀 ~ GET ~ id:", id);

    // ✅ Check if ID is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      // If not a valid ObjectId, try to find by userId or other field
      const service = await (dbAdapter as any).getService();
      
      // Try to find orders by userId instead of _id
      const orders = await service.findMany(COLLECTIONS.ORDERS, {
        userId: id // or whatever field you use to store user reference
      });

      // Get order items for each order
      const ordersWithItems = await Promise.all(
        orders.map(async (order: any) => {
          const orderItems = await service.findMany(COLLECTIONS.ORDER_ITEMS, {
            orderId: order._id.toString()
          });
          return {
            ...order,
            items: orderItems
          };
        })
      );

      return NextResponse.json({
        success: true,
        orders: ordersWithItems
      });
    }

    const service = await (dbAdapter as any).getService();

    // ✅ Get the order by ID (only if valid ObjectId)
    const order = await service.findById(COLLECTIONS.ORDERS, id);

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // ✅ Get related order items
    const orderItems = await service.findMany(COLLECTIONS.ORDER_ITEMS, {
      orderId: id,
    });

    return NextResponse.json({
      success: true,
      order: {
        ...order,
        items: orderItems,
      },
    });
  } catch (error) {
    console.error("❌ Get order error:", error);
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 }
    );
  }
}