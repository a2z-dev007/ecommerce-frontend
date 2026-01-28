import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, Product } from '@/types';

interface CartState {
    items: CartItem[];
    isOpen: boolean;
}

const initialState: CartState = {
    items: [],
    isOpen: false,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Initialize cart from local storage or database
        setCart: (state, action: PayloadAction<CartItem[]>) => {
            state.items = action.payload;
        },
        addItem: (state, action: PayloadAction<{ product: Product; quantity?: number; variantId?: string }>) => {
            const { product, quantity = 1, variantId } = action.payload;
            const existingItem = state.items.find(
                (item) => item.productId === product.id && item.variantId === variantId
            );

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.items.push({
                    productId: product.id,
                    product,
                    quantity,
                    variantId,
                });
            }
        },
        removeItem: (state, action: PayloadAction<{ productId: string; variantId?: string }>) => {
            state.items = state.items.filter(
                (item) => !(item.productId === action.payload.productId && item.variantId === action.payload.variantId)
            );
        },
        updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number; variantId?: string }>) => {
            const { productId, quantity, variantId } = action.payload;
            if (quantity <= 0) {
                state.items = state.items.filter(
                    (item) => !(item.productId === productId && item.variantId === variantId)
                );
                return;
            }

            const item = state.items.find(
                (item) => item.productId === productId && item.variantId === variantId
            );
            if (item) {
                item.quantity = quantity;
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
        toggleCart: (state) => {
            state.isOpen = !state.isOpen;
        },
        setCartOpen: (state, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        },
    },
});

export const { setCart, addItem, removeItem, updateQuantity, clearCart, toggleCart, setCartOpen } = cartSlice.actions;
export default cartSlice.reducer;
