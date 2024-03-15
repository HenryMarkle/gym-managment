import storage from '../app/api/v1/firebase';
import { ref, listAll, getDownloadURL, deleteObject, uploadBytes } from 'firebase/storage';

export async function getProductImageUrls(id: number): Promise<string[]> {
    try {
        const storageRef = ref(storage, `/images/products/${id}`);

        const response = await listAll(storageRef);
        const urls = await Promise.all(response.items.map(getDownloadURL));

        return urls
    } catch (e) {
        console.log(`getProductImageUrls: error: ${e}`);
        return [];
    }
}

export async function getExerciseVideoUrl(id: number): Promise<string | null> {
    try {
        const storageRef = ref(storage, `videos/excercises2/`);
        const response = await listAll(storageRef);

        if (response.items.length) {
            return await getDownloadURL(response.items[0]);
        } 
        
        return null;

    } catch (e) {
        console.log(`getExerciseVideoUrl: error: ${e}`);
        return null;
    }
}

export async function getExerciseSectionImageUrl(id: number): Promise<string | null> {
    try {
        const storageRef = ref(storage, `videos/exercises/`);
        const response = await listAll(storageRef);

        const found = response.items.find(i => i.name.startsWith(id.toString()));

        if (found) {
            return await getDownloadURL(found);
        } 
        
        return null;

    } catch (e) {
        console.log(`getExerciseVideoUrl: error: ${e}`);
        return null;
    }
}

export async function getTrainerImageUrl(id: number): Promise<string | null> {
    try {
        const storageRef = ref(storage, `images/trainers/${id}`);

        return await getDownloadURL(storageRef);
    } catch (e) {
        return null;
    }
}

// upload

export async function uploadTrainerImage(id: number, image: File) {
    try {
        const images = await listAll(ref(storage, `image/trainers/${id}`));

        if (images.items.length) {
            for (let image of images.items) await deleteObject(image);
        }

        const storageRef = ref(storage, `image/trainers/${id}/${image.name}`);

        await uploadBytes(storageRef, image);
    } catch (e) {
        console.log('uploadTrainerImage(): '+e);
    }
}
