import prisma from "../db"

export const createTask = async (req, res) => {
   const task = await prisma.task.create({
        data: {
            ...req.body,
            creator: {connect: {id:req.user.id}}
        }
    });
    res.status(200);
    res.json({
        task
    });
}

