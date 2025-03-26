// Order interfaces for API requests and responses

// Response interface from GET /api/orders/:id
export interface OrderResponse {
    id: number;
    userId: number;
    tripId: number;
    amountPerson: number;
    status: string;
    totalPrice: number;
    createdAt: string;
    TripOrderDetail: TripOrderDetailResponse[];
  }
  
  export interface TripOrderDetailResponse {
    id: number;
    orderId: number;
    order: number;
    fullName: string;
    phone: string | null;
    requirement: string | null;
    isChild: number; // 0 or 1
    identityCode: string;
    isJoined: number; // 0 or 1
  }
  
  // Request interface for POST /api/orders/:tripId
  export interface OrderRequest {
    tripId: number;
    amountPerson: number;
    details: OrderDetailRequest[];
  }
  
  export interface OrderDetailRequest {
    order: number;
    fullName: string;
    phone: string | null;
    requirement?: string | null;
    isChild: number; // 0 or 1
  }