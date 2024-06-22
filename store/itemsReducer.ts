import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

//data types
export interface itemsState {
  id: string,
  name: string,
  price: number,
  image: string,
}
//initial state
const initialState: itemsState = 
    // mock data
     [
        { id: '1', name: 'Teddy Bear', price: 12, image: 'https://images.unsplash.com/photo-1562040506-a9b32cb51b94?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: '2', name: 'Batman Car', price: 20, image: 'https://images.unsplash.com/photo-1657249771314-b9869bb0e321?q=80&w=2846&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: '3', name: 'Toy Story Toy', price: 12, image: 'https://images.unsplash.com/photo-1614897464244-86c6b2fdda79?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: '4', name: 'Police car', price: 12, image: 'https://images.unsplash.com/photo-1702310636300-5b8103970683?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: '5', name: 'Bag', price: 20, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: '6', name: 'Wallet', price: 10, image: 'https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: '7', name: 'Shoes', price: 32, image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=2400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: '8', name: 'Mug', price: 7, image: 'https://images.unsplash.com/photo-1542556398-95fb5b9f9b48?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    ];

//reducers
export const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
      // Add any reducers if needed
    },
  });
  
    
  export default itemsSlice.reducer
  