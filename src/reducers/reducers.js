

// export const OriginReducer = (state, action) =>{
//     switch (action.type){
//         case 'ADD_ORIGIN':
//             return{
//                 latitude:action.payload.latitude,
//                 longitude:action.payload.longitude,
//                 address:action.payload.address,
//                 name:action.payload.name,
//             }
//         default:
//         return state
//     }
// }

// export const DestinationReducer = (state, action) =>{
//     switch (action.type){
//         case 'ADD_DESTINATION':
//             return{
//                 latitude:action.payload.latitude,
//                 longitude:action.payload.longitude,
//                 address:action.payload.address,
//                 name:action.payload.name,
//             }
//         default:
//         return state
//     }
// }

// export const TravelTimeReducer = (state, action) =>{
//     switch (action.type){
//         case 'ADD_TRAVEL_TIME':
//             return{
//                 distance:action.payload.distance,
//                 duration:action.payload.duration,
                
//             }
//         default:
//         return state
//     }
// }

export const OrdersReducer = (state, action) =>{
    switch (action.type){
        case 'ADD_ORDERS':
            return{
                orders:action.payload.orders, 
            }
        default:
        return state
    }
}
export const OrderDetailsReducer = (state, action) =>{
    switch (action.type){
        case 'ADD_ORDER_DETAILS':
            return{
                orderDetails:action.payload.orderDetails, 
            }
        default:
        return state
    }
}