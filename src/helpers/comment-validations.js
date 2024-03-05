import Comment from '../comments/comments.model.js'

const existingComment = async (id = '') => {
    try {
        const existingComment = await Comment.findById(id);
        if (!existingComment) {
            throw new Error(`Comment not found`);
        }
    } catch (error) {
        throw error;
    }
}

export { existingComment };


