import express from "express"
import { verifyToken } from "../middlewears/authMiddlewear.js"
import { addRemoveFriend, getUser, getUserFriends } from "../controllers/users.controller.js"
const router =express.Router()

// read
router.get('/:id',verifyToken,getUser)
router.get('/:id/friends',verifyToken,getUserFriends)
// update
router.patch('/:id',verifyToken,getUser)
router.get('/:id/:friendId',verifyToken,addRemoveFriend)
export default router