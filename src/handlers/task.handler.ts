import prisma from "../db";

export const getAllTask = async (req, res) => {
    const tasks = await prisma.user.findMany();
    res.status(200);
    res.json({ tasks });
};

export const getTaskById = async (req, res) => {
    const id = req.params.id;

    const task = await prisma.task.findUnique({
        where: { id },
    });

    if (!task) {
        res.status(400);
        res.json({
            message: "Task not found",
        });
        return;
    }

    res.status(200);
    res.json({
        task,
    });
};

export const createTask = async (req, res) => {
    const task = await prisma.task.create({
        data: {
            title: req.body.title,
            description: req.body.description,
            dueDate: req.body.dueDate,
            creator: { connect: { id: req.user.id } },
        },
    });
    res.status(200);
    res.json({
        task,
    });
};

export const updateTask = async (req, res) => {
    const id = req.params.id;

    const task = await prisma.task.update({
        where: {
            id,
        },
        data: {
            title: req.body.title,
            description: req.body.description,
            dueDate: req.body.title,
        },
    });

    res.status(200);
    res.json({ task });
};

export const deleteTask = async (req, res) => {
    const id = req.params.id;
    await prisma.task.delete({
        where: { id },
    });

    res.status(200);
    res.json({
        message: "Delete task successfully",
    });
};
