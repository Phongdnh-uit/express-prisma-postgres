import { Router } from "express"

const router = Router()

//Task
router.get('/tasks', (req, res) => {
    res.json({message: "hello guy"})
})
router.get('/tasks/:id', () => {})
router.post('/tasks', () => {})
router.put('/tasks/:id', () => {})
router.delete('/tasks/:id', () => {})

//TaskAssignment
router.post('/tasks/:id/assign', ()=>{})
router.get('/tasks/:id/assignments', ()=>{})
router.delete('/tasks/:id/unasign/:userId', ()=>{})

//Comment
router.post('/tasks/:id/comments', ()=>{})
router.get('/tasks/:id/comments', ()=>{})
router.delete('/comments/:id', ()=>{})

export default router;
