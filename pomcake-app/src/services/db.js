import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDocs,
    query,
    orderBy,
    where
} from 'firebase/firestore';
import { db } from './firebase';

// Collection References
const salesCollection = collection(db, 'sales');
const blogsCollection = collection(db, 'blogs');

// --- Sales Operations ---

export const addSale = async (saleData) => {
    console.log("💾 Attempting to save sale:", saleData);
    try {
        const docRef = await addDoc(salesCollection, {
            ...saleData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
        console.log("✅ Sale saved successfully with ID:", docRef.id);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("❌ Error adding sale: ", error.code, error.message);
        return { success: false, error: error.message };
    }
};

export const updateSale = async (id, saleData) => {
    try {
        const saleRef = doc(db, 'sales', id);
        await updateDoc(saleRef, {
            ...saleData,
            updatedAt: new Date().toISOString()
        });
        return { success: true };
    } catch (error) {
        console.error("Error updating sale: ", error);
        return { success: false, error };
    }
};

export const deleteSale = async (id) => {
    try {
        await deleteDoc(doc(db, 'sales', id));
        return { success: true };
    } catch (error) {
        console.error("Error deleting sale: ", error.code, error.message);
        return { success: false, error: error.message };
    }
};

export const getSales = async () => {
    try {
        const q = query(salesCollection, orderBy('date', 'desc'));
        const querySnapshot = await getDocs(q);
        const sales = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        console.log("Fetched sales:", sales.length);
        return sales;
    } catch (error) {
        console.error("Error fetching sales:", error.code, error.message);
        // Throw error so components can handle it
        throw error;
    }
};

// --- Blog Operations ---

export const addBlog = async (blogData) => {
    try {
        const docRef = await addDoc(blogsCollection, {
            ...blogData,
            publishedAt: new Date().toISOString(),
            createdAt: new Date().toISOString()
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error adding blog: ", error);
        return { success: false, error };
    }
};

export const updateBlog = async (id, blogData) => {
    try {
        const blogRef = doc(db, 'blogs', id);
        await updateDoc(blogRef, {
            ...blogData,
            updatedAt: new Date().toISOString()
        });
        return { success: true };
    } catch (error) {
        console.error("Error updating blog: ", error);
        return { success: false, error };
    }
};

export const deleteBlog = async (id) => {
    try {
        await deleteDoc(doc(db, 'blogs', id));
        return { success: true };
    } catch (error) {
        console.error("Error deleting blog: ", error);
        return { success: false, error };
    }
};

export const getBlogs = async () => {
    try {
        const q = query(blogsCollection, orderBy('publishedAt', 'desc'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Error fetching blogs: ", error);
        return [];
    }
};
