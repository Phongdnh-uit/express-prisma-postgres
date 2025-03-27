import prisma from "../db";

export const addCommentToTask = async (req, res) => {
    const id = req.params.id;
    const comment = await prisma.comment.create({
        data: {
            user: {
                connect: { id: req.user.id },
            },
            task: {
                connect: { id },
            },
            comment: req.body.comment,
        },
    });

    res.status(200);
    res.json({ comment });
};

export const getAllCommentInTask = async (req, res) => {
    const id = req.params.id;
    const comments = await prisma.comment.findMany({
        where: {
            taskId: id,
        },
    });
    res.status(200);
    res.json({ comments });
};

export const deleteComment = async (req, res) => {
    const id = req.params.id 
    await prisma.comment.delete({
        where: {
            id
        }
    })

    res.status(200);
    res.json({
        message: "Delete comment successfully"
    })
}
