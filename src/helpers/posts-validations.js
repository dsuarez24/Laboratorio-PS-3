import Posts from '../posts/posts.model.js'

const existingPost = async (id = '') => {
    try {
        const existingPost = await Posts.findById(id);
        if (!existingPost) {
            throw new Error(`not found`);
        }
    } catch (error) {
        throw error;
    }
}

export { existingPost };
