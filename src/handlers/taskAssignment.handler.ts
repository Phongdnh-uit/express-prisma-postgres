import prisma from "../db";

export const assignTask = async (req, res) => {
    const id = req.params.id;
    const taskAssignment = await prisma.taskAssignment.create({
        data: {
            user: { connect: { id: req.body.userId } },
            task: { connect: { id } },
        },
    });
    res.status(200);
    res.json({ taskAssignment });
};

export const getUsersInTask = async (req, res) => {
    const id = req.params.id;
    const users = await prisma.user.findMany({
        where: {
            taskAssignments: {
                some: {
                    taskId: id,
                },
            },
        },
    });

    res.status(200);
    res.json({ users });
};

export const unassignTask = async (req, res) => {
    const id = req.params.id;
    const userId = req.params.userId;

    await prisma.taskAssignment.delete({
        where: {
            taskId_userId: {
                taskId: id,
                userId: userId,
            },
        },
    });
    res.status(200);
    res.json({
        message: "Unassign task successfully"
    })
};
